import axios, { AxiosInstance } from "axios";

import { API_URL } from "@env";

import { authTokenStorage } from "@storages/storageAuthToken";

import { AppError } from "@utils/AppError";

type registerInterceptTokenManagerProps = {
    signOut: () => void;
    refreshedTokenUpdated: (newToken: string) => void;
};

type APIInstaceProps = AxiosInstance & {
    registerInterceptTokenManager: ({
        signOut,
        refreshedTokenUpdated,
    }: registerInterceptTokenManagerProps) => () => void;
};

type PromiseType = {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
};

type ProcessQueueParams = {
    error: Error | null;
    token: string | null;
};

const api = axios.create({
    baseURL: API_URL,
}) as APIInstaceProps;

let isRefreshing = false;
let failedQueue: Array<PromiseType> = [];

const process = ({ error, token = null }: ProcessQueueParams): void => {
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve(token);
        }
    });

    failedQueue = [];
};

api.registerInterceptTokenManager = ({ signOut, refreshedTokenUpdated }) => {
    const interceptTokenManager = api.interceptors.response.use(
        (response) => response,
        async (requestError) => {
            if (requestError?.response?.status === 401) {
                if (
                    requestError.response.data?.message === "token.expired" ||
                    requestError.response.data?.message === "token.invalid"
                ) {
                    const currentToken = await authTokenStorage.get();

                    if (currentToken === null) {
                        signOut();
                        return Promise.reject(requestError);
                    }

                    const originalRequest = requestError.config;

                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers["Authorization"] = `Bearer ${token}`;

                                return axios(originalRequest);
                            })
                            .catch((error) => {
                                throw error;
                            });
                    }

                    isRefreshing = true;

                    return new Promise(async (resolve, reject) => {
                        try {
                            const { data } = await api.post("/sessions/refresh-token", {
                                token: currentToken,
                            });

                            await authTokenStorage.save(data.token);

                            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
                            originalRequest.headers["Authorization"] = `Bearer ${data.token}`;

                            refreshedTokenUpdated(data.token);

                            process({ error: null, token: data.token });
                            resolve(originalRequest);
                        } catch (error: any) {
                            process({ error, token: null });
                            signOut();

                            reject(error);
                        } finally {
                            isRefreshing = false;
                        }
                    });
                }

                signOut();
            }

            if (requestError.response && requestError.response.data) {
                return Promise.reject(new AppError(requestError.response.data.message));
            } else {
                return Promise.reject(requestError);
            }
        }
    );

    return () => {
        api.interceptors.response.eject(interceptTokenManager);
    };
};

export { api };

import { API_URL } from "@env";

import axios, { AxiosError, AxiosInstance } from "axios";

import { authTokenStorage } from "@storages/storageAuthToken";
import { AppError } from "@utils/AppError";

type SignOut = () => void;

type PromiseType = {
    onSuccess: (token: string) => void;
    onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
    registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
    baseURL: API_URL,
}) as APIInstanceProps;

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (singOut) => {
    const interceptTokenManager = api.interceptors.response.use(
        (response) => response,
        async (requestError) => {
            if (requestError.response?.status === 401) {
                if (
                    requestError.response.data?.message === "token.expired" ||
                    requestError.response.data?.message === "token.invalid"
                ) {
                    const { refreshToken } = await authTokenStorage.get();

                    if (!refreshToken) {
                        singOut();
                        return Promise.reject(requestError);
                    }

                    const originalRequestConfig = requestError.config;

                    if (isRefreshing) {
                        return new Promise((resolve, reject) => {
                            failedQueued.push({
                                onSuccess: (token: string) => {
                                    originalRequestConfig.headers = {
                                        Authorization: `Bearer ${token}`,
                                    };
                                    resolve(api(originalRequestConfig));
                                },
                                onFailure: (error: AxiosError) => {
                                    reject(error);
                                },
                            });
                        });
                    }

                    isRefreshing = true;

                    return new Promise(async (resolve, reject) => {
                        try {
                            const { data } = await api.post("/sessions/refresh-token", {
                                refresh_token: refreshToken,
                            });

                            await authTokenStorage.save({
                                token: data.token,
                                refreshToken: data.refresh_token,
                            });

                            if (originalRequestConfig.data) {
                                originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
                            }

                            originalRequestConfig.headers = {
                                Authorization: `Bearer ${data.token}`,
                            };
                            api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

                            failedQueued.forEach((request) => {
                                request.onSuccess(data.token);
                            });

                            resolve(api(originalRequestConfig));
                        } catch (error: any) {
                            console.log(error);
                            failedQueued.forEach((request) => {
                                request.onFailure(error);
                            });

                            singOut();
                            reject(error);
                        } finally {
                            isRefreshing = false;
                            failedQueued = [];
                        }
                    });
                }

                singOut();
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

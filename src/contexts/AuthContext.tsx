import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { authTokenStorage } from "@storages/storageAuthToken";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextProps = {
    user: UserDTO;
    token: string;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    isLoadingStorageData: boolean;
};

type ProviderReactNode = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
export function AuthContextProvider({ children }: ProviderReactNode) {
    const [user, setUser] = useState<UserDTO>({} as UserDTO);
    const [token, setToken] = useState<string>("");
    const [isLoadingStorageData, setIsLoadingStorageData] = useState<boolean>(false);

    async function signIn(email: string, password: string) {
        try {
            const { data } = await api.post("sessions", { email, password });

            if (data.user && data.token && data.refresh_token) {
                setIsLoadingStorageData(true);

                updateUserAndTokenStates(data.user, data.token);

                defineApiHeadersAuthorization(data.token);

                await authTokenStorage.save({
                    token: data.token,
                    refreshToken: data.refresh_token,
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingStorageData(false);
        }
    }

    function updateUserAndTokenStates(user: UserDTO, token: string) {
        setUser(user);
        setToken(token);
    }

    async function signOut() {
        setIsLoadingStorageData(true);

        try {
            await authTokenStorage.remove();

            updateUserAndTokenStates({} as UserDTO, "");
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingStorageData(false);
        }
    }

    async function loadUserData() {
        setIsLoadingStorageData(true);

        try {
            const storageAuthToken = await authTokenStorage.get();

            if (storageAuthToken) {
                defineApiHeadersAuthorization(storageAuthToken.token);

                const { data } = await api.get("users/me");

                updateUserAndTokenStates(data, storageAuthToken.token);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingStorageData(false);
        }
    }

    function defineApiHeadersAuthorization(token: string) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    useEffect(() => {
        loadUserData();
    }, []);

    useEffect(() => {
        const subscriber = api.registerInterceptTokenManager(signOut);

        return () => {
            subscriber();
        };
    }, [signOut]);

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut, isLoadingStorageData }}>
            {children}
        </AuthContext.Provider>
    );
}

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { authTokenStorage } from "@storages/storageAuthToken";
import { userStorage } from "@storages/storageUser";
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

            if (data.user && data.token) {
                setIsLoadingStorageData(true);

                updateUserAndTokenStates(data.user, data.token);

                defineApiHeadersAuthorization(data.token);

                await authTokenStorage.save(data.token);
                await userStorage.save(data.user);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingStorageData(false);
        }
    }

    async function signOut() {}

    async function loadUserData() {
        setIsLoadingStorageData(true);

        try {
            const storageUser = await userStorage.get();
            const storageAuthToken = await authTokenStorage.get();

            if (storageUser.id && storageAuthToken) {
                console.log("To aqui");

                updateUserAndTokenStates(storageUser, storageAuthToken);
                defineApiHeadersAuthorization(storageAuthToken);
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingStorageData(false);
        }
    }

    function defineApiHeadersAuthorization(token: string) {
        api.defaults.headers.common["Authorization"] = token;
    }

    function updateUserAndTokenStates(user: UserDTO, token: string) {
        setUser(user);
        setToken(token);
    }

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, signIn, signOut, isLoadingStorageData }}>
            {children}
        </AuthContext.Provider>
    );
}

import { createContext, ReactNode, useMemo, useState } from "react";

type AuthContextProps = {
    user: string;
    token: string;
    LogOut: () => Promise<void>;
};

type ProviderReactNode = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthContextProvider({ children }: ProviderReactNode) {
    const [user, setUser] = useState<string>("sd");
    const [token, setToken] = useState<string>("");

    async function LogOut() {
        setUser("");
    }

    return <AuthContext.Provider value={{ user, token, LogOut }}>{children}</AuthContext.Provider>;
}

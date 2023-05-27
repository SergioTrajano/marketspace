import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

type StorageTokenProps = {
    token: string;
    refreshToken: string;
};

async function get() {
    try {
        const storedAuthToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

        const { token, refreshToken }: StorageTokenProps = storedAuthToken
            ? JSON.parse(storedAuthToken)
            : {};

        return { token, refreshToken };
    } catch (error) {
        throw error;
    }
}

async function save({ token, refreshToken }: StorageTokenProps) {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, JSON.stringify({ token, refreshToken }));
    } catch (error) {
        throw error;
    }
}

async function remove() {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
    } catch (error) {
        throw error;
    }
}

export const authTokenStorage = {
    get,
    save,
    remove,
};

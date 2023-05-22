import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

async function get() {
    try {
        const storedAuthToken = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

        return storedAuthToken || "";
    } catch (error) {
        throw error;
    }
}

async function save(token: string) {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "./storageConfig";

async function get() {
    return "";
}

async function save(token: string) {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
    } catch (error) {
        throw error;
    }
}

export const authTokenStorage = {
    get,
    save,
};

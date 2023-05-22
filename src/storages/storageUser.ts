import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_STORAGE } from "./storageConfig";

import { UserDTO } from "@dtos/UserDTO";

async function save(user: UserDTO) {
    try {
        const stringfiedUser = JSON.stringify(user);

        await AsyncStorage.setItem(USER_STORAGE, stringfiedUser);
    } catch (error) {
        throw error;
    }
}

async function get() {
    try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE);

        const parsedUser: UserDTO = storedUser ? JSON.parse(storedUser) : ({} as UserDTO);

        return parsedUser;
    } catch (error) {
        throw error;
    }
}

async function remove() {
    try {
        await AsyncStorage.removeItem(USER_STORAGE);
    } catch (error) {
        throw error;
    }
}

export const userStorage = {
    save,
    get,
    remove,
};

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

export const userStorage = {
    save,
};

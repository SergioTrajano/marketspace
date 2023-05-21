import * as ImagePicker from "expo-image-picker";

export async function getPhoto() {
    const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
    });

    if (photoSelected.canceled) {
        return;
    }

    if (photoSelected.assets[0].uri) {
        return photoSelected.assets[0];
    }
}

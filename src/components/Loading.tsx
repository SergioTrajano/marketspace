import { Center, Spinner } from "native-base";

export function Loading() {
    return (
        <Center
            flex={1}
            bgColor="gray.600"
        >
            <Spinner
                color="blue.700"
                size={"lg"}
            />
        </Center>
    );
}

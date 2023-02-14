import { Switch as NativeBaseSwitch, ISwitchProps } from "native-base";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);

type Props = ISwitchProps;

export function Switch({ ...rest }: Props) {
    return (
        <NativeBaseSwitch
            size="lg"
            {...rest}
        />
    );
}

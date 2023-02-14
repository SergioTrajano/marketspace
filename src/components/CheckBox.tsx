import { Checkbox as NativeBaseCheckbox, ICheckboxProps } from "native-base";

type Props = ICheckboxProps & {
    value: string;
    label: string;
};
export function CheckBox({ value, label, ...rest }: Props) {
    return (
        <NativeBaseCheckbox
            value={value}
            marginBottom={2}
            fontFamily="body"
            fontSize="md"
            lineHeight="md"
            {...rest}
        >
            {label}
        </NativeBaseCheckbox>
    );
}

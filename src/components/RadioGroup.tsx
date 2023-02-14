import { Radio as NativeBaseRadio, IRadioGroupProps } from "native-base";

type Props = IRadioGroupProps & {
    name: string;
    options: string[];
};

export function RadioGroup({ name, options, ...rest }: Props) {
    return (
        <NativeBaseRadio.Group
            name={name}
            fontFamily="body"
            fontSize="md"
            {...rest}
        >
            {options.map((value: string) => (
                <NativeBaseRadio
                    key={value}
                    value={value}
                >
                    {value}
                </NativeBaseRadio>
            ))}
        </NativeBaseRadio.Group>
    );
}

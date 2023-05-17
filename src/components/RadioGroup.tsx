import { Radio as NativeBaseRadio, IRadioGroupProps, HStack } from "native-base";

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
            <HStack>
                {options.map((value: string) => (
                    <NativeBaseRadio
                        key={value}
                        value={value}
                        marginLeft={5}
                    >
                        {value}
                    </NativeBaseRadio>
                ))}
            </HStack>
        </NativeBaseRadio.Group>
    );
}

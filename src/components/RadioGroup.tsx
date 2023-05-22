import { HStack, IRadioGroupProps, Radio as NativeBaseRadio } from "native-base";

type Props = IRadioGroupProps & {
    options: string[];
};

export function RadioGroup({ options, ...rest }: Props) {
    return (
        <NativeBaseRadio.Group
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

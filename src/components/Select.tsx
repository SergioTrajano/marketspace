import { Select as NativeBaseSelect, ISelectProps, CheckIcon, Box } from "native-base";
import { useState } from "react";

type Props = ISelectProps & {
    options: string[];
    value: string;
};

export function Select({ options, value, ...rest }: Props) {
    return (
        <NativeBaseSelect
            selectedValue={value}
            minWidth={32}
            _selectedItem={{
                endIcon: <CheckIcon size="5" />,
                fontFamily: "heading",
            }}
            fontFamily={"heading"}
            {...rest}
        >
            {options.map((option) => (
                <NativeBaseSelect.Item
                    key={option}
                    label={option}
                    value={option}
                />
            ))}
        </NativeBaseSelect>
    );
}

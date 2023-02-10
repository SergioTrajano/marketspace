import { Select as NativeBaseSelect, ISelectProps, CheckIcon, Box } from "native-base";
import { useState } from "react";

type Props = ISelectProps & {
    options: string[];
};

export function Select({ options, ...rest }: Props) {
    const [selected, setSelected] = useState<string>("Todos");
    return (
        <NativeBaseSelect
            selectedValue={selected}
            onValueChange={(itemValue) => setSelected(itemValue)}
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

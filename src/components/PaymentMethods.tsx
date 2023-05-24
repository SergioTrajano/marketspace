import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";

import { Payment_method } from "@screens/CreateAd";
import { HStack, Icon } from "native-base";
import { IHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";
import { Text } from "./Text";

type Props = IHStackProps & {
    method: Payment_method;
};

export function PaymentMethods({ method, ...rest }: Props) {
    const methodsDesciptions = {
        card: {
            iconLib: Octicons,
            icon: "credit-card",
            name: "Cartão de Crédito",
        },
        pix: {
            iconLib: MaterialIcons,
            icon: "qr-code",
            name: "Pix",
        },
        boleto: {
            iconLib: MaterialCommunityIcons,
            icon: "barcode-scan",
            name: "Boleto",
        },
        cash: {
            iconLib: MaterialIcons,
            icon: "attach-money",
            name: "Dinheiro",
        },
        deposit: {
            iconLib: MaterialCommunityIcons,
            icon: "bank-outline",
            name: "Depósito bancário",
        },
    };

    return (
        <HStack
            key={method}
            alignContent="center"
            marginTop={2}
            marginBottom={1}
            {...rest}
        >
            <Icon
                as={methodsDesciptions[method].iconLib}
                name={methodsDesciptions[method].icon}
                size="md"
            />
            <Text
                text={methodsDesciptions[method].name}
                color="gray.200"
                marginLeft={2}
            />
        </HStack>
    );
}

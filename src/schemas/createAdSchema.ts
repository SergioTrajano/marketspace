import * as yup from "yup";

export const createAdSchema = yup.object({
    productImages: yup
        .array(
            yup.object().shape({
                uri: yup.string().required(),
                extension: yup.string().required(),
                type: yup.string().required(),
            })
        )
        .min(1, "Selecione pelo menos uma imagem")
        .required("Informe a imagem"),
    name: yup.string().required("Informe um nome para o produto"),
    description: yup.string().required("Informe uma descrição"),
    is_new: yup.string().required("Informe se é novo").oneOf(["Produto novo", "Produto usado"]),
    accept_trade: yup.boolean().required("Informe se aceita troca"),
    payment_methods: yup
        .array(yup.string().oneOf(["pix", "card", "deposit", "cash", "boleto"]))
        .min(1, "Informe pelo menos um método de pagamento")
        .required("Infome o método de pagamento"),
    price: yup
        .string()
        .required("Informe o preço do produto")
        .matches(/^\d*\.?\d+$/, "O preço deve ser um número"),
});

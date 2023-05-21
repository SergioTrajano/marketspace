import * as yup from "yup";

export const signUpSchema = yup.object({
    name: yup.string().required("Informe um nome").trim(),
    email: yup.string().email("E-mail inválido").required("Informe um email").trim(),
    tel: yup
        .string()
        .required("Informe um telefone")
        .matches(/^\d{12,13}$/, "DDI+DDD+numero, sem espaços e -")
        .min(12, "Telefone inválidoo")
        .max(13, "Telefone inválido")
        .trim(),
    password: yup
        .string()
        .required("Informe uma senha")
        .matches(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
            "Senha deve conter pelo menos: 1 letra maiscula, 1 letra minuscula, 1 algarismo e um dos caracteres $*&@#"
        )
        .trim(),
    confirmPassword: yup
        .string()
        .required("Confirme a senha.")
        .oneOf([yup.ref("password")], "As senhas não coincidem.")
        .trim(),
    avatar: yup.string().required("Required"),
});

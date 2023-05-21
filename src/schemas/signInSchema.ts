import * as yup from "yup";

export const signInSchema = yup.object({
    email: yup.string().required("Informe um email").trim(),
    password: yup.string().required("Informe uma senha").trim(),
});

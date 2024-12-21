import * as y from "yup";

export const LoginSchema = y.object({
  email: y
    .string()
    .email("Insira um e-mail válido")
    .required("Insira o seu e-mail"),
  password: y
    .string()
    .min(6, "Insira uma senha com pelo menos 6 dígitos")
    .required("Insira a sua senha"),
});

export const RegisterSchema = y.object({
  email: y
    .string()
    .email("Insira um e-mail válido")
    .required("Insira o seu e-mail"),
  password: y
    .string()
    .min(6, "Insira uma senha com pelo menos 6 dígitos")
    .required("Insira a sua senha"),
  confirmPassword: y
    .string()
    .oneOf([y.ref("password")], "As senhas devem ser iguais")
    .min(6, "Insira uma senha com pelo menos 6 dígitos")
    .required("Insira a sua senha"),
  name: y.string().required("Insira o seu nome"),
});
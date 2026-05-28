import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .transform((val) => val.trim())
      .refine((val) => val.length >= 3, "O nome deve conter pelo menos 3 caracteres."),

    email: z
      .string()
      .min(1, "O e-mail é obrigatório.")
      .email("Por favor, insira um e-mail válido."),

    password: z
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres."),

    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória."),

    accepted: z.literal(true, { message: "Você deve aceitar os termos." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
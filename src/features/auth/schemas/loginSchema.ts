import { z } from "zod";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório.")
    .email("Por favor, insira um e-mail válido."),

  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .regex(
      passwordPattern,
      "Senha incorreta."
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
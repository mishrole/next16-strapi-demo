import { z } from "zod"

export const SignInFormSchema = z.object({
  identifier: z
    .string()
    .min(3, "Username or email must be at least 3 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
})

export const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must be at most 100 characters"),
})

export type SignInFormValues = z.infer<typeof SignInFormSchema>
export type SignUpFormValues = z.infer<typeof SignUpFormSchema>

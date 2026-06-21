"use server"

import { FormState } from "@/interfaces/IUserData"
import { loginUserService, registerUserService } from "@/lib/strapi/strapi"
import { SignInFormSchema, SignUpFormSchema } from "@/validations/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import z from "zod"

const COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  httpOnly: true, // Only accessible to the server
  domain: process.env.HOST ?? "localhost", // Domain where the cookie will be accessible
  secure: process.env.NODE_ENV === "production", // Only accessible via HTTPS in production
}

export async function registerUserAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email")
  const password = formData.get("password")
  const username = formData.get("username")

  const fields = {
    username: username as string,
    email: email as string,
    password: password as string,
  }

  const validatedFields = SignUpFormSchema.safeParse(fields)

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error)

    return {
      success: false,
      message: "Validation error",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        ...prevState.data,
        ...fields,
      },
    }
  }

  const response = await registerUserService(validatedFields.data)

  if (!response || response.error) {
    return {
      success: false,
      message: "Error registering user",
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields,
    }
  }

  const cookieStore = await cookies()
  cookieStore.set("jwt", response.jwt, COOKIE_CONFIG)
  redirect("/dashboard")
}

export async function logoutUserAction() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete("jwt")

    redirect("/signin")
  } catch (error) {
    console.error("Error logging out user:", error)

    redirect("/signin")
  }
}

export async function loginUserAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const identifier = formData.get("identifier")
  const password = formData.get("password")

  const fields = {
    identifier: identifier as string,
    password: password as string,
  }

  const validatedFields = SignInFormSchema.safeParse(fields)

  if (!validatedFields.success) {
    const flattenedErrors = z.flattenError(validatedFields.error)

    return {
      success: false,
      message: "Validation error",
      strapiErrors: null,
      zodErrors: flattenedErrors.fieldErrors,
      data: {
        ...prevState.data,
        ...fields,
      },
    }
  }

  const response = await loginUserService(validatedFields.data)

  if (!response || response.error) {
    return {
      success: false,
      message: "Error logging in user",
      strapiErrors: response?.error,
      zodErrors: null,
      data: fields,
    }
  }

  const cookieStore = await cookies()
  cookieStore.set("jwt", response.jwt, COOKIE_CONFIG)
  redirect("/dashboard")
}

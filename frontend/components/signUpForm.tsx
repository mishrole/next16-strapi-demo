"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

import { Input } from "@/components/ui/input"

import { actions } from "@/actions"
import { Button } from "@/components/ui/button"
import { FormState } from "@/interfaces/IUserData"
import Link from "next/link"
import { useActionState } from "react"
import FormError from "./formError"

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-2xl font-bold text-pink-500",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full",
  prompt: "mt-4 text-center text-sm",
  link: "ml-2 text-pink-500",
}

const INITIAL_STATE: FormState = {
  success: false,
  message: undefined,
  strapiErrors: null,
  zodErrors: null,
  data: {
    username: "",
    email: "",
    password: "",
  },
}

function SignUpForm() {
  const [formState, formAction, isPending] = useActionState(
    actions.auth.registerUserAction,
    INITIAL_STATE,
  )

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign Up</CardTitle>
            <CardDescription>
              Enter your username, email and password to sign up
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="username">Username</Label>
              <Input
                key={`username-${formState.data?.username}`}
                id="username"
                name="username"
                type="text"
                placeholder="example_user"
                defaultValue={formState.data?.username}
              />
              <FormError errors={formState.zodErrors?.username} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="email">Email</Label>
              <Input
                key={`email-${formState.data?.email}`}
                id="email"
                name="email"
                type="email"
                placeholder="example@example.com"
                defaultValue={formState.data?.email}
              />
              <FormError errors={formState.zodErrors?.email} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="password">Password</Label>
              <Input
                key={`password-${formState.data?.password}`}
                id="password"
                name="password"
                type="password"
                placeholder="******"
                defaultValue={formState.data?.password}
              />
              <FormError errors={formState.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className={styles.footer}>
            <Button
              className={styles.button}
              type="submit"
              disabled={isPending}
            >
              Sign Up
            </Button>

            {formState.strapiErrors && (
              <p className="text-pink-500 text-xs italic mt-1 py-2">
                {formState.strapiErrors.message}
              </p>
            )}
          </CardFooter>
        </Card>

        <div className={styles.prompt}>
          Already have an account?{" "}
          <Link href="/signin" className={styles.link}>
            Sign In
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm

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
    identifier: "",
    password: "",
  },
}

function SignInForm() {
  const [formState, formAction, isPending] = useActionState(
    actions.auth.loginUserAction,
    INITIAL_STATE,
  )

  return (
    <div className={styles.container}>
      <form action={formAction}>
        <Card>
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to sign in
            </CardDescription>
          </CardHeader>
          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label htmlFor="identifier">Identifier</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
              <FormError errors={formState.zodErrors?.identifier} />
            </div>
            <div className={styles.fieldGroup}>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
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
              Sign In
            </Button>

            {formState.strapiErrors && (
              <p className="text-pink-500 text-xs italic mt-1 py-2">
                {formState.strapiErrors.message}
              </p>
            )}
          </CardFooter>
        </Card>

        <p className={styles.prompt}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className={styles.link}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignInForm

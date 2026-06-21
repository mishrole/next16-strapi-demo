export interface IUserData {
  identifier?: string
  email?: string
  password?: string
  username?: string
}

export interface FormState {
  success?: boolean
  message?: string
  data?: IUserData
  strapiErrors?: StrapiError | null
  zodErrors?: ZodError | null
}

export interface StrapiError {
  status: number
  name: string
  message: string
  details?: Record<string, string[]>
}

export interface ZodError {
  identifier?: string[]
  username?: string[]
  email?: string[]
  password?: string[]
}

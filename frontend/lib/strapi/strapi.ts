import { IUserData } from "@/interfaces/IUserData"
import qs from "qs"
import { IHomePage } from "./interfaces/IStrapi"

export const STRAPI_BASE_URL = "http://127.0.0.1:1337"

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      on: {
        "layout.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: {
              populate: true,
            },
          },
        },
      },
    },
  },
}

export async function getHomePage() {
  "use cache"

  const query = qs.stringify(QUERY_HOME_PAGE)

  const response = await getData(`/api/home-page?${query}`)

  return response?.data as IHomePage
}

export async function getData(path: string) {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}${path}`)

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`)
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error("Error al obtener los datos:", error)

    return null
  }
}

export async function registerUserService(userData: IUserData) {
  const url = `${STRAPI_BASE_URL}/api/auth/local/register`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    console.log("Success register", data)

    return data
  } catch (error) {
    console.error("Error registering user:", error)

    return null
  }
}

export async function loginUserService(userData: IUserData) {
  const url = `${STRAPI_BASE_URL}/api/auth/local`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    console.log("Success login", data)

    return data
  } catch (error) {
    console.error("Error logging in user:", error)

    return null
  }
}

export async function validateJwt(jwt: string) {
  const url = `${STRAPI_BASE_URL}/api/users/me`
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })

    console.log("validateJwt response:", response)

    const userData = await response.json()

    if (!userData) {
      console.error("Error validating jwt", userData)
      return null
    }

    console.log("Success validating jwt", userData)

    return userData
  } catch (error) {
    console.error("Error validating jwt:", error)

    return null
  }
}

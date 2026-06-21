import { actions } from "@/actions"
import { Button } from "@base-ui/react"

export default function LogoutButton() {
  return (
    <form action={actions.auth.logoutUserAction}>
      <Button
        className="p-2 px-4 bg-pink-500 text-white rounded cursor-pointer hover:bg-pink-700"
        type="submit"
      >
        Logout
      </Button>
    </form>
  )
}

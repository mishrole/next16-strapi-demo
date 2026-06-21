import LogoutButton from "@/components/logoutButton"

export default function DashboardRoute() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dar:bg-gray-900">
      <h1>Dashboard</h1>

      <LogoutButton />
    </div>
  )
}

interface IAuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Readonly<IAuthLayoutProps>) {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </section>
  )
}

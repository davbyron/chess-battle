import { SessionProvider } from "next-auth/react"
import { auth } from "src/auth"

export default async function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
import Image from "next/image";
import { auth, signIn, signOut } from "src/auth";
import JoinGameButton from "src/components/JoinGameButton";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-10 items-center h-full">
      <nav className="w-full flex justify-between items-center py-2 px-5 bg-gray-100">
        <h1 className="font-bold text-xl">Chess Battle</h1>
        {session ? (
          <div className="flex items-center gap-5">
            <div className="relative size-7 rounded-full">
              <Image
                src={session.user.image ?? ""}
                fill
                sizes="100%"
                className="rounded-full"
                alt={session.user.name ? `${session.user.name}'s profile image` : "User's profile image"}
              />
            </div>
            <form
              action={async () => {
                "use server"
                await signOut()
              }}
            >
              <button className="text-sm p-2 rounded-md bg-gray-400" type="submit">Sign out</button>
            </form>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <form
              action={async () => {
                "use server"
                await signIn("google")
              }}
            >
              <button className="text-sm p-2 rounded-md bg-gray-400" type="submit">Signin with Google</button>
            </form>
            <form
              action={async () => {
                "use server"
                await signIn("github")
              }}
            >
              <button className="text-sm p-2 rounded-md bg-gray-400" type="submit">Signin with GitHub</button>
            </form>
          </div>
        )}
      </nav>
      Welcome to the game!
      <JoinGameButton playerId={session?.user.id} />
    </div>
  )
}

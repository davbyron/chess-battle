import Link from "next/link";
import Image from "next/image";
import { auth, signIn } from "src/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-10 items-center h-full">
      <nav className="w-full flex justify-between items-center py-2 px-5 bg-gray-100">
        <h1 className="font-bold text-xl">Chess Battle</h1>
        {session ? (
          <div className="relative size-7 rounded-full">
            <Image
              src={session.user.image ?? ""}
              fill
              sizes="100%"
              className="rounded-full"
              alt={session.user.name ? `${session.user.name}'s profile image` : "User's profile image"}
            />
          </div>
        ) : (
          <form
            action={async () => {
              "use server"
              await signIn("google")
            }}
          >
            <button className="text-sm p-2 rounded-md bg-gray-400" type="submit">Signin with Google</button>
          </form>
        )}
      </nav>
      Welcome to the game!
      <Link
        href="/game/test"
        className="text-white px-5 py-2.5 rounded-lg border-2 border-black bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-500 hover:to-blue-500 active:from-orange-800 active:to-blue-800"
      >
        Join A Game
      </Link>
    </div>
  )
}

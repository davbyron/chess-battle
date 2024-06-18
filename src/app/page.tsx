import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-full">
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

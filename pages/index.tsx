import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-6 max-w-sm mx-auto mt-6 bg-white rounded-xl shadow-md flex items-center space-x-4">
      <Link href="/api/auth/login"><a>Login</a></Link>
      <Link href="/api/auth/logout"><a>Logout</a></Link>
    </div>
  )
}

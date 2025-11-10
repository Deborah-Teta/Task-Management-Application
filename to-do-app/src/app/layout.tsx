'use client'
import { useRouter } from "next/navigation"
import { auth } from "./lib/firebase"
import { signOut } from "@firebase/auth"

export default function RootLayout({children}:{children:React.ReactNode}) {
  const router = useRouter()

  const handleLogOut = async () =>{
    try{
      await signOut(auth)
      alert('Logged out successfully')
      router.push('/Login')
    } catch (error: any) {
      alert(error.message)
    }
  }
  return(
    <html lang="en">
      <body className="bg-gray-400">
    <div className="flex flex-col items-center justify-center min-h-screen bg-black" >
      <button onClick={handleLogOut} className="mt-4 text-sm px-4 py-2 text-blue-600"> signOut</button>
    </div>
    {children}
    </body>
    </html>
  )
}
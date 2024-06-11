"use client"
import { useState, useEffect } from "react"
import Logo from "@/components/images/LandingPage/logo.png"
import Image from "next/image"
import MediumButton from "@/components/MediumButton"
import { createClient } from "@/utils/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@supabase/supabase-js" // Import the User type from Supabase
import { FaCartShopping } from "react-icons/fa6"
import { countDestinations } from "@/app/cart/actions"
import { Badge } from "@/components/ui/badge"

export default function () {
  const [user, setUser] = useState<User | null>(null)
  const [count, setCount] = useState<number>(0)
  const supabase = createClient()

  //checking if user is authenticated
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (data.user) {
      setUser(data.user)
      const fetchCartCount = await countDestinations(data.user.id)
      if (fetchCartCount) {
        setCount(fetchCartCount)
      }
      console.log(user?.user_metadata.full_name)
    } else {
      throw error
    }
  }
  useEffect(() => {
    fetchUser()
  }, [count])

  //logout function
  const logOutUser = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    } else {
      setUser(null)
    }
  }

  //function to get user initials

  return (
    <nav className="px-10 py-5 flex gap-[22%] justify-center">
      <a href="/">
        <div
          id="logo"
          className="flex align-middle">
          <div>
            <Image
              style={{ width: "30px" }}
              src={Logo}
              alt="eestie-explorer"
            />
          </div>
          <div>
            <p className="text-lg font-bold pt-1 pl-3">
              Eestie<span className="text-[#F57906]">Explorer</span>
            </p>
          </div>
        </div>
      </a>
      <div className="pt-3">
        <ul className="list-none flex gap-12 text-sm">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/destinations">Destinations</a>
          </li>
        </ul>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 -ml-20">
            <a href="/profile">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.user_metadata.picture} />
                <AvatarFallback>
                  {" "}
                  {user.user_metadata.full_name.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </a>
            <div className="flex">
              <div>
                <a href="/cart">
                  <FaCartShopping className="color-grey-200 text-3xl mt-2" />
                </a>
              </div>
              <div className="-ml-3 bg-orange-500 w-5 h-5 pt-[2px] rounded-full text-center flex justify-center align-middle">
                <p className="text-xs text-white font-semibold">{count}</p>
              </div>
            </div>

            <MediumButton onClick={logOutUser}>Log out</MediumButton>
          </div>
        ) : (
          <a href="/login">
            <MediumButton>Sign Up</MediumButton>
          </a>
        )}
      </div>
    </nav>
  )
}

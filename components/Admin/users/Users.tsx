"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DeleteButton from "@/components/DeleteButton"
import EditButton from "@/components/EditButton"
import React, { useEffect, useState } from "react"
import { deleteUser, readUsers } from "@/app/admin/users/actions"

export default function users() {
  const [users, setUsers] = useState<any>([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await readUsers()
        if (userData) {
          setUsers(userData.users)
        }
      } catch (error) {
        console.log("Error fetching users:", error)
      }
    }
    fetchUser()
  }, [])

  console.log("Users:", users) // Debugging: Log users state

  return (
    <>
      {users && users.length > 0 ? (
        <div
          id="tour-guides-section"
          className="mx-5 mt-12">
          <div className="mt-3 flex flex-col gap-5">
            {users.map((users: any) => (
              <div className="border-[1.3px] rounded-lg px-7 py-2  justify-between border-[#D3CBFB] w-[96%] flex gap-20 align-middle ">
                <div className="flex my-2">
                  <Avatar className="w-7 h-7">
                    <AvatarImage
                      src={users.user_metadata?.picture}
                      alt="@shadcn"
                    />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex my-3 gap-20">
                  <p className="text-[#797D8C] text-sm">
                    {users.user_metadata?.full_name}
                  </p>
                  <p className="text-[#797D8C] text-sm">
                    {users.user_metadata?.email}
                  </p>
                </div>
                <div className="flex justify-center gap-4 ">
                  <EditButton>Edit</EditButton>
                  <DeleteButton onClick={() => deleteUser(users.id)}>Delete</DeleteButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      )}
    </>
  )
}

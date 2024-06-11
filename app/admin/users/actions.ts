"use server"
import { createClient } from "@/utils/supabase/server"
const supabase = createClient()

//read function to read all users
export async function readUsers() {
  const { data: users, error } = await supabase.auth.admin.listUsers({})

  if (error) {
    console.error("Error fetching users:", error)
    throw error
  } else {
    console.log(users)
    return users
  }
}

//delete function to delete a user
export async function deleteUser(userID: string) {
  const { data,error } = await supabase.auth.admin.deleteUser(userID)
  if (error) {
    console.error("Error deleting user:", error)
    throw error
  } else {
    console.log("User deleted successfully")
  }
}
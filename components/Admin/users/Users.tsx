"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DeleteButton from "@/components/DeleteButton"
import React, { useEffect, useState } from "react"
import { deleteUser, readUsers } from "@/app/admin/users/actions"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function users() {
  const [users, setUsers] = useState<any>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)

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

  //calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem)

  //handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  //calculate the page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  //const handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  //const handle next page
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      {users && users.length > 0 ? (
        <div
          id="tour-guides-section"
          className="mx-5 mt-12">
          <div className="mt-3 flex flex-col gap-5">
            {currentItems.map((users: any) => (
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
                  <DeleteButton onClick={() => deleteUser(users.id)}>
                    Delete
                  </DeleteButton>
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

      <div>
      <Pagination className="mt-3">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePreviousPage()}
                />
              </PaginationItem>
              {pageNumbers.map(number => (
                <PaginationItem
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`${currentPage === number ? "text-white" : "text-black"}`}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === number}>
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handleNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </div>


    </>
    

  )

  
}

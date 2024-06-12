import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"
import { PaginationPage } from "@/components/Pagination"
import {
  guideRead,
  createGuide,
  updateTourGuide,
  deleteGuide,
} from "@/app/admin/guides/actions"
import { createClient } from "@/utils/supabase/client"
import React, { useEffect, useState } from "react"
import AddButton from "@/components/ui/AddButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Guides() {
  const [guides, setGuides] = useState<any>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)

  //calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = guides.slice(indexOfFirstItem, indexOfLastItem)

  //handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

   //calculate the page numbers
   const pageNumbers = []
   for (let i = 1; i <= Math.ceil(guides.length / itemsPerPage); i++) {
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await guideRead()
        setGuides(response)
        console.log(response)
      } catch (error) {
        console.log("Imekataa kufetch")
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteGuide(id)
      // guides?.filter((guides: { id: any }) => guides.tour_guides_id !== id);
    } catch (error) {
      console.error("haijadelete kitu", error)
    }
  }

  return (
    <div
      id="tour-guides-section"
      className="mx-5 mt-12">
      <Dialog>
        <DialogTrigger asChild>
          <AddButton>Add</AddButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a Tour Guide</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4  ">
            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label
                htmlFor="name"
                className="text-right text-green-700">
                First Name
              </Label>

              <Input
                id="name"
                placeholder="John"
                className="col-span-3 text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="username"
                className="text-right text-green-700">
                Last Name
              </Label>
              <Input
                id="username"
                defaultValue="Doe"
                className="col-span-3 text-white"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right text-green-700">
                Languages
              </Label>

              <Input
                id="langauges"
                defaultValue="English..."
                className="col-span-3 text-white"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="image"
                className="text-right text-green-700">
                Image
              </Label>

              <Input
                id="image"
                defaultValue="image path..."
                className="col-span-3 text-white"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="fee"
                className="text-right text-green-700">
                Fee
              </Label>

              <Input
                id="fee"
                defaultValue="10 euro"
                className="col-span-3 text-white"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="museum cert"
                className="text-right text-green-700">
                Museum certification
              </Label>

              <Input
                id="museum_cert"
                defaultValue="true/false"
                className="col-span-3 text-white"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="rating"
                className="text-right text-green-700">
                Ratings
              </Label>

              <Input
                id="rating"
                defaultValue="3 star"
                className="col-span-3 text-white"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="email"
                className="text-right text-green-700">
                Email
              </Label>

              <Input
                id="email"
                defaultValue="Email"
                className="col-span-3 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <EditButton>Save Changes</EditButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="mt-3 grid gap-5">
        {currentItems.map((tourGuide: any) => (
          <div
            key={tourGuide.tourGuides_id}
            className="border-[1.3px] rounded-lg px-7 py-2 border-[#D3CBFB] w-[96%] grid grid-cols-12 items-center">
            <div className="col-span-1">
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src={tourGuide.image_path}
                  alt={`${tourGuide.first_name} ${tourGuide.last_name}`}
                />
                <AvatarFallback>
                  {tourGuide.first_name.charAt(0)}
                  {tourGuide.last_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="col-span-8 grid grid-cols-4 gap-4">
              <p className="text-[#797D8C] text-sm">
                {tourGuide.first_name} {tourGuide.last_name}
              </p>
              <p className="text-sm font-bold">
                {tourGuide.rating} star rating
              </p>
              <p className="text-[#797D8C] text-sm">{tourGuide.fee} Euros</p>
              <p className="text-[#797D8C] text-sm">{tourGuide.email}</p>
            </div>
            <div className="col-span-3 flex justify-center gap-4">
              <EditButton>Edit</EditButton>
              <Button
                className="text-sm bg-[#C94747] px-5 py-2 rounded-[10px] text-white font-semibold"
                onClick={() => handleDelete(tourGuide.tourGuides_id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mr-10 mt-5">
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
    
    </div>
  )
}

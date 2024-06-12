"use client"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  readDestinations,
  deleteDestination,
  updateDestination,
  createDestination,
} from "@/app/admin/destinations/actions"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import LargeButton from "@/components/LargeButton"
import MediumButton from "@/components/MediumButton"
import { createClient } from "@/utils/supabase/client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function Destinations() {
  const [destinations, setdestinations] = useState<any[]>([])
  const [destinationName, setDestinationName] = useState<string>("")
  const [destinationLocation, setDestinationLocation] = useState<string>("")
  const [destinationDescription, setDestinationDescription] = useState<string>("")
  const [destinationRating, setDestinationRating] = useState<number>(0)
  const [destinationImage, setDestinationImage] = useState<File | null>(null)
  const [destinationPrice, setDestinationPrice] = useState<number>(0)
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)
  const supabase = createClient()

  //delete destination
  const handleDelete = async (id: number) => {
    try {
      await deleteDestination(id)
      fetchDestinations()
      console.log("Destination deleted successfully")
    } catch (error) {
      console.log("Could not delete destination ", error)
    }
  }

  //create destination
  const handleCreate = async () => {
    try {
      let image: string | undefined = undefined
      if (destinationImage) {
        let { data: res, error } = await supabase.storage
          .from("destination_images")
          .upload(`${Date.now()}-${destinationImage.name}`, destinationImage, {
            cacheControl: "3600",
            upsert: false,
          })
        let { data } = supabase.storage
          .from("destination_images")
          .getPublicUrl(`${res?.path}`)
        image = data.publicUrl
      }
      const response = await createDestination(
        destinationName,
        destinationDescription,
        destinationRating,
        destinationLocation,
        image,
        destinationPrice,
      )
      setCreateDialogOpen(false)
      fetchDestinations()
      console.log("Destination created successfully")
    } catch (error) {
      console.log("Could not create destination ", error)
    }
  }

  //update destinations
  const handleUpdate = async (destinationId: number) => {
    try {
      let image: string | undefined = undefined
      if (destinationImage) {
        let { data: res, error } = await supabase.storage
          .from("destination_images")
          .upload(`${Date.now()}-${destinationImage.name}`, destinationImage, {
            cacheControl: "3600",
            upsert: false,
          })
        let { data } = supabase.storage
          .from("destination_images")
          .getPublicUrl(`${res?.path}`)
        image = data.publicUrl
      }
      const response = await updateDestination(
        destinationId,
        image,
        destinationName,
        destinationDescription,
        destinationLocation,
        destinationRating,
        destinationPrice,
      )
      console.log("Destination updated successfully")
      setEditDialogOpen(false)
      fetchDestinations()
    } catch (error) {
      console.log("Could not update destination ", error)
    }
  }

  //this fills the values of the input to allow for edits
  const handleEdit = (
    image: File,
    name: string,
    description: string,
    location: string,
    rating: number,
    price: number,
  ) => {
    setDestinationImage(image)
    setDestinationName(name)
    setDestinationLocation(location)
    setDestinationDescription(description)
    setDestinationRating(rating)
    setDestinationPrice(price)
    setEditDialogOpen(true)
  }

  //this clears the values of the input to allow for creation
  const handleCreateInputs = () => {
    setDestinationImage(null)
    setDestinationName("")
    setDestinationLocation("")
    setDestinationDescription("")
    setDestinationRating(0)
    setDestinationPrice(0)
    setCreateDialogOpen(true)
  }

  const fetchDestinations = async () => {
    try {
      const response = await readDestinations()
      if (response) {
        setdestinations(response)
      }
    } catch (error) {
      console.log("Could not fetch counts ", error)
    }
  }

  useEffect(() => {
    fetchDestinations()
  }, [])

  //calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = destinations.slice(indexOfFirstItem, indexOfLastItem)

  //handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  //calculate the page numbers
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(destinations.length / itemsPerPage); i++) {
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
    <div
      id="tour-guides-section"
      className="mx-5">
      <div className="mt-10 flex flex-col gap-4">
        {currentItems.map(destination => (
          <div
            key={destination.destinations_id}
            className="border-[1.3px] rounded-lg px-7 py-2  border-[#D3CBFB] w-[96%] flex gap-20 align-middle justify-center">
            <div className="w-10 flex justify-center align-middle">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={destination.image_path}
                  alt="@shadcn"
                />
                <AvatarFallback>{destination.name}</AvatarFallback>
              </Avatar>
            </div>
            <div className="grid grid-cols-5 mt-1 gap-12 text-left">
              <p className="text-xs font-bold">{destination.name}</p>
              <p className="text-[#797D8C] text-xs text-start">
                {destination.description.slice(0, 20)}
              </p>
              <p className="text-[#797D8C] text-xs">
                {destination.price} €/hour
              </p>
              <p className="text-[#797D8C] text-xs">{destination.location}</p>
              <p className="text-[#797D8C] text-xs">
                rating: {destination.rating}
              </p>
            </div>
            <div className="flex items-center align-middle gap-4">
              {/* edit dialog */}
              <Dialog
                open={editDialogOpen}
                onOpenChange={setEditDialogOpen}>
                <DialogTrigger asChild>
                  <div>
                    <EditButton
                      onClick={() =>
                        handleEdit(
                          destination.image_path,
                          destination.name,
                          destination.description,
                          destination.location,
                          destination.rating,
                          destination.price,
                        )
                      }>
                      Edit
                    </EditButton>
                  </div>
                </DialogTrigger>
                <DialogContent
                  style={{ backgroundColor: "white" }}
                  className="sm:max-w-[425px]">
                  <DialogHeader>
                    <h1 className="font-bold">Edit Destination</h1>
                    <DialogDescription className="pt-3">
                      <div className="flex justify-center">
                        <Image
                          alt="place"
                          src={destination.image_path}
                          width={100}
                          height={150}
                        />
                      </div>
                      <div className="mt-2">
                        <input
                          className="w-full"
                          type="file"
                          accept="image/png"
                          onChange={e =>
                            setDestinationImage(e.target.files?.item(0) as File)
                          }
                        />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">
                          Name
                        </label>
                        <input
                          className="border px-2 py-1 rounded-lg border-gray-700"
                          type="text"
                          value={destinationName}
                          onChange={e => {
                            setDestinationName(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">
                          Location:
                        </label>
                        <input
                          className="border px-2 py-1 rounded-lg border-gray-700"
                          type="text"
                          value={destinationLocation}
                          onChange={e => {
                            setDestinationLocation(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">
                          Description
                        </label>
                        <textarea
                          className="border px-2 py-1 rounded-lg border-gray-700 w-full"
                          value={destinationDescription}
                          onChange={e => {
                            setDestinationDescription(e.target.value)
                          }}
                        />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">
                          Rating
                        </label>
                        <input
                          className="border px-2 py-1 rounded-lg border-gray-700 w-full"
                          type="number"
                          max={5}
                          min={0}
                          value={destinationRating}
                          onChange={e => {
                            setDestinationRating(parseInt(e.target.value))
                          }}
                        />
                      </div>
                      <div className="flex gap-5 text-sm pt-3 text-black">
                        <label className="pt-1 text-[#F57906] font-bold">
                          Cost:
                        </label>
                        <input
                          className="border px-2 py-1 rounded-lg border-gray-700"
                          type="number"
                          min={0}
                          value={destinationPrice}
                          onChange={e => {
                            setDestinationPrice(parseInt(e.target.value))
                          }}
                        />
                      </div>
                      <div className="flex justify-center align-middle mt-5">
                        <EditButton
                          onClick={() =>
                            handleUpdate(destination.destinations_id)
                          }>
                          Edit
                        </EditButton>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <DeleteButton
                onClick={() => {
                  handleDelete(destination.destinations_id)
                }}>
                Delete
              </DeleteButton>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-between mr-10 mt-5">
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
        <div>
          {/* create a destination */}
          <Dialog
            open={createDialogOpen}
            onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <div className="mt-3 flex justify-center">
                <LargeButton onClick={() => handleCreateInputs()}>
                  Add destination
                </LargeButton>
              </div>
            </DialogTrigger>
            <DialogContent
              style={{ backgroundColor: "white" }}
              className="sm:max-w-[425px]">
              <DialogHeader>
                <h1 className="font-bold">Create Destination</h1>
                <DialogDescription className="pt-3">
                  <div className="mt-2">
                    <input
                      className="w-full"
                      type="file"
                      accept="image/png"
                      onChange={e =>
                        setDestinationImage(e.target.files?.item(0) as File)
                      }
                    />
                  </div>
                  <div className="flex gap-5 text-sm pt-3 text-black">
                    <label className="pt-1 text-[#F57906] font-bold">
                      Name
                    </label>
                    <input
                      className="border px-2 py-1 rounded-lg border-gray-700"
                      type="text"
                      value={destinationName}
                      onChange={e => {
                        setDestinationName(e.target.value)
                      }}
                    />
                  </div>
                  <div className="flex gap-5 text-sm pt-3 text-black">
                    <label className="pt-1 text-[#F57906] font-bold">
                      Location:
                    </label>
                    <input
                      className="border px-2 py-1 rounded-lg border-gray-700"
                      type="text"
                      value={destinationLocation}
                      onChange={e => {
                        setDestinationLocation(e.target.value)
                      }}
                    />
                  </div>
                  <div className="flex gap-5 text-sm pt-3 text-black">
                    <label className="pt-1 text-[#F57906] font-bold">
                      Description
                    </label>
                    <textarea
                      className="border px-2 py-1 rounded-lg border-gray-700 w-full"
                      value={destinationDescription}
                      onChange={e => {
                        setDestinationDescription(e.target.value)
                      }}
                    />
                  </div>
                  <div className="flex gap-5 text-sm pt-3 text-black">
                    <label className="pt-1 text-[#F57906] font-bold">
                      Rating
                    </label>
                    <input
                      className="border px-2 py-1 rounded-lg border-gray-700 w-full"
                      type="number"
                      max={5}
                      min={0}
                      value={destinationRating}
                      onChange={e => {
                        setDestinationRating(parseInt(e.target.value))
                      }}
                    />
                  </div>
                  <div className="flex gap-5 text-sm pt-3 text-black">
                    <label className="pt-1 text-[#F57906] font-bold">
                      Cost:
                    </label>
                    <input
                      className="border px-2 py-1 rounded-lg border-gray-700"
                      type="number"
                      min={0}
                      value={destinationPrice}
                      onChange={e => {
                        setDestinationPrice(parseInt(e.target.value))
                      }}
                    />
                  </div>
                  <div className="flex justify-center align-middle mt-5">
                    <MediumButton onClick={() => handleCreate()}>
                      Add Destination
                    </MediumButton>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

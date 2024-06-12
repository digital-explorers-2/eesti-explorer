"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditButton from "@/components/EditButton"
import DeleteButton from "@/components/DeleteButton"
import { PaginationPage } from "@/components/Pagination"
import {
  guideRead,
  createGuide,
  updateGuide,
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
import Image from "next/image"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import MediumButton from "@/components/MediumButton"

export default function Guides() {
  const [guides, setGuides] = useState<any>([])

  const [guideId, setGuideId] = useState<number>(0)
  const [guideFirstName, setGuideFirstName] = useState<string>("")
  const [guideLastName, setGuideLastName] = useState<string>("")
  const [guideFee, setGuideFee] = useState<number>(0)
  const [guideEmail, setGuideEmail] = useState<string>("")
  const [guideRating, setGuideRating] = useState<number>(0)
  const [guideImage, setGuideImage] = useState<File | null>(null)
  const [guideLanguages, setGuideLanguages] = useState<string>("")
  const [guideCertification, setGuideCertification] = useState<string>("")
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false)
  const [guideImagePath, setGuideImagePath] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(3)
  const supabase = createClient()

  const fetchGuides = async () => {
    try {
      const response = await guideRead()
      if (response) {
        setGuides(response)
      }
    } catch (error) {
      console.log("Could not fetch counts ", error)
    }
  }

  useEffect(() => {
    fetchGuides()
  }, [])

  //create destination
  const handleCreate = async () => {
    try {
      let image: string | undefined = undefined
      if (guideImage) {
        let { data: res, error } = await supabase.storage
          .from("guide_images")
          .upload(${Date.now()}-${guideImage.name}, guideImage, {
            cacheControl: "3600",
            upsert: false,
          })
        let { data } = supabase.storage
          .from("guide_images")
          .getPublicUrl(${res?.path})
        image = data.publicUrl
      }
      const response = await createGuide(
        guideFirstName,
        guideLastName,
        guideRating,
        guideFee,
        guideCertification,
        image,
        guideEmail,
        guideLanguages,
      )
      setCreateDialogOpen(false)
      fetchGuides()
      console.log("Guide created successfully")
    } catch (error) {
      console.log("Could not create guide ", error)
    }
  }

  const handleCreateAdd = () => {
    setGuideImage(null)
    setGuideFirstName("")
    setGuideLastName("")
    setGuideFee(0)
    setGuideRating(0)
    setGuideLanguages("")
    setGuideEmail("")
    setCreateDialogOpen(false)
    setGuideCertification("")
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

  //update Guides
  const handleUpdate = async () => {
    try {
      let image: string | undefined = undefined
      if (guideImage) {
        let { data: res, error } = await supabase.storage
          .from("guide_images")
          .upload(${Date.now()}-${guideImage.name}, guideImage, {
            cacheControl: "3600",
            upsert: false,
          })
        let { data } = supabase.storage
          .from("guide_images")
          .getPublicUrl(${res?.path})
        image = data.publicUrl
      }
      console.log(guideId)
      const response = await updateGuide(
        guideId,
        guideFirstName,
        guideLastName,
        guideRating,
        guideFee,
        guideCertification,
        image,
        guideEmail,
        guideLanguages,
      )
      console.log("Destination updated successfully")
      setEditDialogOpen(false)
      fetchGuides()
    } catch (error) {
      console.log("Could not update guides ", error)
    }
  }

  //this clears the values of the input to allow for creation
  const handleCreateInputs = () => {
    setGuideImage(null)
    setGuideFirstName("")
    setGuideLastName("")
    setGuideCertification("")
    setGuideLanguages("")
    setGuideRating(0)
    setGuideFee(0)
    setCreateDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteGuide(id)
      fetchGuides()
      console.log("Guide deleted successfully")
      // guides?.filter((guides: { id: any }) => guides.tour_guides_id !== id);
    } catch (error) {
      console.error("haijadelete kitu", error)
    }
  }

  //this fills the values of the input to allow for edits
  const handleEdit = (
    guide_id: number,
    image: File,
    first_name: string,
    last_name: string,
    rating: number,
    fee: number,
    certification: string,
    email: string,
    languages: string,
    image_path: string,
  ) => {
    setGuideId(guide_id)
    setGuideImage(image)
    setGuideFirstName(first_name)
    setGuideLastName(last_name)
    setGuideRating(rating)
    setGuideFee(fee)
    setGuideCertification(certification)
    setGuideEmail(email)
    setGuideLanguages(languages)
    setGuideImagePath(image_path)
  }

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

  return (
    <>
      <div
        id="tour-guides-section"
        className="mx-5 mt-12">
        <div className="flex flex-col mt-3 gap-5">
          {currentItems.map((guide: any) => (
            <div
              key={guide.tourGuides_id}
              className="border-[1.3px] rounded-lg px-7 py-2 border-[#D3CBFB] w-[96%] grid grid-cols-12 items-center">
              <div className="col-span-1">
                <Avatar className="w-7 h-7">
                  <AvatarImage
                    src={guide.image_path}
                    alt={guide.first_name}
                  />
                  <AvatarFallback>
                    {guide.first_name.charAt(0)}
                    {guide.last_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="col-span-8 grid grid-cols-4 gap-4">
                <p className="text-[#797D8C] text-sm">
                  {guide.first_name} {guide.last_name}
                </p>
                <p className="text-sm font-bold">{guide.rating} star rating</p>
                <p className="text-[#797D8C] text-sm">{guide.fee} Euros</p>
                <p className="text-[#797D8C] text-sm">{guide.email}</p>
              </div>
              <div className="col-span-3 flex justify-center gap-4 ml-16">
                {/* edit dialog */}
                <Dialog
                  open={editDialogOpen}
                  onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <div>
                      <EditButton
                        onClick={() =>
                          handleEdit(
                            guide.tourGuides_id,
                            guide.image_path,
                            guide.first_name,
                            guide.last_name,
                            guide.rating,
                            guide.fee,
                            guide.museum_certification,
                            guide.email,
                            guide.languages,
                            guide.image_path,
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
                            src={guideImagePath}
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
                              setGuideImage(e.target.files?.item(0) as File)
                            }
                          />
                        </div>
                        <div className="flex gap-5 text-sm pt-3 text-black">
                          <label className="pt-1 text-[#F57906] font-bold">
                            First Name
                          </label>
                          <input
                            className="border px-2 py-1 rounded-lg border-gray-700"
                            type="text"
                            value={guideFirstName}
                            onChange={e => {
                              setGuideFirstName(e.target.value)
                            }}
                          />
                        </div>
                        <div className="flex gap-5 text-sm pt-3 text-black">
                          <label className="pt-1 text-[#F57906] font-bold">
                            Last Name
                          </label>
                          <input
                            className="border px-2 py-1 rounded-lg border-gray-700"
                            type="text"
                            value={guideLastName}
                            onChange={e => {
                              setGuideLastName(e.target.value)
                            }}
                          />
                        </div>
                        <div className="flex gap-5 text-sm pt-3 text-black">
                          <label className="pt-1 text-[#F57906] font-bold">
                            Ratings:
                          </label>
                          <input
                            className="border px-2 py-1 rounded-lg border-gray-700"
                            type="text"
                            value={guideRating}
                            onChange={e => {
                              setGuideRating(Number(e.target.value))
                            }}
                          />
                        </div>
                        <div className="flex gap-5 text-sm pt-3 text-black">
                          <label className="pt-1 text-[#F57906] font-bold">
                            Fee
                          </label>
                          <textarea
                            className="border px-2 py-1 rounded-lg border-gray-700 w-full"
                            value={guideFee}
                            onChange={e => {
                              setGuideFee(Number(e.target.value))
                            }}
                          />
                        </div>
                        <div className="flex gap-5 text-sm pt-3 text-black">
                          <label className="pt-1 text-[#F57906] font-bold">
                            Certification
                          </label>
                          <input
                            className="border px-2 py-1 rounded-lg border-gray-700 w-full"
                            max={5}
                            min={0}
                            value={guideCertification}
                            onChange={e => {
                              setGuideCertification(e.target.value)
                            }}
                          />
                        </div>

                        <div className="flex gap-5 text-sm pt-3 text-black">
                          <label className="pt-1 text-[#F57906] font-bold">
                            Email
                          </label>
                          <input
                            className="border px-2 py-1 rounded-lg border-gray-700"
                            type="text"
                            min={0}
                            value={guideEmail}
                            onChange={e => {
                              setGuideEmail(e.target.value)
                            }}
                          />
                        </div>
                        <div className="flex justify-center align-middle mt-5">
                          <EditButton onClick={() => handleUpdate()}>
                            Edit
                          </EditButton>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <DeleteButton onClick={() => handleDelete(guide.tourGuides_id)}>
                  Delete
                </DeleteButton>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-5">
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
                    className={${currentPage === number ? "text-white" : "text-black"}}>
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
          <div className="mt-2 mr-10">
            <Dialog
              open={createDialogOpen}
              onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <MediumButton onClick={() => handleCreateAdd()}>Add Tour Guide</MediumButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Guide</DialogTitle>
                </DialogHeader>

                <div className="mt-2">
                  <input
                    className="w-full"
                    type="file"
                    accept="image/png"
                    onChange={e =>
                      setGuideImage(e.target.files?.item(0) as File)
                    }
                  />
                </div>

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
                      value={guideFirstName}
                      onChange={e => setGuideFirstName(e.target.value)}
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
                      placeholder="Doe"
                      value={guideLastName}
                      onChange={e => setGuideLastName(e.target.value)}
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
                      id="languages"
                      placeholder="English..."
                      value={guideLanguages}
                      onChange={e => setGuideLanguages(e.target.value)}
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
                      value={guideFee}
                      onChange={e => setGuideFee(Number(e.target.value))}
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
                      value={guideCertification}
                      onChange={e => setGuideCertification(e.target.value)}
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
                      value={guideRating}
                      onChange={e => setGuideRating(Number(e.target.value))}
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
                      value={guideEmail}
                      onChange={e => setGuideEmail(e.target.value)}
                      className="col-span-3 text-white"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <EditButton onClick={() => handleCreate()}>
                    Save Changes
                  </EditButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}
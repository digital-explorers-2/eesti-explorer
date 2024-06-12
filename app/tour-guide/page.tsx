"use client"
import Footer from "@/components/Footer"
import Heading from "@/components/Heading"
import Navbar from "@/components/Navbar"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { BiWorld } from "react-icons/bi"
import { RiMoneyEuroBoxLine } from "react-icons/ri"
import { guideRead, updateCart, updateGuideDate } from "../tour-guide/actions"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

export default function Guides() {
  const FormSchema = z.object({
    dob: z.date({
      required_error: "A booking date is required.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [guides, setGuides] = useState<any>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await guideRead()
        setGuides(response)
        console.log(response)
      } catch (error) {
        throw new Error("Error fetching tour guides")
      }
    }
    fetchData()
  }, [])

  const handleUpdate = async (tour_guide_id: string, date: Date) => {
    const { data, error } = await supabase.auth.getUser()
    if (data?.user) {
      try {
        await updateCart(data.user.id, tour_guide_id)
        await updateGuideDate(tour_guide_id, date)
        toast({
          title: "Booking successful",
          description: `Tour guide ${tour_guide_id} booked for ${format(date, "PPP")}`,
        })
      } catch (error) {
        console.error("Error updating cart or guide date", error)
        toast({
          title: "Booking failed",
          description: "There was an error booking the tour guide."
          
        })
      }
    } else {
      console.error("No user logged in")
      toast({
        title: "Booking failed",
        description: "No user logged in."
        
      })
    }
  }

  return (
    <>
      <Navbar />

      <div className="text-center mt-5">
        <Heading underlinedText="Tour" otherText=" Guides" />
      </div>

      <div className="px-20 grid grid-cols-3 gap-x-10 gap-y-16 py-14">
        {guides.map((guide: any) => (
          <div
            className="px-5 py-5 bg-white border-[1.5px] rounded-xl"
            key={guide.tourGuides_id}
          >
            <div className="flex align-middle justify-center">
              <Image
                alt="tour guide"
                src={guide.image_path}
                width={300} // Set the appropriate width
                height={100} // Set the appropriate height
              />
            </div>
            <h1 className="text-sm font-bold pt-5">
              {guide.first_name} {guide.last_name}
            </h1>
            <div className="justify-between">
              <div className="flex gap-5 text-sm pt-3">
                <div className="pt-1">
                  <BiWorld />
                </div>
                <p>Languages: {guide.languages}</p>
              </div>

              <div className="flex gap-5 text-sm pt-3">
                <div className="pt-1">
                  <RiMoneyEuroBoxLine />
                </div>
                <p>Fee: {guide.fee}€ </p>
              </div>

              <div className="flex gap-5 text-sm pt-3 my-3">
                <Form {...form}>
                  <form
                    // onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Booking date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "P")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />

                          <div className="pt-5">
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdate(guide.tourGuides_id, field.value)
                              }
                              className="bg-[#F57906] w-full py-2 rounded-md text-sm text-white font-bold"
                            >
                              Book Now
                            </button>
                          </div>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
"use server"

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

const supabase = createClient()

export async function guideRead() {
  const { data, error } = await supabase.from("tour_guides").select("*")
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}

//create destination
export async function createGuide(first_name:string,last_name:string, rating:number, fee:number, image_path:string, email:string){
    const {data, error} = await supabase.from('tour_guides').insert({first_name: first_name, last_name: last_name, rating: rating, image: image_path, price: fee})
    try{
        if(data){
            return data
        }
        else{
            console.log("Could not add new guide ", error)
        }
    }
    catch(error){
        console.log("Could not add new guide ", error)
    }
}

//update destination
export async function updateTourGuide(tourGuide_id:number, first_name:string, last_name:string, fee:number, rating:number , email:string ,image_path:string){
    const {data, error} = await supabase.from('tour_guides').update({first_name: first_name, last_name:last_name, fee: fee, rating: rating, image_path:image_path, email: email}).eq('tourGuide_id', tourGuide_id)
    try{
        if(data){
            return data
        }
        else{
            console.log("Could not tour guide ", error)
        }
    }
    catch(error){
        console.log("Could not tour guide ", error)
    }
}

//delete destination
export async function deleteGuide(tourGuide_Id:number){
    const {data, error} = await supabase.from('tour_guides').delete().eq('tourGuides_id', tourGuide_Id)
    try{
        if(data){
            return data
        }
        else{
            console.log("Could not delete Guide ", error)
        }
    }
    catch(error){
        console.log("Could not delete Guide", error)
    }
}

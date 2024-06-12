'use server'
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export async function guideRead() {
  const { data, error } = await supabase.from("tour_guides").select("*").order("tourGuides_id", { ascending: true })
  if (error) {
    console.error("Error fetching record:", error.message)
  } else {
    console.log("Record fetched successfully!")
    return data
  }
}

//create destination
export async function createGuide(guideFirstName:string,guideLastName:string, guideRating:number, guideFee:number,guideCertification:string, guideImage?:string, guideEmail?:string, guideLanguages?:string ){
    const {data, error} = await supabase.from('tour_guides').insert({first_name: guideFirstName, last_name: guideLastName, rating: guideRating, image_path: guideImage, fee: guideFee, languages:guideLanguages, email:guideEmail, museum_certification:guideCertification})
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
export async function updateGuide(guideId:number, guideFirstName:string,guideLastName:string, guideRating:number, guideFee:number,guideCertification:string, guideImage?:string, guideEmail?:string, guideLanguages?:string){
    const {data, error} = await supabase.from('tour_guides').update({first_name: guideFirstName, last_name: guideLastName, rating: guideRating, image_path: guideImage, fee: guideFee, languages:guideLanguages, email:guideEmail, museum_certification:guideCertification}).eq('tourGuides_id', guideId)
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
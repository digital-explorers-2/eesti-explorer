'use server'
import {createClient} from "@/utils/supabase/server"
const supabase = createClient();

//read destinations
export async function readDestinations(){
    const {data: destinations, error: destinationsError} = await supabase.from('destinations').select('*')
    try{
        if(destinations){
            return destinations
        }
        else{
            console.log("Could not fetch destinations ", destinationsError)
        }
    }
    catch(error){
        console.log("Could not fetch destinations ", error)
    }
}

//create destination
export async function createDestination(destinationName:string, destinationDescription:string, destinationRating:number, destinationImage:string, destinationPrice:number){
    const {data, error} = await supabase.from('destinations').insert({name: destinationName, description: destinationDescription, rating: destinationRating, image: destinationImage, price: destinationPrice})
    try{
        if(data){
            return data
        }
        else{
            console.log("Could not create destination ", error)
        }
    }
    catch(error){
        console.log("Could not create destination ", error)
    }
}

//update destination
export async function updateDestination(destinationId:number, destinationName:string, destinationDescription:string, destinationRating:number, destinationImage:string, destinationPrice:number){
    const {data, error} = await supabase.from('destinations').update({name: destinationName, description: destinationDescription, rating: destinationRating, image: destinationImage, price: destinationPrice}).eq('destination_id', destinationId)
    try{
        if(data){
            return data
        }
        else{
            console.log("Could not update destination ", error)
        }
    }
    catch(error){
        console.log("Could not update destination ", error)
    }
}

//delete destination
export async function deleteDestination(destinationId:number){
    const {data, error} = await supabase.from('destinations').delete().eq('destination_id', destinationId)
    try{
        if(data){
            return data
        }
        else{
            console.log("Could not delete destination ", error)
        }
    }
    catch(error){
        console.log("Could not delete destination ", error)
    }
}

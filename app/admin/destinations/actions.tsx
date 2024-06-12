'use server'
import {createClient} from "@/utils/supabase/server"
const supabase = createClient();

//read destinations
export async function readDestinations(){
    const {data: destinations, error: destinationsError} = await supabase.from('destinations').select('*').order('destinations_id', {ascending: true})
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
export async function createDestination(destinationName:string, destinationDescription:string, destinationRating:number, destinationLocation:string, destinationImage?:string, destinationPrice?:number){
    const {data, error} = await supabase.from('destinations').insert({name: destinationName, description: destinationDescription, rating: destinationRating, image_path: destinationImage, price: destinationPrice, location:destinationLocation})
    try{
        if(data){
            console.log("Successfully created destination ", data)
            return data
        }
    }
    catch(error){
        console.log("Could not create destination ", error)
    }
}

//update destination
export async function updateDestination(destinationId:number, destinationImage?:string, destinationName?:string, destinationDescription?:string, destinationLocation?:string, destinationRating?:number, destinationPrice?:number){
    const {data, error} = await supabase.from('destinations').update({name: destinationName, image_path:destinationImage, description: destinationDescription, location:destinationLocation, rating: destinationRating, price: destinationPrice}).eq('destinations_id', destinationId)
    try{
        if(data){
            console.log("Successfully updated destination ")
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
    //first delete from billing table since it is a foreign key
    const {error: billingError} = await supabase.from('billing').delete().eq('destination_id', destinationId)
    if(billingError){
        console.log("Could not delete destination from billing table ", billingError)
    }
    else{
        const {error} = await supabase.from('destinations').delete().eq('destinations_id', destinationId)
        try{
            if(error){
                console.log("Could not delete destination after response ", error)
            }
            else{
                console.log("Destination deleted successfully")
            }
        }
        catch(error){
            console.log("Could not delete destinations ", error)
        }
    }
}

'use server'
import {createClient} from "@/utils/supabase/server"

const supabase = createClient();

export async function readDataCounts(){
    const {data: destinationCount, error: destinationCountError} = await supabase.from('destinations').select('*')
    // const {data: userCount, error: userCountError} = await supabase.from('users').select('*')
    const { data: userCount, error: userCountError } = await supabase.auth.admin.listUsers()
    if (userCountError) throw userCountError;
    const {data: tourGuidesCount, error: tourGuidesCountError} = await supabase.from('tour_guides').select('*')
    const {data: paymentData, error: paymentCountError} = await supabase.from('payments').select('*')
    console.log(userCount)   
    try{
        if( destinationCount && userCount && tourGuidesCount && paymentData){
            const totalDestinations = destinationCount.length
            const totalUsers = userCount.users.length
            const totalTourGuides = tourGuidesCount.length
            
            //get total payment amounts
            let totalPayments = 0;
            for(let i=0; i<paymentData.length; i++){
                totalPayments += paymentData[i].amount
            }
            const totalPaymentAmount = totalPayments
            console.log(totalDestinations, totalUsers, totalTourGuides, totalPayments)
            return {totalDestinations, totalUsers, totalTourGuides, totalPaymentAmount}
        }
    }
    catch(error){
        console.log("Could not fetch counts ", destinationCountError, userCountError, tourGuidesCountError, paymentCountError)
    }
}

export async function topTourGuides(){
    const {data: tourGuides, error: tourGuidesError} = await supabase.from('tour_guides').select('*').order('rating', {ascending:false}).limit(2)
    try{
        if(tourGuides){
            return tourGuides
        }
    }
    catch(error){
        console.log("Could not fetch tour guides ", tourGuidesError)
    }
}

export async function topDestinations(){
    const {data: destinations, error: destinationsError} = await supabase.from('destinations').select('*').order('rating', {ascending:false}).limit(4)
    try{
        if(destinations){
            const topDestinationsNames = destinations.map(destination => destination.name)
            const topDestinationsRatings = destinations.map(destination => destination.rating)
            return {topDestinationsNames, topDestinationsRatings}
        }
        else{
            console.log("Could not fetch destinations ", destinationsError)
        }  
    }
    catch(error){
        console.log("Could not fetch top destinations ", error)
    }
}
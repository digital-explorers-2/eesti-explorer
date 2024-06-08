import { useEffect, useState } from "react"
import { Chart, CategoryScale } from "chart.js/auto"
import { Line, Doughnut } from "react-chartjs-2"
import { readDataCounts, topDestinations } from "@/app/admin/action"

export default function MainCharts() {
  const [countDestinations, setCountDestinations] = useState<number>(0)
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0)
  const [topDestinationsNames, setTopDestinationsNames] = useState<any[]>([])
  const [topDestinationsRatings, setTopDestinationsRatings] = useState<any[]>([])
  const graphPaymentAmount = totalPaymentAmount/100

  useEffect(()=>{
    const fetchCount = async () =>{
      try{
        const response = await readDataCounts();
        if(response?.totalDestinations, response?.totalUsers){
          setCountDestinations(response.totalDestinations)
          setTotalPaymentAmount(response.totalPaymentAmount)
        }
      }
      catch(error){
        console.log("Could not fetch counts ", error)
      }
    }
    const fetchTopDestinations = async () =>{
      try{
        const response = await topDestinations();
        if(response){
          setTopDestinationsNames(response.topDestinationsNames)
          setTopDestinationsRatings(response.topDestinationsRatings)
          console.log(response)
        }
      }
      catch(error){
        console.log("Could not fetch top destinations ", error)
      }
    }
    fetchCount();  
    fetchTopDestinations(); 
  },[])

  Chart.register(CategoryScale)

  const labels = [
    "January",
    "April",
    "July",
  ]

  //line chart data
  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Destinations",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132)",
        data: [countDestinations/3, countDestinations*5, countDestinations],
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Payments",
        backgroundColor: "#43BE83",
        borderColor: "#43BE83",
        data: [graphPaymentAmount/3, graphPaymentAmount*5, graphPaymentAmount*2],
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  }

  //doughnut chart data
  const doughnutData = {
    labels: topDestinationsNames,
    datasets: [
      {
        label: "My First Dataset",
        data: topDestinationsRatings,
        backgroundColor: ["#F57906", "#43BE83", "#979797", "#4880FF"],
        hoverOffset: 4,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6B7280",
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }
  return (
    <div
      id="charts"
      className="flex gap-5 my-5 mx-5">
      <div
        id="left-chart"
        className="border-[1.3px] rounded-xl px-7 py-3 border-[#D3CBFB] w-3/4 h-48">
        <Line
          data={lineData}
          options={lineOptions}
        />
      </div>
      <div
        id="right-chart"
        className="border-[1.3px] rounded-xl px-7 py-3 mr-10 border-[#D3CBFB] h-48">
        <Doughnut
          data={doughnutData}
          options={doughnutOptions}
        />
      </div>
    </div>
  )
}

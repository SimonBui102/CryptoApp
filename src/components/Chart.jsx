import React, { useEffect,useState } from "react";
import { LineChart, Line,XAxis,YAxis,CartesianGrid,Legend,ResponsiveContainer,Tooltip } from 'recharts';


const API_KEY = import.meta.env.VITE_API_URL;

const ChartComponent = ({data}) => (

    <ResponsiveContainer  height= {"90%"} >
  <LineChart width={400} height={400} data={data}>
    <Line dataKey="prices" stroke="#ffdf20" strokeWidth={"1px"} />
    <CartesianGrid stroke="#323232" />
     <XAxis dataKey="date" hide />
    <YAxis dataKey="prices" hide domain={["auto","auto"]} />
    <Legend />
    <Tooltip />
  </LineChart>
  </ResponsiveContainer>
);


export default function Chart({id}) {

    const [chartData, setChartData] = useState();

    useEffect(() => {
        
        const fetchChartData = async(id) => {

            
            try {
            const options = {
                method: "GET",
                headers: {
                accept: "application/json",
                "x-cg-demo-api-key": API_KEY,
                },
                body: undefined
            };

            const data = await fetch(
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=2`,
                options
            ).then((res) => res.json());

            console.log("chart-data",data);

            let convertedData = data.prices.map((items) => {

                return {
                    date: new Date(items[0]).toLocaleDateString(),
                    prices: items[1]
                }
            })

  

            setChartData(convertedData);

            } catch (error) {
            console.log(error);
            }



        }

        fetchChartData(id);

    },[id])


    return(

        <div className="w-full h-[60%]"> 
            <ChartComponent data={chartData}/>
        </div>

    );
}


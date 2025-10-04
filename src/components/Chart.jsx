import React, { useContext, useEffect,useState } from "react";
import { LineChart, Line,XAxis,YAxis,CartesianGrid,Legend,ResponsiveContainer,Tooltip } from 'recharts';
import { CryptoContext } from "../context/CryptoContext";


const API_KEY = import.meta.env.VITE_API_URL;


function CustomTooltip({ payload, label, active, currency="usd" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-yellow-300">{`${label} : ${

            new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currency,
                                    minimumFractionDigits: 5,
                                    
                            }).format(payload[0].value)
            
            
            
            }`}</p>
        
        
      </div>
    );
  }

  return null;
}

const ChartComponent = ({data, currency, type}) => (

    <ResponsiveContainer  height= {"66%"} >
  <LineChart width={400} height={400} data={data}>
    <Line type="monotone" dataKey={type} stroke="#ffdf20" strokeWidth={"1px"} />
    <CartesianGrid stroke="#323232" />
     <XAxis dataKey="date" hide />
    <YAxis dataKey={type} hide domain={["auto","auto"]} />
    <Legend />
    <Tooltip content={<CustomTooltip /> } currency={currency} cursor={false} wrapperStyle={{outline:"none"}}/>
  </LineChart>
  </ResponsiveContainer>
);


export default function Chart({id}) {

    const [chartData, setChartData] = useState();
    let {currency} = useContext(CryptoContext);
    const [type, setType] = useState("prices");
    const [days, setDays] = useState(7);


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
                `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=daily&precision=2`,
                options
            ).then((res) => res.json());

            console.log("chart-data",data);

            let convertedData = data[type].map((items) => {

                return {
                    date: new Date(items[0]).toLocaleDateString(),
                    [type]: items[1]
                }
            })

  

            setChartData(convertedData);

            } catch (error) {
            console.log(error);
            }



        }

        fetchChartData(id);

    },[id, currency,type,days])


    return(

        <div className="w-full h-[65%] mt-5 pt-10"> 
            <ChartComponent data={chartData} currency={currency} type = {type}/>

            <div className="flex">
                <button className= {`text-sm py-0.5 px-1.5 ml-2 rounded capitalize ${type === "prices" ? 'bg-yellow-200/30 text-yellow-200' : 'bg-gray-500/20 text-gray-200/40'}`} onClick= {() => {setType("prices")}}> Price</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 rounded capitalize ${type === "market_caps" ? 'bg-yellow-200/30 text-yellow-200' : 'bg-gray-500/20 text-gray-200/40'}` } onClick= {() => {setType("market_caps")}}> market caps</button>
                <button className={`text-sm py-0.5 px-1.5 ml-2 rounded capitalize ${type === "total_volumes" ? 'bg-yellow-200/30 text-yellow-200' : 'bg-gray-500/20 text-gray-200/40'}`} onClick= {() => {setType("total_volumes")}}> total volumes</button>

                <button className= {`text-sm py-0.5 px-1.5 ml-2 rounded capitalize ${days === 7 ? 'bg-yellow-200/30 text-yellow-200' : 'bg-gray-500/20 text-gray-200/40'}`} onClick= {() => {setDays(7)}}> 7d</button>
                <button className= {`text-sm py-0.5 px-1.5 ml-2 rounded capitalize ${days === 14 ? 'bg-yellow-200/30 text-yellow-200' : 'bg-gray-500/20 text-gray-200/40'}`} onClick= {() => {setDays(14)}}> 14d</button>
                <button className= {`text-sm py-0.5 px-1.5 ml-2 rounded capitalize ${days === 30 ? 'bg-yellow-200/30 text-yellow-200' : 'bg-gray-500/20 text-gray-200/40'} `} onClick= {() => {setDays(30)}}> 30d</button> 
                

            </div>

        </div>

    );
}


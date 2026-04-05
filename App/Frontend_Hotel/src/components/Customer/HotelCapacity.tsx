import React, { useState } from "react";
import { useEffect } from "react";
import { type HotelTotalCapacity, getHotelTotalCapacity } from "../../api/customViews";

interface Props{
    chainName: string
}

const HotelCapacity:React.FC<Props> = ({chainName}) => {
    const [totalHotelCapacity, setTotalHotelCapcity] = useState<HotelTotalCapacity[] | null>(null);

    useEffect(() =>{
        const fetchData = async () => {
            const data = await getHotelTotalCapacity();

            const filtered = data.hotel_total_capacity.filter(
                (hotel) => hotel.chain_name == chainName
            );

            setTotalHotelCapcity(filtered);
        };
            
        fetchData();
    },[])


    return (
         <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-boba-silver shadow-md rounded-xl border border-gray-200">
                
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Hotel Capacity ({chainName})
                    </h2>
                </div>

                {/* Scrollable Table */}
                <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
                            <tr>
                                <th className="px-4 py-2">Hotel</th>
                                <th className="px-4 py-2 text-right">Capacity</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {totalHotelCapacity?.map((hotel, index) => (
                                <tr
                                    key={index}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-2">{hotel.hotel_id}</td>
                                    <td className="px-4 py-2 text-right font-medium">
                                        {hotel.total_capacity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty state */}
                    {totalHotelCapacity?.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No data available
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
}
 
export default HotelCapacity;
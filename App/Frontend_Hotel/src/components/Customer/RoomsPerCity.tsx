import React from "react";
import { useEffect, useState } from "react";

import { type AvailableRoomsPerCity, getAvailableRoomsPerCity } from "../../api/customViews";

const RoomsPerCity:React.FC = () => {
    const [availRooms, setAvailRooms] = useState<AvailableRoomsPerCity[]|null>(null);

     // Fetch data on mount
        useEffect(() => {
            const fetchData = async () => {
              const data = await getAvailableRoomsPerCity();
              setAvailRooms(data.hotels_with_available_rooms);
            };
    
            fetchData();
        }, []);

    return ( 
         <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md bg-boba-silver shadow-md rounded-xl border border-gray-200">
                
                {/* Header */}
                <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Available Rooms per City
                    </h2>
                </div>

                {/* Scrollable Table */}
                <div className="max-h-64 overflow-y-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        
                        {/* Table Head */}
                        <thead className="bg-gray-100 text-xs uppercase text-gray-600 sticky top-0">
                            <tr>
                                <th className="px-4 py-2">City</th>
                                <th className="px-4 py-2 text-right">Available</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {availRooms?.map((room, index) => (
                                <tr
                                    key={index}
                                    className="border-b last:border-none hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-2">{room.city}</td>
                                    <td className="px-4 py-2 text-right font-medium">
                                        {room.available_rooms}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty state */}
                    {availRooms?.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            No data available
                        </div>
                    )}
                </div>
            </div>
        </div>
     );
}
 
export default RoomsPerCity;
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { getHotelChains, type HotelChain } from "../api/hotels";


const HotelChainSelection: React.FC = () => {
    const [chains, setChains] = useState<HotelChain[] | null>(null);
    const navigate = useNavigate();

    //grab chains on mount
    useEffect(()=>{
        const fetchChains = async () => {
            const data = await getHotelChains();
            setChains(data);
            
        }

        fetchChains();
    },[])

    const handleSelect = (chain: HotelChain) =>{
        navigate(`/customer/chains/${chain.chain_id}`);
    }

    return ( 
    <div className=" inset-0 bg-opacity-50 min-h-screen bg-white flex-col justify-center items-center z-50">
        <h1 className=" mb-5 text-2xl font-bold text-boba-blue-green">
                    Hotel Chain Selection
        </h1>
            {/* Inner container for the list */}
            <div className="bg-boba-deep-teal p-4 rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
                
                {chains ? (
                    <div className="flex flex-col gap-4 items-center">
                        {chains.map((chain) => (
                            <ChainBlock
                                key={chain.chain_id}
                                chain={chain}
                                onSelect={handleSelect}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Loading hotel chains...</p>
                )}
            </div>
        </div>
    );
}

interface ChainBlockProps {
    chain: HotelChain;
    onSelect: (chain:HotelChain) => void;
}

const ChainBlock: React.FC<ChainBlockProps> = ({chain, onSelect}) =>{
    return (
      <div className="w-full max-w-md border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
            <h2 className="mb-3 text-xl font-semibold text-boba-teal">
                {chain.chain_name}
            </h2>
            <p className="">
                <strong>Street:</strong> {chain.street || "N/A"}
            </p>
            <p className="">
                <strong>City:</strong> {chain.city || "N/A"}
            </p>
            <p className="">
                <strong>Zip Code:</strong> {chain.zip_code || "N/A"}
            </p>
            <p className="">
                <strong>Country:</strong> {chain.country || "N/A"}
            </p>
            <button
                onClick={() => onSelect(chain)}
                className="mt-3 px-4 py-2 h-12 bg-boba-blue-green text-white rounded hover:bg-boba-bg-hover transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label={`Select ${chain.chain_name}`}
            >
                Select This Chain
            </button>
        </div>
    )
}
 
export default HotelChainSelection;
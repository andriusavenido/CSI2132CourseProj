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
        navigate(`/customer/chains/${chain.chain_id}`, { state: { chainName: chain.chain_name } });
    }

    return (
        <div className="bg-white flex flex-col items-center p-6">
            <h1 className="mb-2 text-3xl font-bold text-boba-silver">
                Hotel Chain Selection
            </h1>
            <p className="mb-6 text-lg text-boba-mid-teal">Choose a chain to browse hotels</p>

            <div className="w-full max-w-6xl bg-boba-bg p-6 rounded-lg">
                {chains ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {chains.map((chain) => (
                            <ChainBlock
                                key={chain.chain_id}
                                chain={chain}
                                onSelect={handleSelect}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-boba-silver text-lg">Loading hotel chains...</p>
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
        <div className="bg-boba-deep-teal border border-boba-slate rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-3">
                <h2 className="text-xl font-semibold text-boba-silver mb-2">
                    {chain.chain_name}
                </h2>
            </div>

            <div className="space-y-1 text-sm text-boba-silver">
                <p>
                    <strong>Street:</strong> {chain.street || "N/A"}
                </p>
                <p>
                    <strong>City:</strong> {chain.city || "N/A"}
                </p>
                <p>
                    <strong>Zip Code:</strong> {chain.zip_code || "N/A"}
                </p>
                <p>
                    <strong>Country:</strong> {chain.country || "N/A"}
                </p>
            </div>

            <button
                onClick={() => onSelect(chain)}
                className="mt-4 w-full px-4 py-2 bg-boba-blue-green text-white rounded hover:bg-boba-blue-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-boba-teal"
                aria-label={`Select ${chain.chain_name}`}
            >
                Select This Chain
            </button>
        </div>
    );
}
 
export default HotelChainSelection;
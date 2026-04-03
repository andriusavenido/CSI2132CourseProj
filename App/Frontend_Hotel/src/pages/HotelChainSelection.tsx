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
        navigate(`/chains/${chain.chain_id}`);
    }

    return ( 
    <>
    
    </> 
    );
}
 
export default HotelChainSelection;
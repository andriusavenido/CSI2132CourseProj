import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import { getHotelChains, type HotelChain } from "../api/hotels";
import logo from "../assets/logo.svg";


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
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "var(--sans)" }}>
            <header style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2rem",
                height: "64px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
                <button
                    onClick={() => navigate("/")}
                    style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                    <img src={logo} alt="Serene" style={{ width: "36px", height: "36px" }} />
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--boba-teal)", letterSpacing: "0.04em" }}>
                        Serene
                    </span>
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <button
                        onClick={() => navigate("/customer/profile")}
                        style={{
                            padding: "0.5rem 1.1rem",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            backgroundColor: "rgba(46,107,90,0.1)",
                            color: "var(--boba-teal)",
                            transition: "background 0.15s, color 0.15s",
                        }}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => navigate("/customer/chains")}
                        style={{
                            padding: "0.5rem 1.1rem",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 400,
                            fontSize: "0.9rem",
                            backgroundColor: "transparent",
                            color: "#6b7280",
                            transition: "background 0.15s, color 0.15s",
                        }}
                    >
                        Book a Hotel
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center p-6">
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
            </main>
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
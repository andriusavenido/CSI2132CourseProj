import React, {createContext, useContext, useEffect, useState} from "react";
import { getCustomerById, type Customer } from "../api/customer";

/*
Using a context and provider to hold all the customer data, may be useful later/may be overkill - writing it out for practice
*/

interface CustomerContextType {
    customer: Customer | null;
    customerId: number | null;
    login: (id: number) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const CustomerContext = createContext<CustomerContextType | undefined> (undefined);

//provider
export const CustomerProvider: React.FC<{children:React.ReactNode}> = ({children,}) => {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    //restore session on load? is this even needed for the project lmao
    useEffect(()=>{
        const storedId = sessionStorage.getItem("customerId");
        if (storedId) {
            login(Number(storedId)) //return to number from sesion storage
        }
    },[])

    const login = async (id: number) =>{
        try{
            setLoading(true);
            const data = await getCustomerById(id); //login customer through api

            setCustomer(data.customer);
            setCustomerId(id);

            //may be some value to also storing customer object in session
            sessionStorage.setItem("customerId", id.toString())
        }catch (err){
            console.error("login failed for customer", err);
            logout();
        } finally{
            setLoading(false);
        }
    }

    const logout = () =>{
        setCustomer(null);
        setCustomerId(null);
        sessionStorage.removeItem("customerId");
    }

    return (
        <CustomerContext.Provider
            value ={{customer, customerId, login, logout, loading}}
        >
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => {
    const context = useContext(CustomerContext);
    if (!context){
        throw new Error("trying to use without provider");
    }
    return context;
};
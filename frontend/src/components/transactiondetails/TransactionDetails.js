import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import api from '../../axiosConfig/axios';
export function TransactionDetails() {
    const { checkoutId } = useParams();
    const [transactionData, setTransactionData] = useState([]);
    useEffect(() => {
        async function getTransactionData() {
            try {
                const response = await api.get(`/consultarcheckout/${checkoutId}`)
                setTransactionData(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getTransactionData();
    }, [checkoutId])
    console.log(transactionData);
    return (
        <div>
            <Header />
            {checkoutId}
            <Footer />
        </div>
    )
}
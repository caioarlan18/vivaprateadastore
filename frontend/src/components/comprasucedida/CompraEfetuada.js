import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from './CompraEfetuada.module.css';
import { useEffect } from "react";
import api from '../../axiosConfig/axios';
import { ToastContainer, toast } from "react-toastify";

export function CompraEfetuada() {


    useEffect(() => {
        async function newTransaction() {
            const userId = localStorage.getItem("id");
            const transactionId = localStorage.getItem("transactionId");
            const transactionName = localStorage.getItem("transactionName");
            const transactionPrice = localStorage.getItem("total");
            const transactionDate = localStorage.getItem("transactionDate");


            try {
                const newTransaction = await api.post("/newtransaction", {
                    userId,
                    transactionId,
                    transactionName,
                    transactionDate,
                    transactionPrice,

                })
            } catch (error) {
                toast.error("Algo deu errado, a compra não foi registrada no sistema, favor entre em contato com o suporte ")
                console.log(error);
            }
        }
        newTransaction();

    })
    return (
        <div>
            <ToastContainer />
            <Header />
            <h1>Compra efetuada com sucesso</h1>
            <Footer />
        </div>
    )
}
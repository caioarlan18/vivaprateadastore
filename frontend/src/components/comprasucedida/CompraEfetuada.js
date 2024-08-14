import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from './CompraEfetuada.module.css';
import { useEffect } from "react";
import api from '../../axiosConfig/axios';
import checkIcon from '../images/flat-icon-check.png';
export function CompraEfetuada() {


    useEffect(() => {
        async function NewTransaction() {
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
                console.log(newTransaction.data.msg);
            } catch (error) {
                console.log(error.response.data.msg)

            }
        }
        NewTransaction();

    }, []);
    return (
        <div className={styles.comprasucedida}>
            <Header />
            <div className={styles.comprasucedida1}>
                <img src={checkIcon} alt={"icone-de-check"} />
                <h1>Compra efetuada com sucesso</h1>
            </div>

            <Footer />
        </div>
    )
}
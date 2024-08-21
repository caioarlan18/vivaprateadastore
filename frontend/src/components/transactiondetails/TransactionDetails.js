import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import api from '../../axiosConfig/axios';
import styles from './TransactionDetails.module.css';
export function TransactionDetails() {
    const { checkoutId } = useParams();
    const [orderData, setOrderData] = useState([]);
    const [frete, setFrete] = useState()
    useEffect(() => {
        async function getTransactionData() {

            try {
                const response = await api.get(`/consultarcheckout/${checkoutId}`)
                setFrete(response.data.shipping.amount / 100)
                const responseOrder = await api.get(`/consultartransacao/${response.data.orders[0].id}`)
                setOrderData(responseOrder.data);
                console.log(response.data)
            } catch (error) {
                console.log(error.response.data);
            }
        }
        getTransactionData();
    }, [checkoutId]);
    console.log(orderData)





    return (
        <>
            <Header />
            <div className={styles.details}>
                <div className={styles.details1}>
                    <h1>Detalhes do pedido</h1>
                </div>
                <div className={styles.details1}>
                    <h2>Informações da compra</h2>
                    {orderData.items && orderData.items.map((it, index) => (
                        <div key={index} className={styles.pr}>
                            <p> nome: {it.name}</p>
                            <p>tipo: {it.reference_id}</p>
                            <p>preço: R${it.unit_amount / 100}</p>
                        </div>
                    ))}
                    <h3>frete: R${frete}</h3>
                    <h3>total: R${orderData.charges && orderData.charges[0].amount.summary.total / 100}</h3>
                    <h3>forma de pagamento: {orderData.charges && orderData.charges[0].payment_method.type}</h3>
                    <h3>situação: pago</h3>
                </div>
                <div className={styles.details1}>
                    <h2>Suas Informações</h2>
                    <p>nome: {orderData.customer && orderData.customer.name}</p>
                    <p>email: {orderData.customer && orderData.customer.email}</p>
                    <p>celular: {orderData.customer && orderData.customer.phones[0].area + orderData.customer.phones[0].number}</p>
                    <p>cpf: {orderData.customer && orderData.customer.tax_id}</p>
                </div>
                <div className={styles.details1}>
                    <h2>Endereço</h2>
                    <p>cidade: {orderData.shipping && orderData.shipping.address.city}</p>
                    <p>bairro: {orderData.shipping && orderData.shipping.address.locality}</p>
                    <p>rua: {orderData.shipping && orderData.shipping.address.street}</p>
                    <p>número: {orderData.shipping && orderData.shipping.address.number}</p>
                    <p>complemento: {orderData.shipping && orderData.shipping.address.complement}</p>
                </div>
            </div>

            <Footer />
        </>
    )
}
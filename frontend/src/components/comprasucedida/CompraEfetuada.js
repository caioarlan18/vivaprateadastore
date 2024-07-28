import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from './CompraEfetuada.module.css';
import { useEffect } from "react";
export function CompraEfetuada() {
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify([]))
    }, [])
    return (
        <div>
            <Header />
            <h1>Compra efetuada com sucesso</h1>
            <Footer />
        </div>
    )
}
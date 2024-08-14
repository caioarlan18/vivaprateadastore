import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from './Painel.module.css';
import { SubMenu } from "./subMenu/SubMenu";
import { useState } from "react";
import { AddProduct } from "./addProduct/AddProduct";
import DeleteProductCard from "./DeleteProductCard/DeleteProductCard";
import { useNavigate } from "react-router-dom";
import UpdateProductCard from "./updateproduct/UpdateProductCard";
import { LastPay } from "./lastpay/LastPay";
import { SeePay } from "./seepay/SeePay";
export function Painel() {
    const navigate = useNavigate();
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const [currentMenuItem, setCurrentMenuItem] = useState('info');

    const handleMenuItemClick = (menuItem) => {
        setCurrentMenuItem(menuItem);
    };
    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("userdata");
        navigate("/");
    }
    return (
        <div>
            <Header />
            <SubMenu onMenuItemClick={handleMenuItemClick} />
            {
                currentMenuItem === "info" &&
                <div className={styles.info}>
                    <h1><span>Nome:</span> {userdata.name}</h1>
                    <h1><span>Email:</span> {userdata.email}</h1>
                    <button onClick={logout}>Sair da conta</button>
                </div>
            }
            {
                currentMenuItem === 'lastpay' &&
                <LastPay />
            }
            {
                currentMenuItem === 'seepay' &&
                <SeePay />
            }
            {
                currentMenuItem === 'addproduct' &&
                <AddProduct />
            }
            {
                currentMenuItem === 'updateproduct' &&
                <UpdateProductCard />
            }
            {
                currentMenuItem === 'deleteproduct' &&
                <DeleteProductCard />
            }
            <Footer />
        </div>
    )
}
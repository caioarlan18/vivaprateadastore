import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import styles from './Painel.module.css';
import { SubMenu } from "./subMenu/SubMenu";
import { useState } from "react";
import { AddProduct } from "./addProduct/AddProduct";
import ProductCard from "./ProductCard.js/ProductCard";
export function Painel() {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const [currentMenuItem, setCurrentMenuItem] = useState('info');

    const handleMenuItemClick = (menuItem) => {
        setCurrentMenuItem(menuItem);
    };
    return (
        <div>
            <Header />
            <SubMenu onMenuItemClick={handleMenuItemClick} />
            {
                currentMenuItem == "info" &&
                <div className={styles.info}>
                    <h1><span>Nome:</span> {userdata.name}</h1>
                    <h1><span>Email:</span> {userdata.email}</h1>

                </div>
            }

            {
                currentMenuItem == 'addproduct' &&
                <AddProduct />
            }

            {
                currentMenuItem == 'deleteproduct' &&
                <ProductCard />
            }
            <Footer />
        </div>
    )
}
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useState, useEffect } from "react";
import styles from './FavoriteProducts.module.css';
export function FavoriteProducts() {
    const [products, setProducts] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    useEffect(() => {
        function fetchFavorites() {
            if (!id || !token || !userdata) {
                setIsAuth(false);
            } else {
                setProducts(userdata.favoriteProduct)
                setIsAuth(true);
            }
        }
        fetchFavorites();
    }, [])
    return (
        <div>
            <Header />
            {!isAuth && <div>Precisa estar logado</div>}

            {isAuth &&

                products.map((favorite, index) => (
                    <div key={index}>
                        {favorite._id}
                    </div>
                ))

            }
            <Footer />
        </div>
    )
}
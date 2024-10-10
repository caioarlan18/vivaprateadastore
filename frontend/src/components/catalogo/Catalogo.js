import styles from './Catalogo.module.css';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { useEffect, useState } from 'react';
import api from '../../axiosConfig/axios';
import { Navigation } from '../navigation/Navigation';
import { CardProduct } from '../cardproduct/CardProduct';


export function Catalogo() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        async function loadProduct() {
            const response = await api.get("/product/all");
            setProducts(response.data);
        }
        loadProduct();
    }, [])
    return (
        <div>
            <Header />
            <Navigation name={`${products.length} produtos`} />
            <div className={styles.card}>
                {products.map((objfilt, index) => (
                    <CardProduct
                        title={objfilt.title}
                        imageUrl={objfilt.imageUrl}
                        productId={objfilt._id}
                        price={objfilt.price}
                        category={objfilt.category}
                        key={index} />

                ))}
            </div>
            <Footer />
        </div>
    )
}
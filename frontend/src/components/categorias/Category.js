import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { CardProduct } from '../cardproduct/CardProduct';
import styles from './Category.module.css';
import api from '../../axiosConfig/axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigation } from '../navigation/Navigation';

export function Category() {
    const { name } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        async function loadProduct() {
            const response = await api.get("/product/all");
            setProduct(response.data);
        }
        loadProduct();
    }, [name])
    return (
        <div>
            <Header />
            <Navigation name={name} />
            <div className={styles.card}>
                {product.filter(obj => obj.category === name).map((objfilt, index) => (
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
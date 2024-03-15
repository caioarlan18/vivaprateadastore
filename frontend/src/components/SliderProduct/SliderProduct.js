import styles from './SliderProduct.module.css';
import api from '../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
const { Meta } = Card;

export function SliderProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get("/product/all");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);
    function comprar(id) {
        navigate(`/productpage/${id}`);
    }
    return (
        <div className={styles.sliderProduct}>
            <h1 className={styles.sliderProductTitle}>- Peças disponíveis</h1>
            <Swiper spaceBetween={30} slidesPerView={2} className={styles.card}
                breakpoints={{
                    992: {
                        slidesPerView: 4
                    }
                }}
            >
                {products.map((produto, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            hoverable
                            className={styles.card1}
                            cover={<img src={`http://localhost:8080/${produto.src}`} alt="imagem do produto" />}
                            actions={[
                                <ShoppingCartOutlined />,
                                <HeartOutlined />
                            ]}
                        >
                            <Meta
                                title={<h1>{produto.title}</h1>}
                                description={<h2>{produto.category}</h2>}
                            />
                            <p>R${produto.price}</p>
                            <button onClick={() => comprar(produto._id)}>Comprar</button>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

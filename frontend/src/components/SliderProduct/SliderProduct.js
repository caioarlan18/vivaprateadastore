import styles from './SliderProduct.module.css';
import api from '../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
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
        scroll.scrollToTop({ duration: 0 });

    }
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const [favorite, setFavorite] = useState([]);
    async function addFavorite(id) {
        if (!userId || !token) {
            toast.error("Para adicionar um produto aos favoritos é preciso estar logado");
            return;
        }
        try {
            const response = await api.get(`/product/readfavorites/${userId}`);
            const favorites = response.data;

            let favoriteExists = false;

            favorites.forEach(async (favorito) => {
                if (id === favorito._id) {
                    favoriteExists = true;
                    try {
                        const response = await api.post(`/product/removefavorite/${id}`, { userId });
                    } catch (err) {
                        console.error(err.response.data.msg);
                    }
                }
            });
            if (!favoriteExists) {
                try {
                    const response = await api.post(`/product/addfavorite/${id}`, { userId });
                } catch (err) {
                    console.error(err.response.data.msg);
                }
            }
        } catch (err) {
            console.error(err.response.data.msg);
        }
    }
    useEffect(() => {
        async function fetchFavorites() {
            if (userId || token) {
                const response = await api.get(`/product/readfavorites/${userId}`);
                setFavorite(response.data);
            }

        }
        fetchFavorites();
    }, [addFavorite])


    const [cartItems, setCartItems] = useState([]);

    async function addCart(id) {
        try {
            const response = await api.get(`/product/read/${id}`);
            if (!response.data.variations) {
                const updatedCartItems = [...cartItems, response.data];
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                toast.success("Adicionado ao carrinho com sucesso")

            } else {
                toast.error("Esse produto possui variações, entre no produto e escolha, para depois adicionar ao carrinho")
            }

        } catch (err) {
            toast.error(err.response.data.msg)
        }
    }
    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);



    return (
        <div className={styles.sliderProduct}>
            <ToastContainer />
            <div className={styles.sliderProductTitle}>
                <h1>nossas peças</h1>
                <p>confira todas nossas peças disponíveis</p>
            </div>
            <Swiper spaceBetween={30} slidesPerView={2} className={styles.card}
                breakpoints={{
                    992: {
                        slidesPerView: 5
                    }
                }}
            >
                {products.map((produto, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            className={styles.card1}
                            cover={<img src={produto.imageUrl} alt="imagem do produto" />}
                            actions={[
                                <ShoppingCartOutlined onClick={() => addCart(produto._id)} style={{ fontSize: '18px' }} />,
                                favorite.some(favorite => favorite._id === produto._id) ?
                                    <HeartFilled onClick={() => addFavorite(produto._id)} style={{ color: '#a4003d', fontSize: '18px' }} /> :
                                    <HeartOutlined onClick={() => addFavorite(produto._id)} style={{ fontSize: '18px' }} />
                            ]}
                        >
                            <Meta
                                title={<h1>{produto.title}</h1>}

                            />
                            <p>R${produto.price}</p>
                            <button onClick={() => comprar(produto._id)}>Comprar</button>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div >
    );
}

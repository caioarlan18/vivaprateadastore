import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { useState, useEffect } from "react";
import styles from './FavoriteProducts.module.css';
import api from '../../axiosConfig/axios';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import baseurl from '../baseurl/BaseUrl';
import { ShoppingCartOutlined, HeartFilled } from '@ant-design/icons';
import { ToastContainer, toast } from "react-toastify";
import { Navigation } from "../navigation/Navigation";
const { Meta } = Card;

export function FavoriteProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function fetchFavorites() {
            if (!userId || !token) {
                setIsAuth(false);
            } else {
                const response = await api.get(`/product/renderfavorite/${userId}`);
                setProducts(response.data);
                setIsAuth(true);
            }
        }
        fetchFavorites();
    }, [removeFavorite])
    function comprar(id) {
        navigate(`/productpage/${id}`);
    }


    async function removeFavorite(id) {
        try {
            const response = await api.post(`/product/removefavorite/${id}`, { userId });
        } catch (err) {
            console.error(err.response.data.msg);
        }

    }

    const [cartItems, setCartItems] = useState([]);

    async function addCart(id) {
        try {
            const response = await api.get(`/product/read/${id}`);
            if (!response.data.variations) {
                const updatedCartItems = [...cartItems, response.data];
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                toast.success("Adicionado ao carrinho com sucesso")
            } else {
                toast.error("Esse produto possui variações, entre no produto e escolha para depois adicionar ao carrinho")
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
        <div>
            <Header />
            <Navigation name={"Lista de favoritos"} />
            {!isAuth &&
                <div className={styles.unlog}>
                    <h1>Você precisa estar logado para acessar essa página</h1>
                    <Link to={'/login'}>Fazer Login</Link>
                </div>
            }

            {isAuth ? (
                products.length ? (
                    <div className={styles.card}>

                        <ToastContainer />
                        {products.map((produto, index) => (
                            <Card
                                className={styles.card1}
                                cover={<img alt="example" src={`${baseurl}/${produto.src}`} />}
                                actions={[
                                    <ShoppingCartOutlined onClick={() => addCart(produto._id)} style={{ fontSize: '18px' }} />,
                                    <HeartFilled onClick={() => removeFavorite(produto._id)} style={{ color: '#a4003d', fontSize: '18px' }} />
                                ]}
                                key={index}
                            >
                                <Meta
                                    title={<h1>{produto.title}</h1>}

                                />
                                <p>R${produto.price}</p>
                                <button onClick={() => comprar(produto._id)}>Comprar</button>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <h1>Sua lista de favoritos está vazia no momento, navegue pelo site para escolher seus produtos favoritos</h1>
                        <Link to={"/"}>Página Home</Link>
                    </div>
                )
            )
                : null

            }
            <Footer />
        </div>
    )
}
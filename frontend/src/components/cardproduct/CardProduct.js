import styles from './CardProduct.module.css';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { animateScroll as scroll } from "react-scroll";

const { Meta } = Card;

export function CardProduct({ imageUrl, productId, price, title, category, index }) {
    const navigate = useNavigate();


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

    return (
        <>
            <ToastContainer />
            <Card
                className={styles.card1}
                cover={<img src={imageUrl} alt="imagem do produto" />}
                actions={[
                    favorite.some(favorite => favorite._id === productId) ?
                        <HeartFilled onClick={(e) => { e.stopPropagation(); addFavorite(productId) }} style={{ color: '#a4003d', fontSize: '18px' }} /> :
                        <HeartOutlined onClick={(e) => { e.stopPropagation(); addFavorite(productId) }} style={{ fontSize: '18px' }} />
                ]}
                key={index}
                onClick={() => comprar(productId)}
            >


                <Meta
                    title={<h1>{title}</h1>}
                />
                <p>R${price}</p>

            </Card>
        </>



    )
}
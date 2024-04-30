import styles from './CardProduct.module.css';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import baseurl from '../baseurl/BaseUrl';
const { Meta } = Card;

export function CardProduct({ src, productId, price, title, category, index }) {
    const navigate = useNavigate();
    const userId = localStorage.getItem("id");

    function comprar(id) {
        navigate(`/productpage/${id}`);
    }

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

        <Card
            className={styles.card1}
            cover={<img src={`${baseurl}/${src}`} alt="imagem do produto" />}
            actions={[
                <ShoppingCartOutlined style={{ fontSize: '18px' }} />,
                favorite.some(favorite => favorite._id === productId) ?
                    <HeartFilled onClick={() => addFavorite(productId)} style={{ color: '#a4003d', fontSize: '18px' }} /> :
                    <HeartOutlined onClick={() => addFavorite(productId)} style={{ fontSize: '18px' }} />
            ]}
            key={index}
        >
            <ToastContainer />

            <Meta
                title={<h1>{title}</h1>}
                description={<h2>{category}</h2>}
            />
            <p>R${price}</p>
            <button onClick={() => comprar(productId)}>Comprar</button>
        </Card>

    )
}
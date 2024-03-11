import React from 'react';
import { Card } from 'antd';
import styles from './ProductCard.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import api from '../../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Meta } = Card;

const ProductCard = () => {
    const [userData, setUserData] = useState([]);
    async function handleDelete(id) {
        try {
            const userId = localStorage.getItem("id");
            const response = await api.post(`/product/delete/${id}`, {
                userId
            });
            toast.success(response.data.msg);

        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    useEffect(() => {
        async function allProducts() {
            const response = await api.get("/product/all");
            setUserData(response.data);
        }
        allProducts();
    }, [handleDelete])

    return (
        <div className={styles.card}>
            <ToastContainer />
            {
                userData.map((produto, index) => (
                    <Card
                        hoverable
                        className={styles.card1}
                        cover={<img alt="example" src={`http://localhost:8080/${produto.src}`} />}
                        actions={[
                            <DeleteOutlined onClick={() => handleDelete(produto._id)}

                            />
                        ]}
                        key={index}

                    >
                        <Meta
                            title={produto.title}
                            description={produto.category}
                        />
                        <p>R${produto.price}</p>
                    </Card>
                ))

            }

        </div>

    );
};

export default ProductCard;

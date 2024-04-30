import React from 'react';
import { Card } from 'antd';
import styles from './DeleteProductCard.module.css';
import { DeleteOutlined } from '@ant-design/icons';
import api from '../../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseurl from '../../baseurl/BaseUrl';
const { Meta } = Card;

const DeleteProductCard = () => {
    const [products, setProducts] = useState([])

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
            setProducts(response.data);
        }
        allProducts();
    }, [handleDelete])

    return (
        <div className={styles.card}>
            <ToastContainer />
            {
                products.map((produto, index) => (
                    <Card
                        className={styles.card1}
                        cover={<img alt="example" src={`${baseurl}/${produto.src}`} />}
                        actions={[
                            <DeleteOutlined onClick={() => handleDelete(produto._id)}
                                style={{ fontSize: '18px' }}
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

export default DeleteProductCard;

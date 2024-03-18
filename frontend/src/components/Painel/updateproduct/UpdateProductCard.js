import React from 'react';
import { Card } from 'antd';
import styles from '../DeleteProductCard/DeleteProductCard.module.css';
import { ReloadOutlined } from '@ant-design/icons';
import api from '../../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card;

const UpdateProductCard = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    async function goUpdate(id) {
        navigate(`/update/${id}`)
    }

    useEffect(() => {
        async function allProducts() {
            const response = await api.get("/product/all");
            setProducts(response.data);
        }
        allProducts();
    }, [])

    return (
        <div className={styles.card}>
            <ToastContainer />
            {
                products.map((produto, index) => (
                    <Card
                        hoverable
                        className={styles.card1}
                        cover={<img alt="example" src={`http://localhost:8080/${produto.src}`} />}
                        actions={[
                            <ReloadOutlined onClick={() => goUpdate(produto._id)}

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

export default UpdateProductCard;

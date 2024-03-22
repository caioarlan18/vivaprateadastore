import { useEffect, useRef, useState } from 'react';
import styles from '../addProduct/AddProduct.module.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../axiosConfig/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';

export function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [variations, setVariations] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/product/read/${id}`);
                const { src, title, price, description, category, variations } = response.data;
                setProduct(response.data);
                setImageSrc(src);
                setTitle(title);
                setPrice(price);
                setDescription(description);
                setCategory(category);
                setVariations(variations);
            } catch (err) {
                toast.error(err.response.data.msg);
            }
        }
        fetchProduct();
    }, [id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageSrc('');
        fileInputRef.current.value = '';
    };

    async function handleSubmit() {
        const userId = localStorage.getItem("id");
        const productId = id;
        const data = new FormData();
        data.append('userId', userId);
        data.append('title', title);
        data.append('price', price);
        data.append('description', description);
        data.append('category', category);
        data.append('variations', variations);
        data.append('productId', productId)
        if (fileInputRef.current.files[0]) {
            data.append('file', fileInputRef.current.files[0]);
        }

        try {
            const response = await api.put("/product/update", data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate("/painel");
            toast.success(response.data.msg);
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    function voltar() {
        navigate("/painel");
    }

    if (!product) {
        return null;
    }

    return (
        <>
            <Header />
            <div className={styles.add}>
                <ToastContainer />
                <button onClick={voltar}>Voltar</button>
                <div className={styles.add1}>
                    {imageSrc && (
                        <div>
                            <img src={imageSrc} alt="Imagem atual do produto" />
                            <button onClick={handleRemoveImage} style={{ backgroundColor: "red" }}>Remover Imagem</button>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                </div>
                <div className={styles.add1}>
                    <label>Título do produto</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className={styles.add1}>
                    <label>Preço do produto</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className={styles.add1}>
                    <label>Descrição do produto</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className={styles.add1}>
                    <label>Categoria do produto</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className={styles.add1}>
                    <label>Variações (opcional)</label>
                    <input type="text" value={variations} onChange={(e) => setVariations(e.target.value)} />
                    <button onClick={handleSubmit}>Atualizar Produto</button>
                </div>
            </div>
            <Footer />
        </>
    )
}

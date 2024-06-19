import { useEffect, useRef, useState } from 'react';
import styles from '../addProduct/AddProduct.module.css';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../axiosConfig/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../Header/Header';
import { Footer } from '../../Footer/Footer';
import categories from '../../categoryArray/CategoryArr';
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebaseConfig/firebase";

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
    const [imageUrl, setImageUrl] = useState("");
    const [newFile, setNewFile] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await api.get(`/product/read/${id}`);
                const { imageUrl, title, price, description, category, variations } = response.data;
                setProduct(response.data);
                setTitle(title);
                setPrice(price);
                setDescription(description);
                setCategory(category);
                setVariations(variations);
                setImageUrl(imageUrl);
                setImageSrc(imageUrl);
            } catch (err) {
                toast.error(err.response.data.msg);
            }
        }
        fetchProduct();
    }, [id]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageSrc('');
        setNewFile(null);
        fileInputRef.current.value = '';
    };

    const extractFilePathFromUrl = (url) => {
        const pathStartIndex = url.indexOf("/o/") + 3;
        const pathEndIndex = url.indexOf("?");
        const filePath = url.substring(pathStartIndex, pathEndIndex).replace(/%2F/g, "/");
        return decodeURIComponent(filePath);
    };

    const deleteImageByUrl = async (link) => {
        try {
            const filePath = extractFilePathFromUrl(link);
            const fileRef = ref(storage, filePath);
            await deleteObject(fileRef);
        } catch (error) {
            toast.error("Erro ao excluir imagem: " + error.message);
        }
    };

    const uploadImage = async (file, filePath) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, filePath);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    toast.error("Erro ao fazer upload da imagem: " + error.message);
                    reject(error);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    toast.success("Imagem enviada com sucesso!");
                    resolve(url);
                }
            );
        });
    };

    async function handleSubmit() {
        const userId = localStorage.getItem("id");
        const productId = id;

        try {
            let updatedImageUrl = imageUrl;
            if (newFile) {
                await deleteImageByUrl(imageUrl);
                const filePath = `images/${newFile.name}`;
                updatedImageUrl = await uploadImage(newFile, filePath);
            }

            const response = await api.put("/product/update", {
                title,
                price,
                description,
                category,
                variations,
                imageUrl: updatedImageUrl,
                productId,
                userId
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
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat, index) => (
                            <option value={cat} key={index}>{cat}</option>
                        ))}
                    </select>
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

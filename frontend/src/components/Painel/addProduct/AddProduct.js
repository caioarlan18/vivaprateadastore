import styles from "./AddProduct.module.css";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../axiosConfig/axios";
import { animateScroll as scroll } from "react-scroll";
import categories from '../../categoryArray/CategoryArr';

export function AddProduct() {

    const [imageSrc, setImageSrc] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [variations, setVariations] = useState("");
    const fileInputRef = useRef(null);
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
        setImageSrc(null);
        fileInputRef.current.value = "";
    };

    function handleTitle(e) {
        setTitle(e.target.value);
    }
    function handlePrice(e) {
        setPrice(e.target.value);
    }
    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleCategory(e) {
        setCategory(e.target.value);
    }
    function handleVariations(e) {
        setVariations(e.target.value);
    }

    async function handleSubmit() {
        const userId = localStorage.getItem("id");
        const data = new FormData();
        data.append("title", title);
        data.append("price", price);
        data.append("description", description);
        data.append("category", category);
        data.append("variations", variations);
        data.append("userId", userId);
        data.append("file", fileInputRef.current.files[0]);

        try {
            const response = await api.post("/product/create", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setTitle("");
            setPrice("");
            setDescription("");
            setCategory("");
            setVariations("");
            setImageSrc("");
            fileInputRef.current.value = "";
            toast.success(response.data.msg);
            scroll.scrollToTop({ duration: 0 });
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    }

    return (
        <div className={styles.add}>
            <ToastContainer />
            <div className={styles.add1}>
                {imageSrc && (
                    <div>
                        <img src={imageSrc} alt="Imagem selecionada" />
                        <button
                            onClick={handleRemoveImage}
                            style={{ backgroundColor: "red" }}
                        >
                            Remover
                        </button>
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
                <input
                    placeholder="Ex: Corrente1"
                    type="text"
                    value={title}
                    onChange={handleTitle}
                />
            </div>
            <div className={styles.add1}>
                <label>Preço do produto</label>
                <input
                    placeholder="Ex: 99,99"
                    type="text"
                    value={price}
                    onChange={handlePrice}
                />
            </div>
            <div className={styles.add1}>
                <label>Descrição do produto</label>
                <input
                    placeholder="Ex: Descrição completa do produto"
                    type="text"
                    value={description}
                    onChange={handleDescription}
                />
            </div>
            <div className={styles.add1}>
                <label>Categoria do produto</label>
                <select value={category} onChange={handleCategory}>
                    {categories.map((cat, index) => (
                        <option value={cat} key={index}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className={styles.add1}>
                <label>Variações (opcional)</label>
                <input
                    placeholder="Ex: P, M, G"
                    type="text"
                    value={variations}
                    onChange={handleVariations}
                />
                <button onClick={handleSubmit}>Criar</button>
            </div>
        </div>
    );
}

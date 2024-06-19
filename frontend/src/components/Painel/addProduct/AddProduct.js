import styles from "./AddProduct.module.css";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../axiosConfig/axios";
import { animateScroll as scroll } from "react-scroll";
import categories from '../../categoryArray/CategoryArr';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebaseConfig/firebase";

export function AddProduct() {
    const [imageSrc, setImageSrc] = useState(null);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [variations, setVariations] = useState("");
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageSrc(null);
        setFileName(null);
        fileInputRef.current.value = "";
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async () => {
        const userId = localStorage.getItem("id");
        if (!fileName) {
            toast.error("Por favor, selecione uma imagem.");
            return;
        }

        try {
            const storageRef = ref(storage, `images/${fileName.name}`);
            const uploadTask = uploadBytesResumable(storageRef, fileName);

            uploadTask.on(
                "state_changed",
                null,
                (error) => {
                    toast.error("Erro ao fazer upload da imagem: " + error.message);
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);

                    const response = await api.post("/product/create", {
                        title,
                        price,
                        description,
                        category,
                        variations,
                        userId,
                        imageUrl: url,
                    });

                    setTitle("");
                    setPrice("");
                    setDescription("");
                    setCategory(categories[0]);
                    setVariations("");
                    setImageSrc(null);
                    setFileName(null);
                    fileInputRef.current.value = "";
                    toast.success(response.data.msg);
                    scroll.scrollToTop({ duration: 0 });
                }
            );
        } catch (err) {
            toast.error(err.response.data.msg);
        }
    };

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
                    onChange={handleInputChange(setTitle)}
                />
            </div>
            <div className={styles.add1}>
                <label>Preço do produto</label>
                <input
                    placeholder="Ex: 99,99"
                    type="text"
                    value={price}
                    onChange={handleInputChange(setPrice)}
                />
            </div>
            <div className={styles.add1}>
                <label>Descrição do produto</label>
                <input
                    placeholder="Ex: Descrição completa do produto"
                    type="text"
                    value={description}
                    onChange={handleInputChange(setDescription)}
                />
            </div>
            <div className={styles.add1}>
                <label>Categoria do produto</label>
                <select value={category} onChange={handleInputChange(setCategory)}>
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
                    onChange={handleInputChange(setVariations)}
                />
            </div>
            <div className={styles.add1}>
                <button onClick={handleSubmit}>Criar</button>
            </div>
        </div>
    );
}

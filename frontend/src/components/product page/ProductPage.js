import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import api from '../../axiosConfig/axios';
import styles from './ProductPage.module.css';
import { FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import Bandeira1 from '../images/bandeira2.webp';
import Bandeira2 from '../images/bandeiras cartao1.webp';
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer, toast } from "react-toastify";
import baseurl from '../baseurl/BaseUrl';
export function ProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const [varArray, setVarArray] = useState([])
    useEffect(() => {
        async function fetchProduct() {
            const response = await api.get(`/product/read/${id}`);
            setProduct(response.data);
            const variationArray = response.data.variations ? response.data.variations.replace(/\s/g, '').split(",") : [];
            setVarArray(variationArray);
            setSelectVar(variationArray.length > 0 ? variationArray[0] : '');

        }
        fetchProduct();
    }, [id])


    const [selectVar, setSelectVar] = useState();
    function handleVariation(e) {
        setSelectVar(e.target.value);
    }
    const [cartItems, setCartItems] = useState([]);

    function comprar() {
        product.variations = selectVar
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        navigate('/carrinho')
        scroll.scrollToTop({ duration: 0 });

    }
    function addCart() {
        product.variations = selectVar
        const updatedCartItems = [...cartItems, product];
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        toast.success("Adicionado no carrinho com sucesso");
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
            <ToastContainer />
            <div className={styles.compra}>
                <div className={styles.imagem_principal}>
                    <img src={`${baseurl}/${product.src}`} alt="imagem principal do produto" />
                </div>

                <div className={styles.compra2}>
                    <h1>{product.title}</h1>
                    <a href="#moreinfo">Mais informações</a>

                </div>
                <div className={styles.compra3}>
                    <h2>R${product.price}</h2>
                </div>
                {varArray.length > 0 &&
                    <div className={styles.compra4}>

                        <select value={selectVar} onChange={handleVariation}>
                            {varArray.map((option, index) => (
                                <option key={index} value={option} >{option}</option>
                            ))}
                        </select>


                    </div>
                }

                <div className={styles.compra5}>
                    <button onClick={comprar} >COMPRAR</button>
                    <button className={styles.compra51} onClick={addCart}>ADICIONAR AO CARRINHO</button>
                </div>
                <div className={styles.compra6}>

                    <div className={styles.compra6b}>
                        <span><FaShieldAlt />Garantia de 30 dias direto em nossa loja</span>
                    </div>
                    <div className={styles.compra6b}>
                        <span><FaExchangeAlt />7 dias para trocas e devoluções</span>
                    </div>
                    <div className={styles.compra7}>
                        <img src={Bandeira1} alt="formas de pagamento" />
                        <img src={Bandeira2} alt="formas de pagamento" />
                    </div>
                </div>
                <div className={styles.compra8} id="moreinfo">
                    <h1>Informações do produto</h1>
                    <h2>Descrição</h2>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>



            {/* desktop */}

            <div className={styles.compra_desktop}>
                <div className={styles.desktop}>
                    <div className={styles.desktop1}>
                        <div className={styles.imagem_principal}>

                            <img src={`${baseurl}/${product.src}`} alt="imagem principal do produto" />
                        </div>

                    </div>
                    <div className={styles.desktop1}>
                        <div className={styles.compra2}>
                            <h1>{product.title}</h1>
                            <a href="#moreinfo2">Mais informações</a>

                        </div>
                        <div className={styles.compra3}>
                            <h2>R${product.price}</h2>
                        </div>

                        {varArray.length > 0 &&
                            <div className={styles.compra4}>

                                <select value={selectVar} onChange={handleVariation}>
                                    {varArray.map((option, index) => (
                                        <option key={index} value={option} >{option}</option>
                                    ))}
                                </select>


                            </div>
                        }

                        <div className={styles.compra5}>
                            <button onClick={comprar}>COMPRAR</button>
                            <button className={styles.compra51} onClick={addCart}>ADICIONAR AO CARRINHO</button>
                        </div>
                        <div className={styles.compra6}>

                            <div className={styles.compra6b}>
                                <span><FaShieldAlt />Garantia de 30 dias direto em nossa loja</span>
                            </div>
                            <div className={styles.compra6b}>
                                <span><FaExchangeAlt />7 dias para trocas e devoluções</span>
                            </div>
                            <div className={styles.compra7}>
                                <img src={Bandeira1} alt="formas de pagamento" />
                                <img src={Bandeira2} alt="formas de pagamento" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.compra8} id="moreinfo2">
                    <h1>Informações do produto</h1>
                    <h2>Descrição</h2>
                    <p>
                        {product.description}
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

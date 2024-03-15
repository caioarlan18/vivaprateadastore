import { useParams } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import api from '../../axiosConfig/axios';
import styles from './ProductPage.module.css';
import { Link } from "react-router-dom";
import { FaExchangeAlt, FaShieldAlt } from "react-icons/fa";
import Bandeira1 from '../images/bandeira2.webp';
import Bandeira2 from '../images/bandeiras cartao1.webp';
export function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    useEffect(() => {
        async function fetchProduct() {
            const response = await api.get(`/product/read/${id}`);
            setProduct(response.data);
        }
        fetchProduct();
    }, [])
    return (
        <div>
            <Header />
            <div className={styles.compra}>
                <div className={styles.imagem_principal}>
                    <img src={`http://localhost:8080/${product.src}`} alt="imagem principal do produto" />
                </div>

                <div className={styles.compra2}>
                    {/* prop de titulo */}
                    <h1>{product.title}</h1>
                    <a href="#moreinfo2">Mais informações</a>

                </div>
                <div className={styles.compra3}>
                    {/* prop de custoR e custoP*/}
                    <h2>R${product.price}</h2>
                </div>

                <div className={styles.compra5}>
                    <button  >COMPRAR</button>
                    <button className={styles.compra51}>ADICIONAR AO CARRINHO</button>
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
                    {/* colocar prop desc */}
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

                            <img src={`http://localhost:8080/${product.src}`} alt="imagem principal do produto" />
                        </div>

                    </div>
                    <div className={styles.desktop1}>
                        <div className={styles.compra2}>
                            {/* prop de titulo */}
                            <h1>{product.title}</h1>
                            <Link smooth to="#moreinfo2">Mais informações</Link>

                        </div>
                        <div className={styles.compra3}>
                            {/* prop de custoR e custoP*/}
                            <h2>R${product.price}</h2>
                        </div>

                        <div className={styles.compra5}>
                            <button>COMPRAR</button>
                            <button className={styles.compra51} >ADICIONAR AO CARRINHO</button>
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
                    {/* colocar prop desc */}
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

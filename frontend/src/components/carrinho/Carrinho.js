import { Link } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './Carrinho.module.css';
import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../axiosConfig/axios';
export function Carrinho() {
    const [cart, setCart] = useState([]);
    const [frete, setFrete] = useState(0);
    const [cep, setCep] = useState();
    const navigate = useNavigate();
    useEffect(() => {

        setCep(localStorage.getItem("cep"))
        function fetchCart() {
            const cartItems = JSON.parse(localStorage.getItem("cartItems"));
            setCart(cartItems)
        }
        fetchCart();
    }, [])
    const removeFromCart = (index) => {
        const updatedCartItems = [...cart];
        updatedCartItems.splice(index, 1);
        setCart(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };
    const [total, setTotal] = useState(0);
    useEffect(() => {

        if (cart) {
            const sum = cart.reduce((accumulator, item) => {
                const priceStr = item.price.replace('R$', '').trim();
                const price = parseFloat(priceStr.replace(',', '.'));
                return accumulator + price;
            }, 0);
            setTotal(sum + Number(frete));
        }


    }, [cart, calcularFrete]);


    if (!cart || cart.length === 0) {
        return (
            <div>
                <Header />
                <div className={styles.vazio}>
                    <FaShoppingCart />
                    <h1>seu carrinho tá vazio</h1>
                    <p>Que tal navegar pelas milhares de ofertas e achar uma especial para você?</p>
                    <Link to={'/catalogo'}><button>Nosso catálogo</button></Link>
                </div>
                <Footer />
            </div>
        )
    }

    function checkout() {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id");
        if (!token || !userId) {
            toast.error("Crie uma conta ou faça login para continuar");

        }
        else if (!frete) {
            toast.error("Calcule o frete antes de prosseguir");
        }
        else {
            localStorage.setItem('total', total)
            localStorage.setItem("frete", frete);
            localStorage.setItem("cep", cep);
            navigate('/checkout')
        }

    }


    //calculo de frete

    async function calcularFrete() {
        if (!cep || cep.length < 8) {
            toast.error("Coloque um cep válido")
        }
        try {
            const response = await api.post("/calcfrete", {
                cepCliente: cep
            });
            setFrete(response.data.price);

        } catch (error) {
            toast.error("Coloque um cep válido")
        }
    }


    return (
        <div>
            <ToastContainer />
            <Header />


            <div className={styles.carrinho}>
                <h2>carrinho</h2>
                <div>

                    {cart.map((item, index) => (
                        <div key={index} className={styles.carrinho2}>
                            <div className={styles.carrinho3}>
                                <img src={item.imageUrl} alt="imagem do produto" />
                                <p onClick={() => removeFromCart(index)}>remover</p>
                            </div>
                            <div className={styles.carrinho3}>
                                <h1>{item.title}</h1>
                                <h3>R$ {item.price}</h3>
                                <h4>tipo: <span>{item.variations}</span></h4>
                            </div>
                        </div>
                    ))}


                    <div className={styles.calcFrete}>
                        <h2>Calcular Frete</h2>
                        <input
                            type="number"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            placeholder="Digite o CEP"
                            maxLength="9"
                            style={styles.input}
                        />
                        <button onClick={calcularFrete} className={styles.calcButton}>
                            Calcular
                        </button>
                    </div>

                    <div className={styles.carrinho4}>
                        <div className={styles.carrinho41}>
                            <div className={styles.carrinho4a}>
                                <h1>resumo do pedido</h1>
                            </div>
                            <div className={styles.carrinho4b}>
                                <h2>{cart.length} produtos</h2>
                                <h2>R$ {total.toFixed(2) - frete}</h2>
                            </div>
                            <div className={styles.carrinho4b}>
                                <h2>frete</h2>
                                <h2>{!frete ? "calcule seu frete" : `PAC R$ ${frete}`}</h2>
                            </div>
                            <div className={styles.linha}>

                            </div>
                            <div className={styles.carrinho4b}>
                                <h3>total</h3>
                                <h3>R$ {total.toFixed(2)}</h3>
                            </div>
                            <div className={styles.linha}>

                            </div>
                            <div>
                                <button onClick={checkout} >Continuar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    )
}
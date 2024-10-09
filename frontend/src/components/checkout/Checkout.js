import styles from './Checkout.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import api from '../../axiosConfig/axios';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ToastContainer, toast } from "react-toastify";
export function Checkout() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [cpf, setCpf] = useState('')
    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [cidade, setCidade] = useState('')
    const [estado, setEstado] = useState('')
    const [mostrarCampos, setMostrarCampos] = useState(false);
    const [erroCEP, setErroCEP] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const frete = localStorage.getItem("frete");
    const customer = {
        phone: {
            country: "+55",
            area: phone.substring(0, 2),
            number: phone.substring(2)
        },
        name: nome,
        email: email,
        tax_id: cpf,

    }
    const items = cartItems.map((item, index) => ({
        reference_id: item.variations ? `TIPO: ${item.variations}` : `PRODUTO SEM VARIACAO`,
        name: item.title,
        quantity: 1,
        unit_amount: Number(item.price.replace(/[^0-9,-]+/g, "").replace(",", ".")) * 100,
        image_url: 'https://www.petz.com.br/blog//wp-content/upload/2018/09/tamanho-de-cachorro-pet-1.jpg'

    }))
    const shipping = {
        address: {
            country: "BRA",
            region_code: estado,
            city: cidade,
            postal_code: cep,
            street: endereco,
            number: numero,
            locality: bairro,
            complement: complemento
        },
        type: "FIXED",
        amount: Number(frete) * 100,
        service_type: "PAC",
        address_modifiable: true,

    }

    // Função para recuperar os dados do carrinho ao carregar a página
    useEffect(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);



    const total = localStorage.getItem("total");
    const limit = total >= 200 ? "4" : "1"
    const payment_methods_configs = [
        {
            type: 'credit_card',
            config_options: [
                { option: 'installments_limit', value: limit },]
        }
    ]


    async function toBuy() {
        if (nome === '' || email === '' || phone === '' || cpf === '' || cep === '' || endereco === '' || numero === '' || bairro === '' || cidade === '' || estado === '') {
            toast.error("Faltando dados");
        } else {
            try {
                const response = await api.post("/criarcheckout", {
                    customer,
                    items,
                    shipping,
                    payment_methods_configs
                })
                localStorage.setItem("transactionId", response.data.id);
                localStorage.setItem("transactionName", response.data.reference_id);
                localStorage.setItem("transactionDate", response.data.created_at);


                window.location.href = response.data.links[1].href

            } catch (err) {
                toast.error("Confira se o Email, Número de celular e o CPF está correto, pois a escrita incorreta de alguns desses dados não te deixará avançar");
            }
        }

        localStorage.setItem('nome', nome);
        localStorage.setItem('email', email);
        localStorage.setItem('phone', phone);
        localStorage.setItem('cpf', cpf);
    }
    useEffect(() => {
        const nomeSalvo = localStorage.getItem('nome');
        const emailSalvo = localStorage.getItem('email');
        const phoneSalvo = localStorage.getItem('phone');
        const cpfSalvo = localStorage.getItem('cpf');
        const cepSalvo = localStorage.getItem('cep');

        if (nomeSalvo) setNome(nomeSalvo);
        if (emailSalvo) setEmail(emailSalvo);
        if (phoneSalvo) setPhone(phoneSalvo);
        if (cpfSalvo) setCpf(cpfSalvo);
        if (cepSalvo) setCep(cepSalvo);

    }, []);

    useEffect(() => {
        if (cep.length === 8) {
            buscarEnderecoPorCEP();
        } else {
            limparCamposEndereco();
            setMostrarCampos(false);
            setErroCEP(false);
        }
    }, [cep]);

    const buscarEnderecoPorCEP = async () => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const data = response.data;

            if (data.erro) {
                limparCamposEndereco();
                setMostrarCampos(false);
                setErroCEP(true);
            } else {
                setEndereco(data.logradouro);
                setBairro(data.bairro);
                setCidade(data.localidade);
                setEstado(data.uf);
                setMostrarCampos(true);
                setErroCEP(false);
            }
        } catch (error) {
            limparCamposEndereco();
            setMostrarCampos(false);
            setErroCEP(true);
        }
    };

    const limparCamposEndereco = () => {
        setEndereco('');
        setNumero('');
        setComplemento('');
        setBairro('');
        setCidade('');
        setEstado('');
    };


    return (
        <div>
            <ToastContainer />
            <Header />
            <div className={styles.checkout}>
                <div className={styles.checkout1}>
                    <h1>Dados para entrega</h1>
                </div>
                <div className={styles.checkout1}>
                    <p>Nome completo</p>
                    <input type="text" value={nome} onChange={(e) => { setNome(e.target.value) }} required />
                </div>
                <div className={styles.checkout1}>
                    <p>Email</p>
                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                </div>
                <div className={styles.checkout1}>
                    <p>DDD + Celular</p>
                    <input type="number" value={phone} onChange={(e) => { setPhone(e.target.value) }} required />
                </div>
                <div className={styles.checkout1}>
                    <p>CPF</p>
                    <input type="number" value={cpf} onChange={(e) => { setCpf(e.target.value) }} required />
                </div>
                <div className={styles.checkout1}>
                    <p>CEP {erroCEP && <span style={{ color: 'red' }}>(CEP inválido)</span>}</p>
                    <input type="number" value={cep} onChange={(e) => { setCep(e.target.value) }} required />
                </div>
                {mostrarCampos &&
                    <>
                        <div className={styles.checkout1}>
                            <p>Endereço</p>
                            <input type="text" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} required />
                        </div>
                        <div className={styles.checkout1}>
                            <p>Número</p>
                            <input type="number" value={numero} onChange={(e) => { setNumero(e.target.value) }} required />
                        </div>
                        <div className={styles.checkout1}>
                            <p>Complemento (opcional)</p>
                            <input type="text" value={complemento} onChange={(e) => { setComplemento(e.target.value) }} required />
                        </div>
                        <div className={styles.checkout1}>
                            <p>Bairro</p>
                            <input type="text" value={bairro} onChange={(e) => { setBairro(e.target.value) }} required />
                        </div>
                        <div className={styles.checkout1}>
                            <p>Cidade</p>
                            <input type="text" value={cidade} onChange={(e) => { setCidade(e.target.value) }} required />
                        </div>
                        <div className={styles.checkout1}>
                            <p>Estado</p>
                            <input type="text" value={estado} onChange={(e) => { setEstado(e.target.value) }} required />
                        </div>

                    </>
                }
                <div className={styles.checkout1}>
                    <input type="submit" value={'Continuar'} onClick={toBuy} />
                </div>
            </div>
            <Footer />
        </div>

    )

}
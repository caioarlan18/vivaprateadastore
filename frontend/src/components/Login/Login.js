import styles from '../Register/Register.module.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import api from '../../axiosConfig/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    async function handleSubmit() {
        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });
            const id = response.data.id;
            const token = response.data.token;
            localStorage.setItem("id", id);
            localStorage.setItem("token", token);
            navigate("/painel")
        } catch (err) {
            toast.error(err.response.data.msg);
        }

    }
    return (

        <div>
            <Header />
            <ToastContainer />

            <div className={styles.container}>
                <div className={styles.register}>
                    <div className={styles.register0}>
                        <h1>Entre com sua conta</h1>
                        <p>ou</p>
                        <Link to={'/register'}>Criar conta</Link>
                    </div>

                    <form action="">
                        <div className={styles.register1}>
                            <label htmlFor="email">Email</label>
                            <input type="email" value={email} onChange={handleEmail} />
                        </div>
                        <div className={styles.register1}>
                            <label htmlFor="senha">Senha</label>
                            <input type="password" value={password} onChange={handlePassword} />
                        </div>
                    </form>
                    <button onClick={handleSubmit} >Entrar</button>


                </div>
            </div>
            <Footer />
        </div>

    )
}
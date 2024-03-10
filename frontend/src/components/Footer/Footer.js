import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import bandeira1 from '../images/bandeiras cartao1.webp';
import bandeira2 from '../images/bandeira2.webp';
export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.instucional}>
                <div className={styles.redes}>
                    <a href="https://www.instagram.com/vivaprateada/"><FaInstagram /></a>
                    <a href="https://api.whatsapp.com/message/CVBC73LMBOPXP1?autoload=1&app_absent=0"><FaWhatsapp /></a>
                </div>
                <div className={styles.footer1}>
                    <h1>Suporte</h1>
                    <Link to={"/trocas"}><p>Trocas e devoluções</p></Link>
                    <Link to={"/envioentrega"}><p>Envio e Entrega</p></Link>
                </div>
                <div className={styles.footer1}>
                    <h1>Institucional</h1>
                    <Link to={"/about"}><p>Quem somos</p></Link>
                </div>
            </div>
            <div className={styles.bandeiras}>
                <div>
                    <img src={bandeira2} alt="bandeira-de-pagamento2" />
                </div>
                <div>
                    <img src={bandeira1} alt="bandeira-de-pagamento1" />
                </div>
            </div>
        </div >
    )
}
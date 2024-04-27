import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import bandeira from '../images/bandeira_pagamento.webp';
import { animateScroll as scroll } from "react-scroll";

export function Footer() {
    function toTop() {
        scroll.scrollToTop({ duration: 0 });

    }
    return (
        <div className={styles.footer}>
            <div className={styles.instucional}>
                <div className={styles.redes}>
                    <a href="https://www.instagram.com/vivaprateada/"><FaInstagram /></a>
                    <a href="https://api.whatsapp.com/message/CVBC73LMBOPXP1?autoload=1&app_absent=0"><FaWhatsapp /></a>
                </div>
                <div className={styles.footer1}>
                    <h1>Suporte</h1>
                    <Link to={"/trocas"} onClick={toTop}><p>Trocas e devoluções</p></Link>
                    <Link to={"/envioentrega"} onClick={toTop}><p>Envio e Entrega</p></Link>
                </div>
                <div className={styles.footer1}>
                    <h1>Institucional</h1>
                    <Link to={"/sobre"} onClick={toTop}><p>Quem somos</p></Link>
                </div>
            </div>
            <div className={styles.bandeiras}>
                <h1>Pagamentos</h1>
                <img src={bandeira} alt="bandeira_pagamento" />
            </div>
        </div >
    )
}
import styles from './Header.module.css';
import { FaBars, FaAngleDown, FaUser, FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logotipo from '../images/logosite.jpg';
import categories from '../categoryArray/CategoryArr';
import { animateScroll as scroll } from "react-scroll";

export function Header() {
    const [openCat, setOpenCat] = useState(false);
    const [logged, setLogged] = useState(false);
    function menuOpen() {
        const menu = document.querySelector(`.${styles.menuHamburguer}`);
        menu.classList.add(styles.active);
    }
    function handleOpenCat() {
        setOpenCat(!openCat);
    }

    //verify logged
    const userdata = JSON.parse(localStorage.getItem("userdata"))
    useEffect(() => {
        if (!userdata) {
            setLogged(false);
        } else {
            setLogged(true);
        }
    }, [])

    function close() {
        const menu = document.querySelector(`.${styles.menuHamburguer}`);
        menu.classList.remove(styles.active);
        scroll.scrollToTop({ duration: 0 });

    }
    return (
        <div>

            {/* header mobile */}
            <div className={styles.menufixo}>
                <div className={styles.premenu}>
                    <h1>Entregamos para todo Brasil!</h1>
                </div>
                <div className={styles.headerMobile}>
                    <div className={styles.headerMobile1} >
                        <FaBars onClick={menuOpen} />
                    </div>
                    <Link className={styles.headerMobile1} to={"/"}>
                        <img src={logotipo} alt="logo do site" />
                        <h1>VIVA <br />Prateada</h1>
                    </Link>
                    <div className={styles.headerMobile1} >
                        <Link to={"/favorites"} onClick={() => scroll.scrollToTop({ duration: 0 })}>
                            <FaHeart style={{ position: "relative", right: "10px" }} />
                        </Link>
                        <Link to={"/carrinho"} onClick={() => scroll.scrollToTop({ duration: 0 })}>
                            <FaShoppingCart />
                        </Link>

                    </div>
                </div>
            </div>
            <div className={styles.spacer}></div>

            {/* header desktop */}
            <div className={styles.onlyDesktop}>
                <div className={styles.premenuD}>
                    <h1>Entregamos para todo Brasil!</h1>
                </div>
                <div className={styles.headerDesktop}>
                    <Link className={styles.headerDesktop1} to={"/"}>
                        <img src={logotipo} alt="logo do site" />
                        <h1>VIVA<br />Prateada</h1>
                    </Link>
                    <div className={styles.drop}>
                        <span onClick={handleOpenCat}>Categorias <FaAngleDown /></span>
                        <Link to={"/catalogo"}><span>Nosso catálogo</span></Link>
                    </div>

                    <div className={styles.headerDesktop1}>
                        <Link to={"/login"}>{logged ? <span>Olá {userdata.name}</span> : <span>Login</span>}<FaUser /></Link>
                        <Link to={"/favorites"} onClick={() => scroll.scrollToTop({ duration: 0 })}><FaHeart /></Link>
                        <Link to={'/carrinho'} onClick={() => scroll.scrollToTop({ duration: 0 })}><FaShoppingCart /></Link>


                    </div>
                </div>

                {openCat && <div className={styles.menubottom1}>
                    <div className={styles.nav2d} >


                        {categories.map((cat, index) => (
                            <Link to={`/category/${cat}`} key={index} onClick={() => { setOpenCat(false) }}>{cat}</Link>
                        ))}
                    </div>
                </div>}
            </div>
            <div className={styles.spacerD}></div>
            {/* menu hamburguer */}
            <div className={styles.menuHamburguer}>
                <div className={styles.log}>
                    <div className={styles.log1}>
                        <h1>MENU</h1>
                        <FaTimes onClick={() => {
                            const menu = document.querySelector(`.${styles.menuHamburguer}`);
                            menu.classList.remove(styles.active);
                        }} />
                    </div>
                    <div className={styles.log2}>
                        <Link to={'/'} onClick={close}>Início</Link>
                        <div></div>
                        <Link to={'/login'}><FaUser />{logged ? <span>Olá {userdata.name}</span> : <span>MINHA CONTA</span>}</Link>
                    </div>
                </div>

                <div className={styles.nav2} >
                    <Link to={"/catalogo"} onClick={close}><span>Nosso catálogo</span></Link>
                    {categories.map((cat, index) => (
                        <Link to={`/category/${cat}`} key={index} onClick={close}><span>{cat}</span></Link>
                    ))}
                </div>
            </div>

        </div>
    )
}
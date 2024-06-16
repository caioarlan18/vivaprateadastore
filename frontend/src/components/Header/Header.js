import styles from './Header.module.css';
import { FaBars, FaAngleDown, FaUser, FaShoppingCart, FaHeart, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logotipo from '../images/logosite.jpg';
import categories from '../categoryArray/CategoryArr';
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

    //contador de itens carrinho
    const [cartItems, setCartItems] = useState([])
    const [countCart, setCountCart] = useState(0);
    useEffect(() => {

        const cartItemsSaved = JSON.parse(localStorage.getItem("cartItems"));
        setCartItems(cartItemsSaved);
        setCountCart(cartItems.length);
    }, [])

    function close() {
        const menu = document.querySelector(`.${styles.menuHamburguer}`);
        menu.classList.remove(styles.active);
    }
    return (
        <div>

            {/* header mobile */}
            <div className={styles.premenu}>
                <h1>Texto para botar aqui ex: frete grátis para todo brasil</h1>
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
                    <Link to={"/favorites"}>
                        <FaHeart style={{ position: "relative", right: "10px" }} />
                    </Link>
                    <Link to={"/carrinho"}>
                        <FaShoppingCart />
                        <span>{countCart}</span>
                    </Link>

                </div>
            </div>

            {/* header desktop */}
            <div className={styles.onlyDesktop}>
                <div className={styles.headerDesktop}>
                    <Link className={styles.headerDesktop1} to={"/"}>
                        <img src={logotipo} alt="logo do site" />
                        <h1>VIVA<br />Prateada</h1>
                    </Link>
                    <div onClick={handleOpenCat} className={styles.drop}>
                        <span>Categorias <FaAngleDown /></span>
                        <Link to={"/novidades"}><span>Novidades</span></Link>
                    </div>

                    <div className={styles.headerDesktop1}>
                        <Link to={"/login"}>{logged ? <span>Olá {userdata.name}</span> : <span>Login</span>}<FaUser /></Link>
                        <Link to={"/favorites"}><FaHeart /></Link>
                        <Link to={'/carrinho'}><FaShoppingCart /></Link>


                    </div>
                </div>

                {openCat && <div className={styles.menubottom1}>
                    <div className={styles.nav2d} >
                        {categories.map((cat, index) => (
                            <Link to={`/category/${cat}`} key={index} onClick={() => setOpenCat(false)}>{cat}</Link>
                        ))}
                    </div>
                </div>}


            </div>

            {/* menu hamburguer */}
            <div className={styles.menuHamburguer}>
                <div className={styles.log}>
                    <div className={styles.log1}>
                        <h1>MENU</h1>
                        <FaTimes onClick={close} />
                    </div>
                    <div className={styles.log2}>
                        <Link to={'/'} onClick={close}>Início</Link>
                        <div></div>
                        <Link to={'/login'}><FaUser />{logged ? <span>Olá {userdata.name}</span> : <span>MINHA CONTA</span>}</Link>
                    </div>


                </div>

                <div className={styles.nav2} >
                    {categories.map((cat, index) => (
                        <Link to={`/category/${cat}`} key={index}><span>{cat}</span></Link>
                    ))}
                </div>
            </div>

        </div>





    )
}
import styles from './Header.module.css';
import { FaBars, FaAngleDown, FaAngleRight, FaUser, FaShoppingCart, FaSearch, FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logotipo from '../images/logosite.jpg';
export function Header() {
    const [masc, setMasc] = useState(false);
    const [fem, setFem] = useState(false);
    const [unissex, setUnissex] = useState(false);
    const [openCat, setOpenCat] = useState(false);
    const [logged, setLogged] = useState(false);
    function menuOpen() {
        const menu = document.querySelector(`.${styles.menuHamburguer}`);
        menu.classList.toggle(styles.active);
    }
    function handleMasc() {
        setMasc(!masc);
    }
    function handleFem() {
        setFem(!fem);
    }
    function handleUnissex() {
        setUnissex(!unissex);
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


    return (
        <div>

            {/* header mobile */}
            <div className={styles.headerMobile}>
                <Link className={styles.headerMobile1} to={"/"}>
                    <img src={logotipo} alt="logo do site" />
                    <h1>VIVA <br />Prateada</h1>
                </Link>
                <div className={styles.headerMobile1} >
                    <FaSearch />
                    <Link to={"/favorites"}>
                        <FaHeart />
                    </Link>
                    <Link to={"/carrinho"}>
                        <FaShoppingCart />
                        <span>{countCart}</span>
                    </Link>
                    <FaBars onClick={menuOpen} />
                </div>
            </div>

            {/* header desktop */}
            <div className={styles.onlyDesktop}>
                <div className={styles.headerDesktop}>
                    <Link className={styles.headerDesktop1} to={"/"}>
                        <img src={logotipo} alt="logo do site" />

                        <h1>VIVA<br />Prateada</h1>
                    </Link>
                    <div className={styles.headerDesktop1}>
                        <FaSearch className={styles.lupa} /><input type="text" placeholder='Pesquisar' />
                    </div>
                    <div className={styles.headerDesktop1}>
                        <Link to={"/login"}>{logged ? <span>Olá {userdata.name}</span> : <span>Login</span>}<FaUser /></Link>
                        <Link to={"/favorites"}><FaHeart /></Link>
                        <Link to={'/carrinho'}><FaShoppingCart /></Link>


                    </div>
                </div>
                <div className={styles.menubottom}>

                    <div onClick={handleOpenCat}>
                        <span>Categorias <FaAngleDown /></span>
                    </div>
                    <Link to={"/novidades"}><span>Novidades</span></Link>
                </div>
                {openCat && <div className={styles.menubottom1}>
                    <div className={styles.menubottom2}>
                        <h1>Masculino</h1>
                        <Link to={"/correntemasculina"}>Corrente Masculino</Link>
                        <Link to={"/brincomasculino"}>Brinco Masculino</Link>
                    </div>
                    <div className={styles.menubottom2}>
                        <h1>Unissex</h1>
                        <Link to={"/correnteunissex"}>Corrente Unissex</Link>
                        <Link to={"/brincounissex"}>Brinco Unissex</Link>
                    </div>
                    <div className={styles.menubottom2}>
                        <h1>Feminino</h1>
                        <Link to={"/correntefeminino"}>Corrente Feminino</Link>
                        <Link to={"/brincofeminino"}>Brinco Feminino</Link>
                    </div>
                </div>}


            </div>

            {/* menu hamburguer */}
            <div className={styles.menuHamburguer}>
                <div className={styles.log}>
                    <Link to={'/login'}><FaUser />{logged ? <span>Olá {userdata.name}</span> : <span>Login</span>}</Link>
                </div>

                <div className={styles.cat}  >
                    <p onClick={handleMasc}>Masculino <FaAngleDown /> </p>
                    {masc &&
                        <div className={styles.subcat}>
                            <Link to={"/correntemasculino"}>Corrente Masculino</Link>
                            <Link to={"/brincomasculino"}>Brinco Masculino</Link>
                        </div>
                    }
                </div>
                <div className={styles.cat}  >
                    <p onClick={handleUnissex}>Unissex<FaAngleDown /> </p>
                    {unissex &&
                        <div className={styles.subcat}>
                            <Link to={"/correnteunissex"}>Corrente Unissex</Link>
                            <Link to={"/brincounissex"}>Brinco Unissex</Link>
                        </div>
                    }
                </div>
                <div className={styles.cat} >
                    <p onClick={handleFem}>Feminino <FaAngleDown /></p>
                    {fem &&
                        <div className={styles.subcat}>
                            <Link to={"/correntefeminina"}>Corrente Feminino</Link>
                            <Link to={"/brincofeminino"}>Brinco Feminino</Link>
                        </div>
                    }
                </div>
                <div className={styles.cat}>
                    <Link to={"/novidades"}>Novidades <FaAngleRight /></Link>
                </div>

            </div>

        </div>





    )
}
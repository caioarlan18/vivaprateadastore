import styles from './Header.module.css';
import { FaBars, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export function Header() {
    const [masc, setMasc] = useState(false);
    const [fem, setFem] = useState(false);
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
    return (
        <div>


            <div className={styles.headerMobile}>
                <div className={styles.headerMobile1}>
                    <h1>Viva prateada</h1>
                </div>
                <div className={styles.headerMobile1} onClick={menuOpen}>
                    <FaBars />
                </div>
            </div>

            <div className={styles.headerDesktop}>
                <div className={styles.headerDesktop1}>
                    <h1>Viva prateada</h1>
                </div>
                <div className={styles.headerDesktop1}>
                    <span>Masculino</span>
                    <span>Feminino</span>
                    <span>Novidades</span>
                </div>
                <div className={styles.headerDesktop1}>
                    <FaBars />
                </div>
            </div>
            {/* menu hamburguer */}
            <div className={styles.menuHamburguer}>
                <div className={styles.log}>
                    <Link to={'/login'}>Fazer login</Link>
                </div>
                <div className={styles.cat}  >
                    <p onClick={handleMasc}>Masculino <FaAngleDown /> </p>
                    {masc &&
                        <div className={styles.subcat}>
                            <Link to={"/correntemasc"}>Corrente Masculino</Link>
                            <Link to={"/brincomas"}>Brinco Masculino</Link>
                        </div>
                    }
                </div>
                <div className={styles.cat} >
                    <p onClick={handleFem}>Feminino <FaAngleDown /></p>
                    {fem &&
                        <div className={styles.subcat}>
                            <Link to={"/correntefem"}>Corrente Feminino</Link>
                            <Link to={"/brincofem"}>Brinco Feminino</Link>
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
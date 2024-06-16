import styles from './Popular.module.css';
import { Link } from 'react-router-dom';
import categories from '../categoryArray/CategoryArr';
import { animateScroll as scroll } from "react-scroll";
export function Popular() {
    function onTop() {
        scroll.scrollToTop({ duration: 0 });
    }
    return (
        <div className={styles.popular}>
            <div className={styles.popularTitle}>
                <h1>populares</h1>
                <p>confira nossas categorias mais populares</p>
            </div>
            <div className={styles.popular1}>
                {categories.map((cat, index) => (
                    index < 8 &&
                    <Link to={`/category/${cat}`} className={styles.popular2} key={index} onClick={onTop}>
                        <span >{cat}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
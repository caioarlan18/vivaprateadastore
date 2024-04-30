import styles from './Popular.module.css';
import { Link } from 'react-router-dom';
import categories from '../categoryArray/CategoryArr';
export function Popular() {
    return (
        <div className={styles.popular}>
            <div className={styles.popularTitle}>
                <h1>- Popular agora</h1>
            </div>
            <div className={styles.popular1}>
                {categories.map((cat, index) => (
                    index < 8 &&
                    <Link to={`/category/${cat}`} className={styles.popular2} key={index}>
                        <span >{cat}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
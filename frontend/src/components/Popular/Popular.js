import styles from './Popular.module.css';
import { Link } from 'react-router-dom';
export function Popular() {
    return (
        <div className={styles.popular}>
            <div className={styles.popularTitle}>
                <h1>- Popular agora</h1>
            </div>
            <div className={styles.popular1}>
                <div className={styles.popular2}>
                    <Link>Corrente Masculina</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Alianças</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Brinco Feminino</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Anéis Masculinos</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Corrente Masculina</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Alianças</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Brinco Feminino</Link>
                </div>
                <div className={styles.popular2}>
                    <Link>Anéis Masculinos</Link>
                </div>

            </div>
        </div>
    )
}
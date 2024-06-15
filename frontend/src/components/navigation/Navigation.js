import styles from './Navigation.module.css';
export function Navigation({ name }) {
    return (
        <div className={styles.navigation}>
            <h1>{name}</h1>
        </div>
    )
}
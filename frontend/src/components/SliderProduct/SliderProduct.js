import styles from './SliderProduct.module.css'
export function SliderProduct() {
    return (
        <div className={styles.sliderProduct}>
            <div className={styles.sliderProductTitle}>
                <h1>- Peças disponíveis</h1>
            </div>
            <div className={styles.sliderProduct1}>
                <img src="" alt="teste" />
                <h1>titulo</h1>
                <h2>preço</h2>
                <button>comprar</button>
            </div>
        </div>
    )
}
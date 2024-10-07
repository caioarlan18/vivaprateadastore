import { Footer } from "../../Footer/Footer";
import { Header } from "../../Header/Header";
import styles from '../Institucional.module.css';

export function Sobre() {
    return (
        <div>
            <Header />
            <div className={styles.inst}>
                <h1>Sobre Nós</h1>
                <p>
                    Olá, sou Patrícia Pagy, mãe, esposa e amante de pratas 925 e vou contar um pouco sobre essa paixão chamada: joias!
                    <br /><br />
                    Desde pequena, a prata sempre teve um lugar especial no meu coração. Esse amor me acompanhou por anos, até que, há quase 2 anos, decidi transformar esse amor em um negócio, realizando assim, meu sonho de trabalhar com joias em prata!
                    <br /><br />
                    Viver essa paixão é uma alegria indescritível. Cada vez que alguém escolhe uma de minhas peças, sinto que estou compartilhando um pedaço da minha história e cada um desses clientes fazem parte de um sonho realizado.
                    <br /><br />
                    Eu escolho cuidadosamente cada joia, pensando em cada detalhe, pois cada peça que ofereço é um reflexo dessa paixão e quero que vocês sintam isso, essa preocupação em levar algo lindo e encantador. Afinal, a prata ilumina não só nossos looks, mas também nossos corações.
                    <br /><br />
                    Aqui, você encontrará não apenas peças em prata , mas sim, joias exclusivas,  que refletem a minha paixão e dedicação. Venha descobrir e fazer parte dessa história E VIVA PRATEADA você também!
                </p>
            </div>
            <Footer />
        </div>
    )
}
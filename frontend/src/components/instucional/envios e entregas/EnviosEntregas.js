import { Footer } from "../../Footer/Footer";
import { Header } from "../../Header/Header";
import styles from '../Institucional.module.css';

export function EnviosEntregas() {
    return (
        <div>
            <Header />
            <div className={styles.inst}>
                <h1>Envios e Entregas</h1>
                <p>
                    O envio será feito de forma tradicional, pelos correios, sendo cobrado frete e com tempo de entrega entre 4 dias à 1 semana e meia, dependendo de onde se encontra o destinatário.
                    <br /><br />
                    Retirada em Brasília
                    Essa opção é ideal para você que é de Brasília e não quer pagar frete.
                    <br /><br />
                    - Endereço:
                    Nosso escritório fica localizado em Vicente Pires. O endereço será enviado por e-mail ou WhatsApp assim que estiver disponível para retirada.
                    <br /><br />
                    - Como funciona?
                    Ao realizar o pedido, você pode optar pela retirada do produto no nosso escritório e assim não pagar o frete. Até um dia útil após a confirmação do pagamento seu pedido será separado e você receberá um e-mail ou WhatsApp com o endereço completo da retirada.
                    <br /><br />
                    - Dúvidas?
                    Fale conosco através de um dos nossos três canais de atendimento:
                    <br /><br />
                    WhatsApp: (61) 99128-4534
                    <br />
                    E-mail: vivaprateadabsb@gmail.com
                    <br />
                    Instagram:@vivaprateada.
                    <br />
                    O prazo para retirada do seu pedido é de 15 dias úteis.
                </p>
            </div>
            <Footer />
        </div>
    )
}
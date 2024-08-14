import styles from './LastPay.module.css';
import { useNavigate } from 'react-router-dom';
export function LastPay() {
    const navigate = useNavigate();
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const transactions = userdata.transactions;
    function seeDetails(id) {
        navigate(`/transaction/${id}`)
    }
    return (
        <div className={styles.tr}>
            {
                transactions.map((tran, index) => {
                    const formattedDate = new Date(tran.transactionDate).toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });

                    return (
                        <div className={styles.tr1} key={index}>
                            <h1>Compra {index + 1}</h1>
                            <h2>R$ {tran.transactionPrice}</h2>
                            <h3>Data: {formattedDate}</h3>
                            <button onClick={() => seeDetails(tran.transactionId)}>Ver detalhes</button>
                        </div>
                    );
                })
            }

        </div>
    )
}
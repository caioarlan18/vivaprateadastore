import { useParams } from "react-router-dom"
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
export function TransactionDetails() {
    const { id } = useParams();
    return (
        <div>
            <Header />
            {id}
            <Footer />
        </div>
    )
}
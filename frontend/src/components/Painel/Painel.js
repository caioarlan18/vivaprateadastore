import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function Painel() {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    return (
        <div>
            <Header />
            <h1>Ola {userdata.name}</h1>
            <Footer />
        </div>
    )
}
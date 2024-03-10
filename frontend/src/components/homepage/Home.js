import { Header } from "../Header/Header"
import { Popular } from "../Popular/Popular"
import { SliderImage } from "../SliderImage/SliderImage"
import { SliderProduct } from "../SliderProduct/SliderProduct"
import { Footer } from "../Footer/Footer"

export function Home() {
    return (
        <div>
            <Header />
            <SliderImage />
            <SliderProduct />
            <Popular />
            <Footer />
        </div>
    )
}
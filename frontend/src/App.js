import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/homepage/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { VerifyToken } from './components/PrivateRoute/VerifyToken';
import { Painel } from './components/Painel/Painel';
import { VerifyLogged } from './components/VerifyLogged/VerifyLogged';
import { ProductPage } from './components/product page/ProductPage';
import { FavoriteProducts } from './components/favorite/FavoriteProducts';
import { Carrinho } from './components/carrinho/Carrinho';
import { UpdateProduct } from './components/Painel/updateproduct/UpdateProduct';
import { Category } from './components/categorias/Category';
import { Sobre } from './components/instucional/sobre/Sobre';
import { EnviosEntregas } from './components/instucional/envios e entregas/EnviosEntregas';
import { TrocasDevo } from './components/instucional/trocas e devo/TrocasDevo';
import { Checkout } from './components/checkout/Checkout';
import { CompraEfetuada } from './components/comprasucedida/CompraEfetuada';
import { TransactionDetails } from './components/transactiondetails/TransactionDetails';
import { Novidades } from './components/novidades/Novidades';
function App() {
  return (
    <Router>


      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<VerifyLogged><Login /></VerifyLogged>} />
        <Route path='/register' element={<Register />} />
        <Route path='/painel' element={<VerifyToken><Painel /></VerifyToken>} />
        <Route path='/productpage/:id' element={<ProductPage />} />
        <Route path='/favorites' element={<FavoriteProducts />} />
        <Route path='/carrinho' element={<Carrinho />} />
        <Route path='/update/:id' element={<UpdateProduct />} />
        <Route path='/category/:name' element={<Category />} />
        <Route path='/sobre' element={<Sobre />} />
        <Route path='/envioentrega' element={<EnviosEntregas />} />
        <Route path='/trocas' element={<TrocasDevo />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/compraefetuada' element={<CompraEfetuada />} />
        <Route path='/transaction/:checkoutId' element={<TransactionDetails />} />
        <Route path='/novidades' element={<Novidades />} />
      </Routes>
    </Router>
  );
}

export default App;

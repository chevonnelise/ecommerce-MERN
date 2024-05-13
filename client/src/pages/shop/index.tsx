import { useContext } from 'react';
import {useGetProducts} from '../../hooks/useGetProducts';
import { Product } from './product';
import { IShopContext, ShopContext } from "../../context/shop-context"
import './styles.css';
import { Navigate } from 'react-router-dom';

export const ShopPage = () => {
    const {products} = useGetProducts()
    const {isAuthenticated} = useContext<IShopContext>(ShopContext);

    if (!isAuthenticated) {
        return <Navigate to="/auth" />
    }

    return (
    <div className="shop">
        <div className="products">
            {products.map(product => (
                <Product product={product}/>
            ))}
        </div>
    </div>
    )
}
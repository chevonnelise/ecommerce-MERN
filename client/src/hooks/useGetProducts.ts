import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const {headers} = useGetToken();
    const {isAuthenticated} = useContext<IShopContext>(ShopContext);

    const fetchProducts = async () => {
        try{
        const fetchedProducts = await axios.get("https://3001-chevonnelis-ecommerceme-icd9j8e02nv.ws-us110.gitpod.io/product", {headers});
        setProducts(fetchedProducts.data.products);
        } catch (err) {
            alert("Error: Something went wrong.")
        }
    }

    useEffect(() => {
        if (isAuthenticated)
        fetchProducts()
    }, [isAuthenticated]);

    return {products};
}
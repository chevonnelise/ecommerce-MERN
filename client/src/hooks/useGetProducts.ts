import { useEffect, useState } from "react";
import axios from 'axios';
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interfaces";

export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const {headers} = useGetToken();

    const fetchProducts = async () => {
        try{
        const fetchedProducts = await axios.get("https://3001-chevonnelis-ecommerceme-73rjnovqumw.ws-us110.gitpod.io/product/", {headers});
        setProducts(fetchedProducts.data.products);
        } catch (err) {
            alert("Error: Something went wrong.")
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return {products};
}
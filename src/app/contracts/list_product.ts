import { ListProductImage, productImage } from "./list_product_image";

export class Product {
    id: number;
    name: string;
    price : number;
    stockCode: string;
    manufacturer: string;
    description: string;
    productImages: productImage[];
    path: string;
    
}

export class listProductResponse{

    books: Product[];
    totalProductCount: number;
    
}

export class ProductResponse{

    book : Product;
    message: string;
    success: string;
}
export interface Product {
    id: string,
    name: string,
    description: string,
    features: string,
    price: number,
    keywords: string,
    url: string,
    category: string,
    isFavourite: boolean,
    quantity: number,
}

export interface CartItem {
    product: Product,
    quantity: number,
}
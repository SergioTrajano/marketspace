export type Payment_method = "pix" | "card" | "deposit" | "cash" | "boleto";

export type ProductDTO = {
    accept_trade: boolean;
    created_at: string;
    description: string;
    id: string;
    is_active: boolean;
    is_new: boolean;
    name: string;
    payment_methods: { key: Payment_method; name: string }[];
    price: number;
    product_images: { id: string; path: string }[];
    updated_at: string;
    user: { avatar: string; name: string; tel: string };
    user_id: string;
};

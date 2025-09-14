export interface CartItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface User{
    id: number;
    fname: string;
    lname: string;
    username: string;
    role: boolean;
    phone: number | string;
    created_at: string;
    address: string;
    updated_at: string;
    email: string;
    password: string;
    status: boolean;
    cart: CartItem[];
    avatar?: string;
}

export default User


export interface Product{
    id: number;
    name: string;
    category: number;
    description: string;
    price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface Order {
    id: number;
    userId: number;
    items: CartItem[];
    subtotal: number;
    shippingFee?: number;
    discount?: number;
    voucherCode?: string;
    total: number;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
    created_at: string;
    updated_at: string;
    address?: string;
    phone?: number | string;
    addressId?: number;
    shippingMethodId?: number;
    paymentMethodId?: number;
}

export interface Address {
    id: number;
    userId: number;
    fullName: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    street: string;
    isDefault: boolean;
}

export type VoucherType = "percent" | "fixed" | "shipping";

export interface Voucher {
    id: number;
    code: string;
    type: VoucherType;
    value: number; // percent if type=percent, flat amount if fixed, percent for shipping
    minSubtotal: number;
    maxDiscount: number;
    start: string;
    end: string;
    isActive: boolean;
}

export interface ShippingMethod {
    id: number;
    name: string;
    fee: number;
    etaDays: number;
}

export interface PaymentMethod {
    id: number;
    name: string;
    type: string;
}



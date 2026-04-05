export interface AuthUser {
  id: number
  fullName: string
  username: string
  password: string
  email: string
  role: string
}

interface ProductMeta {
  name: string
  description: string
  quantity: number
  price: number
}
interface Invoice {
  invoiceNumber: string
  customerName: string
  invoiceDate: string | null
  dueDate: string | null
  totalAmount: number
  status: string
  from: {
    name: string
    address: string
    phone: string
  }
  to: {
    name: string
    address: string
    phone: string
  }
  products: ProductMeta[]
}


// product list page types
export interface Product {
    id: number
    image: string
    name: string
    rating: number
    totalRating: number
    totalReview: number
    price: number
    discount: number,
    details: string[]
}

export interface Order {
    orderId: number,
    customer: string,
    productName: string,
    amount: number,
    orderDate: string,
    deliveryDate: string,
    paymentMethod: string,
    deliveryStatus: string,
  }

// user list
export interface User  {
    id:number
    name: string
    avatar: string
    email: string
    company: string
    role: string
    status: string
}
  
export type SelectItemKey = boolean | string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any);
export type DataTableCompareFunction<T = any> = (a: T, b: T) => number;
export type DataTableHeader = {
    key: string;
    value?: SelectItemKey;
    title: string;
    colspan?: number;
    rowspan?: number;
    fixed?: boolean;
    align?: 'start' | 'end' | 'center';
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    sortable?: boolean;
    sort?: DataTableCompareFunction;
};

// global search 
export interface GlobalSearchData {
  title: string
  to: Object
  icon?: string
  subtitle?:string
}

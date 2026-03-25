
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Women' | 'Men' | 'Kids' | 'Accessories';
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

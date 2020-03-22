export interface RegisterInterface {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_seller: string;
  email: string;
  password: string;
  image_url?: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface Products {
  id?: string;
  title: string;
  category: string;
  category_type: string;
  description: string;
  price: string;
  location: string;
  image_url: string;
  stock: string;
  seller_id: string;
  age_to?: string;
  age_from?: string;
  size?: string;
}

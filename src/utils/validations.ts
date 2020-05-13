import { RegisterInterface, LoginInterface } from "./interfaces";

export const registerValidation = (
  first_name: string,
  last_name: string,
  phone: string,
  is_seller: string,
  email: string,
  password: string
) => {
  const error: RegisterInterface = {
    first_name: "",
    last_name: "",
    is_seller: "",
    phone: "",
    email: "",
    password: "",
  };
  if (first_name === "") {
    error.first_name = "First name field is empty";
  }
  if (last_name === "") {
    error.last_name = "Last name field is empty";
  }
  if (is_seller === "") {
    error.is_seller = "seller/buyer field is empty";
  }
  if (phone === "") {
    error.phone = "Phone number field is empty";
  } else {
    if (phone.length < 9) {
      error.phone = "Phone number is less than 9 characters";
    }
  }
  if (email === "") {
    error.email = "Email field is empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      error.email = "Email is not valid";
    }
  }
  if (password === "") {
    error.password = "Password field is empty";
  }
  return error;
};

export const loginValidation = (email: string, password: string) => {
  const error: LoginInterface = {
    email: "",
    password: "",
  };
  if (email.trim() === "") {
    error.email = "Email field is empty";
  } else {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(regex)) {
      error.email = "Email is not valid";
    }
  }
  if (password.trim() === "") {
    error.password = "Password field is empty";
  }
  return error;
};

// const product = {
//   title: "",
//   category: "",
//   category_type: "",
//   description: "",
//   price: "",
//   location: "",
//   image_id: "",
//   stock: "",
//   seller_id: ""
// };

export const productsValidation = (
  title: string,
  category: string,
  category_type: string,
  description: string,
  price: string,
  location: string
) => {
  const error = {
    title: "",
    category: "",
    category_type: "",
    description: "",
    price: "",
    location: "",
  };
  if (title === "") error.title = "Title field is empty";
  if (category === "") error.category = "category field is empty";
  if (category_type === "")
    error.category_type = "category_type field is empty";
  if (price === "") error.price = "price field is empty";
  if (description === "") error.description = "description field is empty";
  if (location === "") error.location = "location field is empty";

  return error;
};

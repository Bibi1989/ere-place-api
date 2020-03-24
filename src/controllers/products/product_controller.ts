import { db, sql } from "../../models/pg-connect";
import { RegisterInterface, Products } from "../../utils/interfaces";
import { productsValidation } from "../../utils/validations";

export const getAllProducts = async () => {
  try {
    const products = await db.query(sql`SELECT * FROM products`);
    return products;
  } catch (error) {}
};

export const getSingleProduct = async (id: string) => {
  try {
    const product = await db.query(sql`SELECT * FROM products WHERE id=${id}`);
    return product;
  } catch (error) {}
};

export const createProduct = async (
  req: any,
  res: any,
  user: RegisterInterface
) => {
  const { id } = user;
  const {
    title,
    category,
    category_type,
    description,
    price,
    location,
    stock,
    image_url,
    age_to,
    age_from,
    size
  }: Products = req.body;

  const error = productsValidation(
    title,
    category,
    category_type,
    description,
    price,
    location
  );

  if (error.title) res.status(404).json({ error: error.title });
  if (error.category) res.status(404).json({ error: error.category });
  if (error.category_type) res.status(404).json({ error: error.category_type });
  if (error.description) res.status(404).json({ error: error.description });
  if (error.price) res.status(404).json({ error: error.price });
  if (error.location) res.status(404).json({ error: error.location });

  try {
    const [product]: Products[] = await db.query(
      sql`INSERT INTO products(title, category, category_type, description, price, location, image_url, stock, seller_id, age_to, age_from, size) VALUES(${title}, ${category}, ${category_type}, ${description}, ${price}, ${location}, ${image_url}, ${stock}, ${id}, ${age_to}, ${age_from}, ${size}) returning *`
    );
    return product;
  } catch (error) {
    return error.message;
  }
};

export const deleteProduct = async (deleteId: string) => {
  try {
    await db.query(sql`DELETE FROM products WHERE id=${deleteId}`)
  } catch (error) {
    return error.message
  }
}

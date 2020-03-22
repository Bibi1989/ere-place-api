import { db, sql } from "../../models/pg-connect";
import { Products } from "../../utils/interfaces";

export const createOrder = async (req: any) => {
  const {
    title,
    category,
    category_type,
    id,
    description,
    location,
    price,
    image_url,
    seller_id,
    size
  } = req.body;

  try {
    const [order]: Products[] = await db.query(
      sql`INSERT INTO orders(fashion_id, title, category, category_type, description, price, location, product_image, seller_id, size) VALUES(${id}, ${title}, ${category}, ${category_type}, ${description}, ${price}, ${location}, ${image_url}, ${seller_id}, ${size}) returning *`
    );

    return order;
  } catch (error) {
    return error.message;
  }
};

export const getOrders = async () => {
  try {
    const orders = await db.query(sql`SELECT * FROM orders`);
    return orders;
  } catch (error) {
    return error.message;
  }
};

export const deleteOrders = async (deleteId: string) => {
  try {
    await db.query(sql`DELETE FROM orders WHERE id = ${deleteId}`);
    return "Deleted Successfully!!!";
  } catch (error) {
    return error.message;
  }
};

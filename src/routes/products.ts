import { Request, Response, Router } from "express";
const router = Router();
import {
  getAllProducts,
  getSingleProduct,
  createProduct
} from "../controllers/products/product_controller";
import { Auth } from "../controllers/users/authentication";
import {
  createOrder,
  getOrders,
  deleteOrders
} from "../controllers/orders/order_controller";

router.get("/products", async (req: Request, res: Response) => {
  const products = await getAllProducts();
  return res.json({ products });
});

router.get("/product/:productId", async (req: Request, res: Response) => {
  const { productId } = req.params;
  const product = await getSingleProduct(productId);
  return res.json({ product });
});

router.post("/products", async (req: any, res: Response) => {
  const [user] = req.user["user"];
  const product = await createProduct(req, res, user);
  return res.json({ product });
});

router.get("/orders", async (req: Request, res: Response) => {
  const orders = await getOrders();
  res.json({ orders });
});

router.post("/orders", async (req: any, res: Response) => {
  const product = await createOrder(req);
  if (!product) {
    return res.status(404).json({ error: "Can,t add to cart" });
  }
  return res.json({ product });
});

router.delete("/orders/:deleteId", async (req, res) => {
  const { deleteId } = req.params;
  const delete_order = await deleteOrders(deleteId);
  if (deleteId) return res.json({ delete_msg: "Deleted successfully!!!" });
});

export default router;

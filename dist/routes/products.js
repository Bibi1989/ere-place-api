"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const product_controller_1 = require("../controllers/products/product_controller");
const authentication_1 = require("../controllers/users/authentication");
const order_controller_1 = require("../controllers/orders/order_controller");
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_controller_1.getAllProducts();
    return res.json({ products });
}));
router.get("/product/:productId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    const product = yield product_controller_1.getSingleProduct(productId);
    return res.json({ product });
}));
router.post("/products", authentication_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [user] = req.user["user"];
    const product = yield product_controller_1.createProduct(req, res, user);
    return res.json({ product });
}));
router.get("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_controller_1.getOrders();
    res.json({ orders });
}));
router.post("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield order_controller_1.createOrder(req);
    if (!product) {
        return res.status(404).json({ error: "Can,t add to cart" });
    }
    return res.json({ product });
}));
router.delete("/orders/:deleteId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteId } = req.params;
    const delete_order = yield order_controller_1.deleteOrders(deleteId);
    if (deleteId)
        return res.json({ delete_msg: "Deleted successfully!!!" });
}));
exports.default = router;
//# sourceMappingURL=products.js.map
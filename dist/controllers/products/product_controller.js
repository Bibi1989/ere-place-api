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
const pg_connect_1 = require("../../models/pg-connect");
const validations_1 = require("../../utils/validations");
exports.getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield pg_connect_1.db.query(pg_connect_1.sql `SELECT * FROM products`);
        return products;
    }
    catch (error) { }
});
exports.getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield pg_connect_1.db.query(pg_connect_1.sql `SELECT * FROM products WHERE id=${id}`);
        return product;
    }
    catch (error) { }
});
exports.createProduct = (req, res, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = user;
    const { title, category, category_type, description, price, location, stock, image_url, age_to, age_from, size, } = req.body;
    const error = validations_1.productsValidation(title, category, category_type, description, price, location);
    if (error.title)
        res.status(404).json({ error: error.title });
    if (error.category)
        res.status(404).json({ error: error.category });
    if (error.category_type)
        res.status(404).json({ error: error.category_type });
    if (error.description)
        res.status(404).json({ error: error.description });
    if (error.price)
        res.status(404).json({ error: error.price });
    if (error.location)
        res.status(404).json({ error: error.location });
    try {
        const [product] = yield pg_connect_1.db.query(pg_connect_1.sql `INSERT INTO products(title, category, category_type, description, price, location, image_url, stock, seller_id, age_to, age_from, size) VALUES(${title}, ${category}, ${category_type}, ${description}, ${price}, ${location}, ${image_url}, ${stock}, ${id}, ${age_to}, ${age_from}, ${size})`);
        return product;
    }
    catch (error) {
        return error.message;
    }
});
exports.deleteProduct = (deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pg_connect_1.db.query(pg_connect_1.sql `DELETE FROM products WHERE id=${deleteId}`);
    }
    catch (error) {
        return error.message;
    }
});
// export const updateProduct = async (req: any, res: any, user: RegisterInterface) => {
//   const { id } = user;
//   const {
//     title,
//     category,
//     category_type,
//     description,
//     price,
//     location,
//     stock,
//     image_url,
//     age_to,
//     age_from,
//     size
//   }: Products = req.body;
//   const error = productsValidation(
//     title,
//     category,
//     category_type,
//     description,
//     price,
//     location
//   );
//   if (error.title) res.status(404).json({ error: error.title });
//   if (error.category) res.status(404).json({ error: error.category });
//   if (error.category_type) res.status(404).json({ error: error.category_type });
//   if (error.description) res.status(404).json({ error: error.description });
//   if (error.price) res.status(404).json({ error: error.price });
//   if (error.location) res.status(404).json({ error: error.location });
//   const [product]: Products[] = await db.query(
//     sql`INSERT INTO products(title, category, category_type, description, price, location, image_url, stock, seller_id, age_to, age_from, size) VALUES(${title}, ${category}, ${category_type}, ${description}, ${price}, ${location}, ${image_url}, ${stock}, ${id}, ${age_to}, ${age_from}, ${size})`
//   );
// }
//# sourceMappingURL=product_controller.js.map
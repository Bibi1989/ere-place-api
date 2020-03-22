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
exports.createOrder = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, category_type, id, description, location, price, image_url, seller_id, size } = req.body;
    try {
        const [order] = yield pg_connect_1.db.query(pg_connect_1.sql `INSERT INTO orders(fashion_id, title, category, category_type, description, price, location, product_image, seller_id, size) VALUES(${id}, ${title}, ${category}, ${category_type}, ${description}, ${price}, ${location}, ${image_url}, ${seller_id}, ${size}) returning *`);
        return order;
    }
    catch (error) {
        return error.message;
    }
});
exports.getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield pg_connect_1.db.query(pg_connect_1.sql `SELECT * FROM orders`);
        return orders;
    }
    catch (error) {
        return error.message;
    }
});
exports.deleteOrders = (deleteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pg_connect_1.db.query(pg_connect_1.sql `DELETE FROM orders WHERE id = ${deleteId}`);
        return "Deleted Successfully!!!";
    }
    catch (error) {
        return error.message;
    }
});
//# sourceMappingURL=order_controller.js.map
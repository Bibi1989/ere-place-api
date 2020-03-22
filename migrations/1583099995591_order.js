/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("orders", {
    id: {
      type: "uuid",
      unique: true,
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "This is the id field"
    },
    title: {
      type: "VARCHAR(2000)"
    },
    category: {
      type: "VARCHAR(2000)"
    },
    category_type: {
      type: "VARCHAR(2000)"
    },
    fashion_id: {
      type: "VARCHAR(2000)"
    },
    description: {
      type: "TEXT"
    },
    price: {
      type: "VARCHAR(255)"
    },
    location: {
      type: "VARCHAR(255)"
    },
    product_image: {
      type: "VARCHAR(2000)"
    },
    size: {
      type: "VARCHAR(2000)"
    },
    quantity: {
      type: "VARCHAR(2000)",
      default: "1"
    },
    seller_id: {
      type: "VARCHAR(2000)"
    },
    createdAt: {
      type: "timestamptz(100)",
      nonNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("orders");
};

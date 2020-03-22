/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("images", {
    id: {
      type: "uuid",
      unique: true,
      primaryKey: true,
      default: pgm.func("uuid_generate_v4()"),
      comment: "This is the id field"
    },
    image_url: {
      type: "TEXT",
      nonNull: true
    },
    product_id: {
      type: "VARCHAR(1000)"
    },
    category: {
      type: "VARCHAR(1000)"
    },
    category_type: {
      type: "VARCHAR(1000)"
    },
    seller_id: {
      type: "VARCHAR(1000)"
    },
    product: {
      type: "uuid",
      references: '"products"',
      onDelete: "cascade"
    },
    createdAt: {
      type: "timestamptz(100)",
      nonNull: true,
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {
  pgm.dropTable("images");
};

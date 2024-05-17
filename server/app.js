const express = require('express');
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'shop.sqlite'
});

class Category extends Model {}
Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'Category' });

class Product extends Model {}
Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'Product' });

Product.belongsToMany(Category, { through: 'ProductCategories' });
Category.belongsToMany(Product, { through: 'ProductCategories' });

class Order extends Model {}
Order.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'Order' });

class OrderItem extends Model {}
OrderItem.init({
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { sequelize, modelName: 'OrderItem' });

Order.hasMany(OrderItem, { as: 'items' });
OrderItem.belongsTo(Order);

sequelize.sync();

app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.get('/categories', async (req, res) => {
  const categories = await Category.findAll();
  res.header('X-Total-Count', categories.length);
  res.json(categories);
});

app.post('/categories', async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

app.get('/categories/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  res.json(category);
});

app.put('/categories/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  category.update(req.body);
  res.json(category);
});

app.delete('/categories/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  category.destroy();
  res.json({ success: true });
});

app.get('/categories/:id/products', async (req, res) => {
  const products = await Product.findAll({
    include: {
      model: Category,
      where: { id: req.params.id }
    }
  });
  res.header('X-Total-Count', products.length);
  res.json(products);
});

app.get('/products/random', async (req, res) => {
  const products = await Product.findAll({
    order: sequelize.random(),
    limit: 12,
    include: Category
  });
  res.json(products);
});

app.get('/products', async (req, res) => {
  const products = await Product.findAll({ include: Category });
  res.header('X-Total-Count', products.length);
  res.json(products);
});

app.post('/products', upload.single('image'), async (req, res) => {
  const product = await Product.create({
    ...req.body,
    imageUrl: req.file.path
  });
  const categories = await Category.findAll({ where: { id: req.body.categoryIds } });
  await product.setCategories(categories);
  res.json(product);
});

app.post('/products/bulk', async (req, res) => {
  const productsData = req.body;
  const products = await Promise.all(productsData.map(async productData => {
    const product = await Product.create(productData);
    const categories = await Category.findAll({ where: { id: productData.categoryIds } });
    await product.setCategories(categories);
    return product;
  }));
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id, { include: Category });
  res.json(product);
});

app.put('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  product.update(req.body);
  const categories = await Category.findAll({ where: { id: req.body.categoryIds } });
  await product.setCategories(categories);
  res.json(product);
});

app.delete('/products/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  product.destroy();
  res.json({ success: true });
});

app.post('/products/multiple', async (req, res) => {
  const { ids } = req.body;
  const products = await Product.findAll({
    where: {
      id: ids.split(',').map(id => parseInt(id.trim()))
    },
    include: Category
  });
  res.json(products);
});

app.get('/orders', async (req, res) => {
  const orders = await Order.findAll({ include: { model: OrderItem, as: 'items' } });
  res.header('X-Total-Count', orders.length);
  res.json(orders);
});

app.post('/orders', async (req, res) => {
  const order = await Order.create(req.body, { include: { model: OrderItem, as: 'items' } });
  res.json(order);
});

app.get('/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id, { include: { model: OrderItem, as: 'items' } });
  res.json(order);
});

app.put('/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  order.update(req.body);
  res.json(order);
});

app.delete('/orders/:id', async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  order.destroy();
  res.json({ success: true });
});

app.get('/search', async (req, res) => {
  const { query } = req.query;
  const products = await Product.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ]
    },
    include: Category
  });
  res.json(products);
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

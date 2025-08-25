// src/data/products.js

import laptopImg from '../assets/laptop.png';
import smartphoneImg from '../assets/smartphone.png';
import headphonesImg from '../assets/headphones.png';
import keyboardImg from '../assets/keyboard.png';
import mouseImg from '../assets/mouse.png';
import chairImg from '../assets/chair.png';
import tableImg from '../assets/table.png';
import monitorImg from '../assets/monitor.png';
import printerImg from '../assets/printer.png';
import backpackImg from '../assets/backpack.png';

const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 50000,
    stock: true,
    category: 'Electronics',
    description: 'High-performance laptop',
    image: laptopImg
  },
  {
    id: 2,
    name: 'Smartphone',
    price: 20000,
    stock: true,
    category: 'Electronics',
    description: 'Latest smartphone model',
    image: smartphoneImg
  },
  {
    id: 3,
    name: 'Headphones',
    price: 2000,
    stock: false,
    category: 'Accessories',
    description: 'Noise-cancelling headphones',
    image: headphonesImg
  },
  {
    id: 4,
    name: 'Keyboard',
    price: 1500,
    stock: true,
    category: 'Accessories',
    description: 'Mechanical keyboard',
    image: keyboardImg
  },
  {
    id: 5,
    name: 'Mouse',
    price: 800,
    stock: true,
    category: 'Accessories',
    description: 'Wireless mouse',
    image: mouseImg
  },
  {
    id: 6,
    name: 'Chair',
    price: 4500,
    stock: true,
    category: 'Furniture',
    description: 'Ergonomic office chair',
    image: chairImg
  },
  {
    id: 7,
    name: 'Table',
    price: 7000,
    stock: true,
    category: 'Furniture',
    description: 'Study table with drawer',
    image: tableImg
  },
  {
    id: 8,
    name: 'Monitor',
    price: 12000,
    stock: false,
    category: 'Electronics',
    description: 'Full HD monitor',
    image: monitorImg
  },
  {
    id: 9,
    name: 'Printer',
    price: 8000,
    stock: true,
    category: 'Electronics',
    description: 'All-in-one printer',
    image: printerImg
  },
  {
    id: 10,
    name: 'BackPack',
    price: 1200,
    stock: true,
    category: 'Accessories',
    description: 'Durable backpack',
    image: backpackImg
  }
];

export default products;

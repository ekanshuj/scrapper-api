import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: './local.env' });

app.use(cors());
app.use(express.json());

const API = process.env.API_KEY;
const baseURL = `http://api.scraperapi.com?api_key=${API}&autoparse="true"`; // simple web scrapper api proxy

app.get('/', (req, res) => {
  res.send('Web Scrapper Application');
})

// Search for any product
app.get('/search-products/:query', async (req, res) => {
  const { query } = req.params;
  try {
    const response = await fetch(`${baseURL}&url=https://www.amazon.com/s?k=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err)
  }
})

// Get product details
app.get('/product-details/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await fetch(`${baseURL}&url=https://www.amazon.com/dp/${productId}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err)
  }
})

// Get product reviews
app.get('/product-reviews/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await fetch(`${baseURL}&url=https://www.amazon.com/product-reviews/${productId}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err)
  }
})

// Get product offers if any
app.get('/product-offers/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const response = await fetch(`${baseURL}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json(err)
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(PORT))

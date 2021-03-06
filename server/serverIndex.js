const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors());
const MAIN_PORT = 2200;

const getCategories = csvToObject('./data/categories.csv');
const getProducts = csvToObject('./data/products.csv');

const getData = Promise.all([getCategories, getProducts])
    .then(([categories, products]) => ({
        categories,
        products
    }));

function csvToObject(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        try {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results);
                });
        } catch (er) {
            reject(er);
        }
        
    });
    
}

app.get('/categories', (req, res) => {
    getData.then(({categories}) => {
        res.status(200).json(categories);
    });
});

app.get('/products', (req, res) => {
    getData.then(({products}) => {
        res.status(200).json(products);
    });
});

app.get('/', (req, res) => {
    getData.then((data) => {
        res.status(200).json(data);
    });
});

app.post('/product/new', (req, res) => {
    getData.then(({products}) => {
        const NEW_PRODUCT = {
            ...req.body,
            ID: Math.max(...products.map(({ID}) => ID)) + 1
        };
        products.push(NEW_PRODUCT);
        res.status(201).json(NEW_PRODUCT);
    });
});

app.delete('/product/:productId', (req, res) => {
    getData.then(({products}) => {
        const { productId } = req.params;
        const productIndexToDelete = products.findIndex(product => product.ID === productId);
        products.splice(productIndexToDelete, 1);
        res.status(204).json({});
    });
});

app.put('/product/:productId', (req, res) => {
    res.status(404).json({
        message: 'no time to implement the feature'
    });
});

app.listen(MAIN_PORT, () => {
    console.log(`opened on the port ${MAIN_PORT}`)
});
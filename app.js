const express = require('express'); //framework
const { randomUUID } = require('crypto'); // id gerado aleatoriamente
const fs = require('fs');
const app = express(); //inicializando a função express

app.use(express.json()); // criando conexão entre a req e o retorno

let products = [];

fs.readFile('products.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        products = JSON.parse(data)
    }
})

//POST - INSERE DADOS
app.post("/products", (req, res) => {

    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID()
    }
    products.push(product)

    productFile();
    return res.json(product)
});

//GET - CONSULTA DADOS
app.get("/products", (req, res) => {
    return res.json(products)
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === id)
    return res.json(product)
});

//PUT - ALTERA DADOS
app.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body

    const productIndex = products.findIndex(product => product.id === id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price,
    };
    productFile();
    return res.json({ message: "Produto alterado com sucesso" });
});

app.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id);

    products.splice(productIndex, 1)

    productFile();

    return res.json({ message: "Produto removido com sucesso!" })
});

function productFile() {
    fs.writeFile('products.json', JSON.stringify(products), (err) => {
        if (err)
            console.log(err);
    })
}
app.listen(4002, () => console.log('Server using express'))
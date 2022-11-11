import express from 'express';

const app = express()
const port = 3000

app.use('/', express.static('../app/'));

app.get('/', (request, response) => {
    // response.send('hi')
    response.render('index.html');
})

app.get('/card', (request, response) => {
    response.render('experimental.html');
    // response.render('../app/experiment.html')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
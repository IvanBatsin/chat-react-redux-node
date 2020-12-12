import express from 'express';
const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.listen(process.env.PORT || 5000, () => console.log('we on air'));
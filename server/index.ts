import express from 'express'; 
import cors from 'cors';
import api from './router/api';
import bodyParser, { urlencoded } from 'body-parser';

const PORT: number = 4000; 
const HOSTNAME= '127.0.0.1'
const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

app.use(api);
app.use(cors);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Application started http://${HOSTNAME}:${PORT}/`)
})
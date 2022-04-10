import express from 'express';

import { conf } from './config.js';
import { coordinateGenerator} from './controllers/coordinateGenerator.js';
const app = express();

//allow cores
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/', (req, res) => {

    if (! req.query || Object.keys(req.query).length === 0) {
      return res.status(400).send({
        message: 'Error, coordinates not received by server'
      });
    } 
    coordinateGenerator(req.query).then(newRandomCoordinates => {
      return res.send(newRandomCoordinates);
    });
    
});


app.listen(conf.port, () =>
  console.log(`Listening on port ${conf.port}!`),
);
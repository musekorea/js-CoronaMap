import 'dotenv/config';
import './db.js';
import './models/location.js';
import express from 'express';
import router from './src/routes/router.js';

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', router);
app.use('/upload', router);
app.listen(8080, () => {
  console.log(`💚 Server is listening on Port 8080 `);
});

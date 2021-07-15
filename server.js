import 'dotenv/config';
import './db.js';
import LocationModel from './models/location';
//import './models/location.js';
import express from 'express';
import router from './src/routes/router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', router);
app.use('/upload', router);

//========================DB===========================

router.post('/location', async (req, res, next) => {
  const { title, address, lat, lng } = req.body;
  try {
    let location = await new LocationModel({ title, address, lat, lng });
    await location.save();
    console.log(location);
    res.json({ message: `success` });
  } catch (error) {
    console.log(error);
    res.json({ message: `error` });
  }
});

//==============TEST CODE==============================
router
  .route('/test')
  .get((req, res, next) => {
    console.log(`Get Test OK`);
    res.json({ message: `Get Test OK` });
  })
  .post((req, res, next) => {
    const { test1, test2, test3 } = req.body;
    console.log(test1, test2, test3);
    res.json({ message: `Post Test OK` });
  });

app.listen(8080, () => {
  console.log(`💚 Server is listening on Port 8080 `);
});

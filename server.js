import express from 'express';
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen(8080, () => {
  console.log(`Server is listening on Port 8080`);
});

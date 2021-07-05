import mongoose from 'mongoose';

let db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});
db.once('open', () => {
  console.log(`Connected to Mongo Cluster`);
});

mongoose.connect(
  `mongodb+srv://musekorea:${process.env.DB_PASSWORD}@coronamap.7xu0d.mongodb.net/coronaMap?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

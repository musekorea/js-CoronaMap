import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const LocationModel = mongoose.model('Location', locationSchema);
export default LocationModel;

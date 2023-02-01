import { useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import Search from './Search';
import './App.css';

// https://developers.google.com/maps/documentation/javascript/url-params#required_parameters
const API_KEY = import.meta.env.VITE_API_KEY;
const loader = new Loader({
  apiKey: API_KEY,
  libraries: ['places'],
});

const isLoader = loader ? true : false;
console.log('loader', loader);

export default function App() {
  console.log('App is rendered!');
  const [isGooglePlacesLoaded, setIsGooglePlacesLoaded] =
    useState(isLoader);

  if (!isGooglePlacesLoaded) return;

  return (
    <div>{isGooglePlacesLoaded && <Search loader={loader} />}</div>
  );
}

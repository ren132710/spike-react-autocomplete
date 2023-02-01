import { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const mapsOptions = {
  //types: ['(cities)'],
  types: ['geocode'],
  //componentRestrictions: { country: 'us' },
  fields: ['name', 'geometry.location'],
};

function handlePlaceSelection(place) {
  console.log('place', place);
  const param = {
    id: uuidv4(),
    location: place.name,
    lat: place.geometry.location.lat(),
    long: place.geometry.location.lng(),
  };
  console.log('getWeather params', param);
}

export default function Search({ loader }) {
  console.log('App is rendered!');
  const autoCompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('useEffect is called!');
    if (!inputRef.current) return;

    loader.load().then((google) => {
      autoCompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        mapsOptions,
      );
      console.log('autoCompleteRef.current', autoCompleteRef.current);

      autoCompleteRef.current.addListener('place_changed', () => {
        const place = autoCompleteRef.current.getPlace();
        if (!place.geometry) return;
        handlePlaceSelection(place);
      });
    });

    return () => {
      console.log('unmount');
      autoCompleteRef.current = null;
    };
  }, []);

  // clear the input field with the user clicks away
  useEffect(() => {
    const clearInput = () => {
      inputRef.current.value = '';
    };
    window.addEventListener('click', clearInput);
    return () => window.removeEventListener('click', clearInput);
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Weather at your places"
        ref={inputRef}
        data-testid="place-search"
      />
    </div>
  );
}

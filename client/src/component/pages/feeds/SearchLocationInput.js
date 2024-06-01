import React, { useEffect, useRef, useState } from "react";



let autoComplete;

const loadScript = (url, callback) => {
  const script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const REACT_APP_GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const SearchLocationInput = ({ label, onPlaceSelected }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_KEY}&libraries=places`,
      () => handleScriptLoad()
    );
  }, []);

  const handleScriptLoad = () => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        componentRestrictions: { country: "IN" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      const address = place.formatted_address;
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setQuery(address);
      onPlaceSelected({ address, latLng });
    });
  };

  return (
    <div className="search-location-input mb-4">
      <p className="text-xl mt-4 font-bold">{label}</p>
      <input
        ref={autoCompleteRef}
        type="text"
        className="w-72 bg-white rounded-lg m-2 text-black p-3 border shadow-sm"
        placeholder={`Search ${label} ...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchLocationInput;

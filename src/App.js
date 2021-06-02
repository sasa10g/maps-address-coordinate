import { useEffect, useState } from "react";
import ReactExport from "react-data-export";
import "./App.css";

import gradovi from "./gradovi";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function App() {
  const [location, setLocation] = useState([]);

  var geocoder = new window.google.maps.Geocoder([]);
  gradovi.sort((a, b) => a.naziv.localeCompare(b.naziv));
  console.log("gradovi", gradovi.length);

  var i = 0;
  var j = 10;

  function onClick() {
    gradovi.slice(i, j).map((grad) => {
      return geocoder.geocode(
        { address: grad.naziv + ", Serbia" },
        function (results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            let lat = results[0].geometry.location.lat();
            let lng = results[0].geometry.location.lng();
            location.push({
              city: grad.naziv,
              latitude: lat,
              longitude: lng,
            });
            location.sort((a, b) => a.city.localeCompare(b.city));
            console.log(location);
          }
        }
      );
    });
    i = i + 10;
    j = j + 10;
  }

  // if (j <= 100) {
  //   setInterval(onClick, 10000);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => onClick()}> Dodaj 10</button>
        <ExcelFile filename="Couzic">
          <ExcelSheet data={location} name="Couzic">
            <ExcelColumn label="City" value="city" />
            <ExcelColumn label="Latitude" value="latitude" />
            <ExcelColumn label="Longitude" value="longitude" />
          </ExcelSheet>
        </ExcelFile>
      </header>
    </div>
  );
}

export default App;

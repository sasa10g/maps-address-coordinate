import { useState } from "react";
import ReactExport from "react-data-export";
import './App.css';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

function App() {
  const [location, setLocation] = useState([]);

  var geocoder = new window.google.maps.Geocoder([]);
  const locations = ["Beograd", "Novi Sad", "Sombor", "Kac"];

  locations.map((grad) => {
    return geocoder.geocode({ address: grad + ", Serbia" }, function (
      results,
      status
    ) {
      if (status === window.google.maps.GeocoderStatus.OK) {
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        location.push({ city: grad, latitude: lat, longitude: lng });
      }
      console.log(location);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <ExcelFile>
          <ExcelSheet data={location} name="Employees">
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

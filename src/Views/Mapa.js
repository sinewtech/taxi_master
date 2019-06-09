import React from "react";
import firebase from "../firebase.js"
import GoogleMapReact from "google-map-react";
import {FaMapMarker} from "react-icons/fa";

class Mapa extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      drivers: {},
      center: {lat: 14.0723, lng: -87.1921},
    };
  }

  componentDidMount = async()=>{
    await firebase
      .firestore()
      .collection("drivers")
      .get()
      .then(querysnapshot => {
        let drivers = {};
        querysnapshot.forEach(doc => {
          let data = doc.data();
          drivers[doc.id] = data;
        });
        this.setState({drivers});
      });
    await firebase
      .database()
      .ref()
      .child("/locations/")
      .on("value",async snap => {
        let drivers = this.state.drivers;
        let locations = snap.exportVal();
        Object.keys(locations).map(driver =>{
          if (locations[driver]) {
            drivers[driver]["position"] = locations[driver].position;
            drivers[driver]["status"] = locations[driver].status;
          }
          return 0;
        });
        await this.setState({drivers});
      });
  };

  update_center = (lat,lng) => {
    this.setState({center: {lat,lng}});
  }

  containPoints = points => {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;

    // init first point
    (point => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    // calculate rect
    points.map(point => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    //const deltaX = maxX - minX;
    //const deltaY = maxY - minY;

    return {
      lat: midX,
      lng: midY,
    };
  };

  render() {
    console.log("Conductores cargados",this.state.drivers);
    return(
      <div>
        <h1>hols :v</h1>
      </div>
    )
  }
}
export default Mapa;
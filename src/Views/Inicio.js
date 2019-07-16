import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormLabel,
  FormControl, 
} from "react-bootstrap";
import DatePicker from "react-datepicker"; 
import firebase from "firebase";

import "react-datepicker/dist/react-datepicker.css";

class Inicio extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataDate: new Date(Date.now() - 864e5),
      drivers: {},
      csv: "",
      reportName: "",
    }
  }

  componentDidMount = async () => {
    //Carga el formato standard por default
    await this.retrieveInfoMain();
  }
  
  loadDrivers = async () => {
    await firebase
    .firestore()
    .collection("drivers")
    .get()
    .then(async querysnapshot => {
      let newDrivers = {};
      querysnapshot.forEach(doc => {
        let data = doc.data();
        newDrivers[doc.id] = data;
      });
      await this.setState({ drivers: newDrivers });
    });
    console.log("Drivers loaded!");
  }
  
  retrieveInfoSub = async () => {
    let date = this.state.dataDate;
    let fileName = "Reporte Basico "+ date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ".csv";
    this.setState({reportName: fileName});
    let newCSV = "NOMBRE CONDUCTOR, NOMBRE CLIENTE, TELEFONO, ORIGEN, DESTINO, PRECIO, FECHA, UID, DEPARTAMENTO\n";
    console.log("Retrieving basic info...");
    console.log("Loading drivers...");
    
    await this.loadDrivers();
    
    await firebase
      .database()
      .ref()
      .child("/quotes/")
      .once("value", async snap =>{
        let quotes = snap.exportVal();
        Object.keys(quotes).map(quote => {
          let quoteData = quotes[quote];
          if(quoteData.timeStamps){
            let operatorDispatched = new Date(quoteData.timeStamps.operatorDispatched);
            let selectedDate = this.state.dataDate;
            
            if(selectedDate.getDay() === operatorDispatched.getDay() &&
              selectedDate.getMonth() === operatorDispatched.getMonth() &&
              selectedDate.getFullYear() === operatorDispatched.getFullYear()){
                newCSV+= this.state.drivers[quoteData.driver].firstName + " " + this.state.drivers[quoteData.driver].lastName +",";
                newCSV+= quoteData.userName + ",";
                newCSV+= quoteData.userPhone + ",";
                newCSV+= '"' + quoteData.origin.name + '",';
                newCSV+= '"' + quoteData.destination.name + '",';
                newCSV+= quoteData.price + ",";
                newCSV+= '"' + quoteData.timeStamps.operatorDispatched + '",';
                newCSV+= quote.substr(1) + ",";
                newCSV+= "FM\n";
            }//Fin del if de las fechas matching
          }//if quotes[quote].timeStamps
          return 0;
        })
        await this.setState({csv: newCSV});
        console.log("Info retrieved!");
      })

  }
  
  retrieveInfoMain = async () => {
    let date = this.state.dataDate;
    let fileName = "Reporte Standard "+ date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + ".csv";
    this.setState({reportName: fileName});
    
    let newCSV = "";    
    newCSV += "CODIGO CONDUCTOR, NOMBRE CONDUCTOR, CLIENTE, TELEFONO, ORIGEN, DESTINO, PRECIO(LPS.), METODO DE PAGO, FECHA, UID \n";
    
    console.log("Retrieving standard info...");
    console.log("Loading drivers...");
    
    await this.loadDrivers();
    
    await firebase
      .database()
      .ref()
      .child("/quotes/")
      .once("value", async snap =>{
        let quotes = snap.exportVal();
        Object.keys(quotes).map(quote => {
          let quoteData = quotes[quote];
          if(quoteData.timeStamps){
            let operatorDispatched = new Date(quoteData.timeStamps.operatorDispatched);
            let selectedDate = this.state.dataDate;
            
            if(selectedDate.getDay() === operatorDispatched.getDay() &&
              selectedDate.getMonth() === operatorDispatched.getMonth() &&
              selectedDate.getFullYear() === operatorDispatched.getFullYear()){
                let paymentMethod = "";
                quoteData === "CASH" ? paymentMethod = "Efectivo" : paymentMethod = "Tarjeta";
                
                newCSV+= this.state.drivers[quoteData.driver].username + ",";
                newCSV+= this.state.drivers[quoteData.driver].firstName + " " + this.state.drivers[quoteData.driver].lastName +",";
                newCSV+= quoteData.userName + ",";
                newCSV+= quoteData.userPhone + ",";
                newCSV+= '"' + quoteData.origin.name + '",';
                newCSV+= '"' + quoteData.destination.name + '",';
                newCSV+= quoteData.price + ",";
                newCSV+= paymentMethod + ",";
                newCSV+= '"' + quoteData.timeStamps.operatorDispatched + '",';
                newCSV+= quote.substr(1) + "\n";
            }//Fin del if de las fechas matching
          }//if quotes[quote].timeStamps
          return 0;
        })
        await this.setState({csv: newCSV});
        console.log("Info retrieved!");
      })
  }

  handleDateChange = newDate => {
    let yesterday = new Date(Date.now() - 864e5);
    if(newDate < yesterday){
      console.log("es menor papu");
      this.setState({
        dataDate: newDate,
      });
    }
  }

  render() {
    return (
      <div>
        <FormGroup>
          <FormLabel>Fecha para generar el Reporte</FormLabel>
          <hr/>
          <DatePicker
            selected = {this.state.dataDate}
            onChange = {this.handleDateChange}
          />
          <hr/>
          <FormLabel>Tipo de Reporte</FormLabel>
          <FormControl
            as="select"
            onChange={ event => {
              switch(event.target.value) {
                case "standard":
                  this.retrieveInfoMain();
                  break;
                case "basic":
                  this.retrieveInfoSub();
                  break;
                default:
                  // code block
              }
            }              
            }>
            <option value="standard">Standard</option>
            <option value="basic">Básico</option>
          </FormControl>
          <hr />
          <Button 
            onClick = {() => {
              const element = document.createElement("a");
              const file = new Blob([this.state.csv], {type: "text/plain;charset=utf-8"});
              element.href = URL.createObjectURL(file);
              element.download = this.state.reportName;
              document.body.appendChild(element);
              element.click();
            }
          }>Descargar Reporte (.csv)</Button>
          <hr/>        
        </FormGroup>
      </div>
    );
  }
}

export default Inicio;
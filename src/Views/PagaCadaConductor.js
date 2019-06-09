import React, { Component } from "react";
import {
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Table,
} from "reactstrap";
import firebase from "../firebase.js";
import { FaSearch } from "react-icons/fa";
import "../Styles/PagaCadaConductor.css";

class PagaCadaConductor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driversData: {},
      driversDataFiltered: {},
      searchQuery: "",
    };
  }

  queryHandler = event => {
    this.setState({ searchQuery: event.target.value });
  };

  getResult = event => {
    event.preventDefault();
    if (this.state.searchQuery !== "") {
      let driversDataFiltered = {};
      Object.keys(this.state.driversData).map(id => {
        if (this.state.driversData[id].name.toLowerCase().includes(this.state.searchQuery)) {
          driversDataFiltered[id] = this.state.driversData[id];
        }
        this.setState({ driversDataFiltered });
      });
    } else {
      this.setState({ driversDataFiltered: this.state.driversData });
    }
  };

  componentDidMount = async () => {
    let driversData = {};

    await firebase
      .firestore()
      .collection("drivers")
      .get()
      .then(drivers => {
        let docs = drivers.docs;
        docs.map(doc => {
          let filteredData = doc.data();
          delete filteredData.email;
          delete filteredData.lateralcar;
          delete filteredData.profile;
          delete filteredData.profilecar;
          delete filteredData.pushDevices;
          delete filteredData.placa;
          filteredData.paga = 0;
          driversData[doc.id] = filteredData;
          return 0;
        });

        this.setState({ driversData: driversData, driversDataFiltered: driversData });
      });

    await firebase
      .database()
      .ref()
      .child("quotes")
      .once("value", data => {
        let quotes = data.exportVal();
        console.log("Drivers data", driversData);
        console.log("Quotes", quotes);

        if (quotes)
          Object.keys(driversData).map(id => {
            Object.keys(quotes).map(qid => {
              if (quotes[qid].userUID === id) {
                console.log("este es mia");
              }
              return 0;
            });
            return 0;
          });
        return 0;
      });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.getResult}>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup>
                  <Input placeholder="Buscar por nombre" type="text" onChange={this.queryHandler} />
                  <InputGroupAddon addonType="prepend">
                    <Button type="submit">
                      <FaSearch />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Paga</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.driversDataFiltered).map(id => {
              return (
                <tr>
                  <th>{this.state.driversDataFiltered[id].username}</th>
                  <td>{this.state.driversDataFiltered[id].name}</td>
                  <td>{this.state.driversDataFiltered[id].phone}</td>
                  <td>{this.state.driversDataFiltered[id].paga.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default PagaCadaConductor;

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
import firebase from "firebase";
import { FaSearch } from "react-icons/fa";
import "../Styles/PagaCadaConductor.css";
class PagaCadaConductor extends Component {
  constructor(props) {
    super(props);
    this.state = { driversData: {} };
  }
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
        });
        this.setState({ driversData });
      });

    await firebase
      .database()
      .ref()
      .child("quotes")
      .once("value", data => {
        let quotes = data.exportVal();
        Object.keys(driversData).map(id => {
          Object.keys(quotes).map(qid => {
            if (quotes[qid].userUID === id) {
              console.log("este es mia");
            }
          });
        });
      });
  };
  render() {
    return (
      <Container>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <InputGroup>
                  <Input placeholder="Buscar" />
                  <InputGroupAddon addonType="prepend">
                    <Button>
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
            {Object.keys(this.state.driversData).map(id => {
              return (
                <tr>
                  <th>{this.state.driversData[id].username}</th>
                  <td>{this.state.driversData[id].name}</td>
                  <td>{this.state.driversData[id].phone}</td>
                  <td>L. {this.state.driversData[id].paga.toFixed(2)}</td>
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

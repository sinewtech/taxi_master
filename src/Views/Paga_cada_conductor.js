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
class Paga_cada_conductor extends Component {
  constructor(props) {
    super(props);
    this.state = { drivers_data: {} };
  }
  componentDidMount = async () => {
    let drivers_data = {};
    await firebase
      .firestore()
      .collection("drivers")
      .get()
      .then(drivers => {
        let docs = drivers.docs;
        docs.map(doc => {
          let filtered_data = doc.data();
          delete filtered_data.email;
          delete filtered_data.lateralcar;
          delete filtered_data.profile;
          delete filtered_data.profilecar;
          delete filtered_data.pushDevices;
          delete filtered_data.placa;
          filtered_data.paga = 0;
          drivers_data[doc.id] = filtered_data;
        });
        this.setState({ drivers_data });
      });

    await firebase
      .database()
      .ref()
      .child("quotes")
      .once("value", data => {
        let quotes = data.exportVal();
        Object.keys(drivers_data).map(id => {
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
                  <Input />
                  <InputGroupAddon addonType="prepend">
                    <Button>Buscar :v</Button>
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
            {Object.keys(this.state.drivers_data).map(id => {
              return (
                <tr>
                  <th>{id}</th>
                  <td>{this.state.drivers_data[id].name}</td>
                  <td>{this.state.drivers_data[id].phone}</td>
                  <td>L. {this.state.drivers_data[id].paga.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default Paga_cada_conductor;

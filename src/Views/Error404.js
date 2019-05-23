import React, { Component } from "react";
import { Jumbotron } from "reactstrap";
class Error404 extends Component {
  render() {
    return (
      <div style={{ justifyContent: "center", flex: 1 }}>
        <Jumbotron style={{ backgroundColor: "white", textAlign: "center" }}>
          <h1 className="display-3">Oops!</h1>
          <p className="lead">no parece que encontramos la pagina que estas buscando</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Error404;

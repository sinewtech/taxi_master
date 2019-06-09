import React from "react";
import { Popover, Overlay, Row, Container } from "react-bootstrap";
const colors = ["#f44336", "#4CAF50", "#FF9800"];
const estados = ["Fuera de trabajo", "Libre", "En carrera"];

class DriverMap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
    };
  }

  showPopover = ({target}) => {
    this.setState( s => ({target, show: !s.show}));
  };

  render(){
    return(
      <div
        onClick = {this.showPopover}
        style = {{
          //backgroundColor: "white",
          backgroundColor: colors[this.props.driver.status],
          borderRadius: "100%",
          boxShadow: "0 0 5px #0004",
          textAlign: "center",
          width: "40px",
          height: "40px",
          transform: "translate(-20px, -20px)",
          padding: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <p
          style={{
            fontSize: 20,
            fontFamily: "arial",
            fontWeight: "bold",
            //color: colors[this.props.driver.status],
            color: "white",
            marginTop: "auto",
            marginBottom: "auto",
          }}>
            {this.props.driver.username}
          </p>
          <Overlay
          show={this.state.show}
          target={this.state.target}
          placement="top"
          container={this}
          containerPadding={20}>
          <Popover id="popover-basic">
            <Container>
              <Row>
                <img
                  style={{ height: "100%", width: "100%" }}
                  alt={this.props.driver.name}
                  src={this.props.driver.profile}
                />
              </Row>
              <Row>
                <strong>{this.props.driver.name}</strong>
                <strong>{estados[this.props.driver.status]}</strong>
              </Row>
            </Container>
          </Popover>
        </Overlay>
      </div>
    );
  }
}

export default DriverMap;
import React from "react";
const colors = ["#f44336", "#4CAF50", "#FF9800"];
const estados = ["Fuera de trabajo", "Libre", "En carrera"];

class DriverMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showPopover = ({ target }) => {
    this.setState(s => ({ target, show: !s.show }));
  };

  render() {
    return (
      <div
        onClick={this.showPopover}
        style={{
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
          alignItems: "center",
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
      </div>
    );
  }
}

export default DriverMap;

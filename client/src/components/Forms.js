import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddAuthor from "./AddAuthor";
import AddBook from "./AddBook";

const Forms = () => {
 

  return (
    <Row>
      <Col>
        <AddBook />
      </Col>
      <Col>
        <AddAuthor />
      </Col>
    </Row>
  );
};

export default Forms;

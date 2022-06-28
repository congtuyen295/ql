import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookDetails from "./BookDetails";

import { useQuery } from "@apollo/client";
import { getBooks } from "../grapql-client/queries";

const BookList = () => {
  const [bookSelected, setBookSelected] = useState();
  const { loading, error, data } = useQuery(getBooks);
  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error....</p>;

  const handleSelectBook = (id) => {
    setBookSelected(id);
  };
  return (
    <Row>
      <Col xs={8}>
        <CardColumns>
          {data.books.map((b) => (
            <Card
              border="info"
              key={b.id}
              text="info"
              className="text-center shadow"
              onClick={handleSelectBook.bind(this, b.id)}
            >
              <Card.Body>{b?.name}</Card.Body>
            </Card>
          ))}
        </CardColumns>
      </Col>
      <Col>{bookSelected && <BookDetails bookId={bookSelected} />}</Col>
    </Row>
  );
};

export default BookList;

import React from "react";
import Card from "react-bootstrap/Card";
import { useQuery } from "@apollo/client";
import { getBook } from "../grapql-client/queries";

const BookDetails = ({ bookId }) => {
  const { loading, error, data } = useQuery(getBook, {
    variables: {
      id: bookId,
    },
    skip: bookId === null
  });

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error....</p>;
  const book = bookId !== null ? data.book : null;
  return (
    <>
      {book && (
        <Card bg="info" text="white" className="shadow">
          <Card.Body>
            <Card.Title>{book.name}</Card.Title>
            <Card.Subtitle>{book.genre}</Card.Subtitle>
            <p>{book.author.name}</p>
            <p>Age: {book.author.age}</p>
            <p>All books by this author</p>
            <ul>
              {book.author.book &&
                book.author.book.map((b) => <li>{b.name}</li>)}
            </ul>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default BookDetails;

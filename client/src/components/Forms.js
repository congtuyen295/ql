import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/client";
import { getAllAuthors } from "../grapql-client/queries";
import { createAuthor } from "../grapql-client/mutation";



const Forms = () => {

  const {loading,  error, data} = useQuery(getAllAuthors)
  const [addAuthor, dataMutation] = useMutation(createAuthor)

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error!</p>

  const handleAddAuthor = () => {
    addAuthor({
      variables: {
        name: "qq",
        age: 18
      },
      refetchQueries: [{query: getAllAuthors}]
    })
  }
  return (
    <Row>
      <Button className="float-right" variant="info" type="submit" onClick={handleAddAuthor}>
            Add author
          </Button>
      <Col>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Book name" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Book genre" />
          </Form.Group>
          <Form.Group>
            <Form.Control as="select" >
              {
                data?.authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)
              }
            </Form.Control>
          </Form.Group>
          <Button className="float-right" variant="info" type="submit" >
            Add Book
          </Button>
        </Form>
      </Col>

      <Col>
        <Form>
          <Form.Group className="invisible">
            <Form.Control />
          </Form.Group>
          <Form.Group>
            <Form.Control type="text" placeholder="Author name" />
          </Form.Group>
          <Form.Group>
            <Form.Control type="number" placeholder="Author age" />
          </Form.Group>
          <Button className="float-right" variant="info" type="submit">
            Add Author
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Forms;

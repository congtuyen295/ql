import { gql } from "@apollo/client";

const getBooks = gql`
  query getBooksQuery {
    books {
      name
      id
    }
  }
`;

const getBook = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

const getAllAuthors = gql`
  query getAllAuthors {
    authors {
      id
      name
    }
  }
`;

export { getBooks, getBook, getAllAuthors };

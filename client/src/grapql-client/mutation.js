import { gql } from "@apollo/client";

const createAuthor = gql`
  mutation createAuthor($name: String, $age: Int) {
    createAuthor(name: $name, age: $age) {
      id
      name
    }
  }
`;

export {createAuthor}

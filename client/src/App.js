import Container from "react-bootstrap/Container";
import BookList from "./components/BookList";
import Forms from "./components/Forms";
import "./App.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import FormComponent from "./check/FormComponent";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    // <ApolloProvider client={client}>
    //   <Container className="py-3 mt-3" style={{ backgroundColor: "lightcyan" }}>
    //     <h1 className="text-center text-info mb-3">My Books</h1>
    //     <hr />
    //     <Forms />
    //     <hr />
    //     <BookList />
    //   </Container>
    // </ApolloProvider>
    <>
      <div className="container">
        <FormComponent />
      </div>
    </>
  );
}

export default App;

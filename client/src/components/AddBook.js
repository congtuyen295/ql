import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Form, Select } from "antd";
import { getAllAuthors, getBooks } from "../grapql-client/queries";
import { createBook } from "../grapql-client/mutation";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "./Loading";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  genre: Yup.string().required("Required"),
  authorId: Yup.string().required("Required"),
});

const AddBook = () => {
  const { loading, error, data } = useQuery(getAllAuthors);
  const [
    addBook,
    { data: dataMutation, loading: loadingMutation, error: errorMutation },
  ] = useMutation(createBook);
  if (loading || loadingMutation) return <Loading />;
  if (error || errorMutation) return <p>Error ...</p>;
  const { authors } = data;
  console.log(dataMutation);
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          genre: "",
          authorId: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, handleReset) => {
          const { name, genre, authorId } = values;
          addBook({
            variables: {
              name,
              genre,
              authorId,
            },
            refetchQueries: [{query: getBooks}]
          });
          handleReset.resetForm();
        }}
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => (
          <>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="* Name">
                <Input
                  placeholder="Enter book's name..."
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name ? (
                  <div style={{ color: "#ff4d4f" }}>
                    {errors.name}
                    <br />
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="* Genre">
                <Input
                  placeholder="Enter book's genre..."
                  name="genre"
                  value={values.genre}
                  onChange={handleChange}
                />
                {errors.genre && touched.genre ? (
                  <div style={{ color: "#ff4d4f" }}>
                    {errors.genre}
                    <br />
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item label="* Name">
                <Select
                  name="authorId"
                  placeholder="--select--"
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => (values.authorId = e)}
                >
                  {authors.length > 0 &&
                    authors.map((auth) => (
                      <Select.Option key={auth.id} value={auth.id}>
                        {auth.name}
                      </Select.Option>
                    ))}
                </Select>
                {errors.authorId && touched.authorId ? (
                  <div style={{ color: "#ff4d4f" }}>{errors.authorId}</div>
                ) : null}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" onClick={handleSubmit}>
                  Add book
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddBook;

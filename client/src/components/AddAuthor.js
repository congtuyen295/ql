import React from "react";
import { useMutation } from "@apollo/client";
import { createAuthor } from "../grapql-client/mutation";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Button, Form } from "antd";
import { getAllAuthors } from "../grapql-client/queries";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  age: Yup.number().min(18, "Lớn hơn 18").required("Required"),
});

const AddAuthor = () => {
  const [addAuthor, dataMutation] = useMutation(createAuthor);
  if (dataMutation.loading) return <p>Loading ...</p>;
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          age: 18,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, handleReset) => {
          const { name, age } = values;
          handleReset.resetForm();
          addAuthor({
            variables: {
              name,
              age,
            },
            refetchQueries: [{query: getAllAuthors}]
          });
        }}
      >
        {({ errors, touched, values, handleChange, handleSubmit }) => (
          <>
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="* Name">
                <Input
                  placeholder="Enter name..."
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
              <Form.Item label="* Age">
                <Input
                  placeholder="Enter age..."
                  type="number"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                />
                {errors.age && touched.age ? (
                  <div style={{ color: "#ff4d4f" }}>
                    {errors.age}
                    <br />
                  </div>
                ) : null}
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" onClick={handleSubmit}>
                  Add author
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default AddAuthor;

import React from "react";
import { Button, Form, Input, Select } from "antd";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { FileAddOutlined } from "@ant-design/icons";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  file: Yup.object().nullable().required("file is required")
});

const FormComponent = () => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
    style: {
      padding: "20px",
      width: "100%",
    },
  };
  return (
    <Formik
      initialValues={{
        name: "aaa",
        gender: "male",
        bio: "",
        file: ""
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, handleReset) => {
        // same shape as initial values
        console.log(values);
        console.log(values.file);
        handleReset.resetForm();
      }}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form {...layout}>
          <Form.Item
            label="Name"
            wrapperCol={{
              offset: 0,
              span: 10,
            }}
          >
            <Input name="name" onChange={handleChange} value={values.name} />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
          </Form.Item>
          <Form.Item
            label="Gender"
            wrapperCol={{
              offset: 0,
              span: 10,
            }}
          >
            <Select
              name="gender"
              onChange={(e) => setFieldValue("gender", e)}
              value={values.gender}
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
            {errors.gender && touched.gender ? (
              <div>{errors.gender}</div>
            ) : null}
          </Form.Item>
          <Form.Item
            label="Bio"
            wrapperCol={{
              offset: 0,
              span: 12,
            }}
          >
            <Input.TextArea
              name="bio"
              onChange={handleChange}
              value={values.bio}
            />
          </Form.Item>
          <Form.Item label="Avatar">
            <Dropzone
              onDrop={(acceptedFiles) => setFieldValue("file", {...acceptedFiles[0]})}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div
                    style={{
                      width: "100%",
                      height: "150px",
                      border: "2px dotted #40d13c",
                    }}
                  >
                    {values.file ? (
                      <img width='100%' height='100%' src={URL.createObjectURL(values.file)} alt="" />
                    ) : null}
                  </div>
                </div>
              )}
            </Dropzone>
            {errors.file && touched.file ? <div>{errors.file}</div> : null}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 16,
              span: 8,
            }}
          >
            <Button onClick={handleSubmit}>Submit</Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;

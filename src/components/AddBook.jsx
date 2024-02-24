import React, { useState } from "react";
import { Alert, Button, DatePicker, Form, Input, InputNumber } from "antd";
import { collection, addDoc } from "firebase/firestore";
import Loading from "../Loading";
import { db } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

const AddBook = () => {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onFinish = async (values) => {
    console.log(" book to be added  :", values);
    const updatedValues = {
      ...values,
      id: uuidv4(),
    };

    try {
      setLoading(true);
      const booksCollection = collection(db, "books");
      const docRef = await addDoc(booksCollection, updatedValues);
      console.log("Book added with ID:", docRef.id);
      setAdded(true);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (added) {
  }

  if (successMessage) {
    return (
      <Alert
        message={successMessage}
        type="success"
        showIcon
        closable
        onClose={() => setSuccessMessage("")}
      />
    );
  }
  return (
    <div className="my-4 pt-4 ">
      {loading && <Loading />}
      <span className="text-slate-700 text-2xl pt-44">Add Book</span>
      <hr className="h-2 w-full bg-green-600 rounded-b-lg mb-5" />
      <div className="my-4 pt-4 sm:flex sm:justify-center sm:items-center min-h-screen w-full">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col text-center shadow-lg p-8 px-10 justify-center w-full"
        >
          <Form.Item
            label="Book Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input book title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: "Please input author!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Image URL" name="image">
            <Input />
          </Form.Item>

          <Form.Item label="Publication Date" name="date">
            <Input />
          </Form.Item>

          <Form.Item label="Overview" name="overview">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Number of Pages" name="num_of_pages">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Genre" name="genre">
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price">
            <Input />
          </Form.Item>

          <Form.Item label="Book Status" name="book_status">
            <Input />
          </Form.Item>

          <Form.Item label="Rating" name="rating">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Amount" name="amount">
            <InputNumber />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
            className="w-full flex sm:justify-start sm:justify-center"
          >
            <Button
              className="bg-green-600 text-slate-200 hover:text-slate-100 "
              htmlType="submit"
            >
              Add Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddBook;

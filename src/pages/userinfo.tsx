import { Col, Row, Card, Button, Form, Input, message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { User } from '../types/users';

function Userinfo() {
  const [messageApi, contextHolder] = message.useMessage();
  const [edit, setEdit] = useState<boolean>(false);
  const [userId] = useState(1);

  const [form] = Form.useForm();

  const fetchUser = useCallback(async () => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      form.setFieldsValue(response.data);
    } catch (error) {
      messageApi.error(`Error fetching user: ${error}`);
    }
  }, [userId, form, messageApi]);

  useEffect(() => {
    fetchUser();
  }, [userId, fetchUser]);

  const onClickBtn = () => {
    if (edit) {
      form.validateFields().then(async (values) => {
        try {
          await axios.put(`/api/users/${userId}`, {
            username: values.username,
            email: values.email,
            phone: values.phone,
          });
          fetchUser();
          setEdit(!edit);
          messageApi.success('User updated successfully');
        } catch (error) {
          messageApi.error(`Error updating user: ${error}`);
        }
      });
    } else {
      setEdit(!edit);
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" style={{ marginTop: 20 }}>
        <Col xs={22} sm={20} md={20} lg={10} xl={8}>
          <Card>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              style={{ maxWidth: 600 }}
              autoComplete="off"
              disabled={!edit}
              form={form}>
              <Form.Item<User>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>

              <Form.Item<User>
                label="Email"
                name="email"
                rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
                <Input />
              </Form.Item>

              <Form.Item<User>
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input your phone!' }]}>
                <Input />
              </Form.Item>
            </Form>

            <Row justify="center">
              <Button type={edit ? 'primary' : 'default'} onClick={onClickBtn}>
                {edit ? 'Submit' : 'Edit'}
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Userinfo;

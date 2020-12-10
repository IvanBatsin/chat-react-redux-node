import React from 'react';
import './auth.scss';
import { Button, WhiteBlock } from '../../components';
import { Form, Input  } from 'antd';
import { Link } from 'react-router-dom';

interface IAuth {
  email: string,
  password: string
}

export const Auth: React.FC = (): React.ReactElement => {
  const [data, setData] = React.useState<IAuth>({
    email: '',
    password: ''
  });

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleData = (name: string, value: string) => {;
    setData(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    });
  }

  const handleFormSubmit = async (): Promise<void> => {
    console.log(data);
    setData({email:'', password:''});
  }

  return (
    <section className="auth">
      <div className="auth_content">
        <div className="auth_top">
          <h2>Войти в аккаунт</h2>
          <p>Пожалуйста, войдите в свой аккаунт</p>
        </div>
        <WhiteBlock>
           <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleFormSubmit}
            style={{display:'flex', justifyContent:'center', flexDirection:'column'}}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, type: "string", min: 2, pattern: /^[^@]+@[^@]+\.[^@]+$/, whitespace: false, message: 'Почта введена некорректно' }]}
            >
              <Input defaultValue={data.email} autoFocus name='email' onChange={event => handleData(event.currentTarget.name, event.currentTarget.value)}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, min: 6, whitespace: false, message: 'Длина пароля от 6 символов' }]}
              style={{marginBottom:20}}
            >
              <Input.Password defaultValue={data.password} autoFocus name='password' onChange={event => handleData(event.currentTarget.name, event.currentTarget.value)}/>
            </Form.Item>
              <Button htmlType="submit" className="button_large">Войти в аккаунт</Button>
            <Link to="/auth/register" style={{marginTop:20}}>Зарегистрироваться</Link>
          </Form>
        </WhiteBlock>
      </div>
    </section>
  )
}
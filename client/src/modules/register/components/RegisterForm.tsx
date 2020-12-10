import React from 'react';
import { Button } from '../../../components';
import { RuleObject } from 'antd/lib/form';
import { Form, Input  } from 'antd';
import { Link } from 'react-router-dom';
import { IRegisterForm } from '../../../interfaces/index';

export const RegisterForm: React.FC = (): React.ReactElement => {
  const [data, setData] = React.useState<IRegisterForm>({
    userName: '',
    email: '', 
    fullName: '',
    password: '',
    password2: ''
  });

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  
  const tailLayout = {
    wrapperCol: { span: 23 },
  };

  const validatePassword = (_: RuleObject, value: string, callback: Function) => {
    if (value !== data.password){
      callback('Пароли несовпадают');
    } else {
      callback();
    }
  }

  const handleDataChange = (name: string, value: string): void => {
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (): Promise<void> => {
    console.log(data);
    setData({
      email: '',
      fullName: '',
      password: '',
      password2: '',
      userName: ''
    });
  }
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      style={{display:'flex', justifyContent:'center', flexDirection:'column'}}
    >
      <Form.Item
        label="Имя"
        name="fullName"
        rules={[{ required: true, type: "string", min: 2, whitespace: false, message: 'Имя введено некорректно' }]}
        >
        <Input 
          name="fullName"
          autoFocus 
          defaultValue={data.fullName} 
          onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
      </Form.Item>
      <Form.Item
        label="Логин"
        name="userName"
        rules={[{ required: true, type: "string", min: 2, whitespace: false, message: 'Логин введен некорректно' }]}
        >
        <Input 
          name="userName"
          defaultValue={data.userName} 
          onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, type: "string", min: 2, pattern: /^[^@]+@[^@]+\.[^@]+$/, whitespace: false, message: 'E-mail введена не корректно' }]}
      >
        <Input 
          name="email"
          defaultValue={data.email} 
          onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, min: 6, whitespace: false, message: 'Длина пароля от 6 символов' }]}
        style={{marginBottom:20}}
      >
        <Input.Password 
          name="password"
          defaultValue={data.password} 
          onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
      </Form.Item>
      <Form.Item
        {...tailLayout}
        name="password2"
        rules={[{ required: true, min: 6, whitespace: false, message: 'Длина пароля от 6 символов' }, {
          validator:validatePassword}]}
        style={{marginBottom:20}}
      >
        <Input.Password 
          name="password2"
          placeholder="Подтвердить пароль" 
          defaultValue={data.password2} 
          onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
      </Form.Item>
        <Button htmlType="submit" className="button_large">Войти в аккаунт</Button>
      <Link to="/auth" style={{marginTop:20}}>Войти в аккаунт</Link>
    </Form>
  )
}
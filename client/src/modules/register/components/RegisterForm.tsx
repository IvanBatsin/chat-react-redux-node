import React from 'react';
import { Button } from '../../../components';
import { RuleObject } from 'antd/lib/form';
import { Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import { IRegisterForm } from '../../../interfaces/index';
import { userApi, IRegisterUser } from '../../../API/fetchUser';
import { setUser } from '../../../store/ducks/user/actionCreators';
import { useDispatch } from 'react-redux';
import { InputComponent } from '../../../components/formField/Input';

export const RegisterForm: React.FC = (): React.ReactElement => {
  const [data, setData] = React.useState<IRegisterForm>({
    userName: '',
    email: '', 
    fullName: '',
    password: '',
    password2: ''
  });
  const [btnDisable, setBtnDisable] = React.useState<boolean>(false);
  const dispatch = useDispatch();

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
    setBtnDisable(true);
    const res: IRegisterUser = await userApi.register(data);

    if (res.status === 'success' && typeof res.data !== 'string') {
      dispatch(setUser(res.data));
    }

    if (res.status === 'error') {
      setBtnDisable(false);
      notification.error({
        message: res.status.toUpperCase(),
        description: res.data.toString()
      });
    }
  }
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      style={{display:'flex', justifyContent:'center', flexDirection:'column'}}
    >
      
      <InputComponent 
        handleDataChange={handleDataChange} 
        label={'Имя'} 
        name={'fullName'} 
        autoFocus={true} 
        value={data.fullName} 
        rules={[{ required: true, type: "string", min: 2, whitespace: false, message: 'Имя введено некорректно' }]} />

      <InputComponent 
        handleDataChange={handleDataChange} 
        label={'Логин'} 
        name={'userName'} 
        value={data.userName} 
        rules={[{ required: true, type: "string", min: 2, whitespace: false, message: 'Логин введен некорректно' }]} />

      <InputComponent 
        handleDataChange={handleDataChange} 
        label={'E-mail'} 
        name={'email'} 
        value={data.email} 
        rules={[{ required: true, type: "string", min: 2, pattern: /^[^@]+@[^@]+\.[^@]+$/, whitespace: false, message: 'E-mail введена не корректно' }]} />

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, min: 6, whitespace: false, message: 'Длина пароля от 6 символов' }]}
        style={{marginBottom:20}}
      >
        <Input.Password 
          name="password"
          value={data.password} 
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
          value={data.password2} 
          onChange={event => handleDataChange(event.currentTarget.name, event.currentTarget.value)}/>
      </Form.Item>
        <Button disable={btnDisable} htmlType="submit" className="button_large">Создать аккаунт</Button>
      <Link to="/auth/signin" style={{marginTop:20}}>Войти в аккаунт</Link>
    </Form>
  )
}
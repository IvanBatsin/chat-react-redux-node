import React from 'react';
import './signIn.scss';
import { Button, WhiteBlock } from '../../components';
import { Form, Input, notification } from 'antd';
import { Link } from 'react-router-dom';
import { userSignIn } from '../../store/ducks/user/actionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { InputComponent } from '../../components/formField/Input';
import { socket } from '../../core/socket';
import { colorPicker } from '../../helpers/colorPicker';
import { ISignInPayload } from '../../interfaces/forms';
import { selectUserLoadingState } from '../../store/ducks/user/selector';
import { LoadingState } from '../../interfaces/loadingState';

export const SignIn: React.FC = (): React.ReactElement => {
  const [btnDisable, setBtnDisable] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ISignInPayload>({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const loadingState = useSelector(selectUserLoadingState);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleData = (name: string, value: string): void => {
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleFormSubmit = async (): Promise<void> => {
    setBtnDisable(true);
    dispatch(userSignIn(data));
  }

  // React.useEffect(() => {
  //   if (loadingState === LoadingState.ERROR) {
  //     notification.info({
  //       message: 'Ошибка при входе'
  //     });
  //   }
  // }, [loadingState])

  // React.useEffect(() => {
  //   fetch('http://localhost')
  // }, []);

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
            <InputComponent
              handleDataChange={handleData}
              label={'E-mail'}
              name={'email'}
              value={data.email}
              autoFocus={true}
              rules={[{ required: true, type: "string", min: 2, pattern: /^[^@]+@[^@]+\.[^@]+$/, whitespace: false, message: 'Почта введена некорректно' }]}/>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, min: 6, whitespace: false, message: 'Длина пароля от 6 символов' }]}
              style={{marginBottom:20}}
            >
              <Input.Password value={data.password} name='password' onChange={event => handleData(event.currentTarget.name, event.currentTarget.value)}/>
            </Form.Item>
              <Button disable={btnDisable} htmlType="submit" className="button_large">Войти в аккаунт</Button>
            <Link to="/auth/signup" style={{marginTop:20}}>Зарегистрироваться</Link>
          </Form>
        </WhiteBlock>
      </div>
    </section>
  )
}
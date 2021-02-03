import React from 'react';
import './info.scss';
import Button from 'antd/lib/button/button';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/ducks/user/actionCreators';
import WhiteBlock from '../WhiteBlock/WhiteBlock';
import { Typography } from 'antd';
const { Title } = Typography

interface InfoProps {
  message: string,
  title: string
}

export const Info: React.FC<InfoProps> = ({message, title}: InfoProps) => {
  const dispatch = useDispatch();
  
  const handleReSignUp = async () => {
    dispatch(setUser(undefined));
  }

  return (
    <div className="info_container">
      <WhiteBlock className="info_container_block">
        <div className="info_container_block_image">
          <img alt="Caution" src="https://cdn2.iconfinder.com/data/icons/pictograms-vol-1/400/exclamation-256.png"></img>
          <Title level={2}>{title}</Title>
          <p>{message}</p>
        </div>
        <Button type="primary" onClick={handleReSignUp}>Назад</Button>
      </WhiteBlock>
    </div>
  )
}
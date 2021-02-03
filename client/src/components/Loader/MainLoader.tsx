import React from 'react';
import './loaders.scss';
import { Spin } from 'antd';

export const MainLoader: React.FC = () => {
  return (
    <div className="main_loader">
      <Spin size="large"/>
    </div>
  )
}
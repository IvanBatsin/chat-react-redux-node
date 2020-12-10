import React from 'react';
import './home.scss';
import { Chat } from '../../modules/';
import { SideBar } from '../../components';

export const Home: React.FC = (): React.ReactElement => {
  return (
    <section className="home">
      <SideBar></SideBar>
      <Chat></Chat>
    </section>
  )
}
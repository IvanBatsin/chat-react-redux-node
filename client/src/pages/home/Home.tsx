import React from 'react';
import './home.scss';
import { Chat } from '../../modules/';
import { SideBar } from '../../components';

let count = 0;

export const Home: React.FC = () => {
  console.log('home page render - ', ++count);
  return (
    <section className="home">
      <SideBar></SideBar>
      <Chat></Chat>
    </section>
  )
}
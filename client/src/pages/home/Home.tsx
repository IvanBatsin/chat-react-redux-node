import React from 'react';
import './home.scss';
import { Chat } from '../../modules/';
import { SideBar } from '../../components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserStateData } from '../../store/ducks/user/selector';

export const Home: React.FC = (): React.ReactElement => {
  const router = useHistory();
  const user = useSelector(selectUserStateData);

  // React.useEffect(() => {
  //   if (!user?.confirmed || !user) {
  //     router.push('/auth/signin');
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (!user?.confirmed || !user) {
  //     router.push('/auth/signin');
  //   }
  // }, [user]);
  return (
    <section className="home">
      <SideBar></SideBar>
      <Chat></Chat>
    </section>
  )
}
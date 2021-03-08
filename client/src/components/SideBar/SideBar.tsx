import React from 'react';
import './sidebar.scss';
import { Dialogs } from '../../modules/';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

let count = 0;

const SideBar: React.FC = (): React.ReactElement => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  console.log('sidebar render - ', ++count);

  const handleSearchValue = (event: React.FormEvent<HTMLInputElement>): void => {
    setSearchValue(event.currentTarget.value);
  }
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <span className="sidebar_top_users"><i className="fa fa-users" aria-hidden="true"></i> Список диалогов</span>
        <span className="sidebar_top_create"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></span>
      </div>
      <div className="sidebar_search">
        <Input 
          onChange={handleSearchValue} 
          defaultValue={searchValue} 
          className="search_input" 
          bordered={false} 
          prefix={<SearchOutlined/>} 
          placeholder="Поиск среди контактов"
        />
      </div>
      <Dialogs search={searchValue}></Dialogs>
    </div>
  )
}

export default SideBar;
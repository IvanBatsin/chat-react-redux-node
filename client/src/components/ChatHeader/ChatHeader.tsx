import React from 'react';
import { useSelector } from 'react-redux';
import { isOnline } from '../../helpers/isOnline';
import { selectPartnerObject } from '../../store/ducks/user/selector';
import { Dropdown } from '../ChatHeaderDropdown/Dropdown';

export const ChatHeader: React.FC = (): React.ReactElement => {
  const [dropdown, setDropdown] = React.useState<boolean>(false);
  const partner = useSelector(selectPartnerObject);

  const handleDropdown = () => {
    setDropdown(prevState => !prevState);
  }

  return (
    <>
      <div className="chat_header">
        <div onClick={handleDropdown} className="chat_header_options">
          <div className="options_round"></div>
          <div className="options_round"></div>
          <div className="options_round"></div>
        </div>

        {partner && 
          <>
            <span className="chat_header_user">{partner.fullName}</span>
            <div className="chat_header_info">
              <span className={`chat_header_info_status ${isOnline(partner.last_seen!) ? 'online' : 'out'}`}></span>{isOnline(partner.last_seen!) ? 'Онлайн' : 'Не в сети'}
            </div>
          </>
        }
      </div>
      {dropdown && <Dropdown/>}
    </>
  )
}
import React from 'react';
import './messageLoader.scss';

interface IMessageEmptyProps {
  src: string
}

export const MessageEmpty: React.FC<IMessageEmptyProps> = ({src}: IMessageEmptyProps): React.ReactElement => {
  return (
    <div className="loader">
      <img src={src} alt="Loader"></img>
    </div>
  )
}
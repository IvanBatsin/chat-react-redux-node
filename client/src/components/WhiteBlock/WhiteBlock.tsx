import React from 'react';
import './whiteBlock.scss';
import classNames from 'classnames';

interface IBlockProps {
  children: React.ReactNode,
  className?: string
}

const WhiteBlock: React.FC<IBlockProps> = ({children, className}: IBlockProps): React.ReactElement => {
  return (
    <div className={classNames('block', className)}>{children}</div>
  )
}

export default WhiteBlock;
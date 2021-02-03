import React from 'react';
import './button.scss';
import { Button,  } from 'antd';
import classNames from 'classnames';

interface IButtonProps {
  children: React.ReactNode,
  className?: string,
  type?: "primary" | "text" | "link" | "ghost" | "default" | "dashed" | undefined,
  htmlType?: "button" | "reset" | "submit",
  disable?: boolean
}

const ButtonComnponent: React.FC<IButtonProps> = ({children, className, type = 'primary', htmlType = 'button', disable = false}: IButtonProps) => {
  return (
  <Button disabled={disable} htmlType={htmlType} type={type} className={classNames(className)}>{children}</Button>
  )
}

export default ButtonComnponent;
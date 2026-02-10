import styles from './Button.module.scss'
import {type FC} from "react";
import * as React from "react";

type MyComponentProps = {
  className?: string;
  children: React.ReactNode;

}

const Button: FC<MyComponentProps> = (props) => {
  const {
    children,
    className = "",

  } = props


  return (
    <button className={`${styles.button} ${className}`}>{children}</button>
  )
}

export default Button
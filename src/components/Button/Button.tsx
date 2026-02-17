import styles from './Button.module.scss'
import * as React from "react";
import clsx from "clsx"

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

const Button = ({children, className, ...props}: ButtonProps) => {

  return (
    <button
      {...props}
      className={clsx(styles.button, className,)}
    >
      {children}
    </button>
  )
}

export default Button
import styles from './IconButton.module.scss'
import { type ReactNode } from 'react'

type IconButtonProps = {
  icon: ReactNode
  onClick?: () => void
  label: string  // для aria-label — доступность
  className?: string
}

const IconButton = ({ icon, onClick, label, className }: IconButtonProps) => {
  return (
    <button
      className={`${styles.iconButton} ${className ?? ''}`}
      onClick={onClick}
      aria-label={label}
    >
      {icon}
    </button>
  )
}

export default IconButton
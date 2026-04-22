import styles from './Header.module.scss'
import {Link} from "react-router-dom";

const Header = () => {
  return (
    <header className='container'>
      <div className={styles.header}>
        <Link to={'/'}>
          <span className={styles.logo}>What2Watch</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
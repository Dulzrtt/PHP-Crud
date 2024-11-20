import { Link } from "react-router-dom"
import styles from './NavBar.module.css'
import Logo from '../../assets/img/logo.png'

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <img src={Logo}></img>
        </div>
        <ul>
          <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to ="addTask">Criar Tarefa</Link>
            </li>
        </ul>
        
    </nav>
  )
}

export default NavBar
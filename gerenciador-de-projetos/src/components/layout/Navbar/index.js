import { Link } from 'react-router-dom'
import styles from "./navbar.module.css";
import Container from '../Container';


export default function Navbar() {
    return (
      <nav className={styles.navbar}>
        <Container>
          <Link to="/">
            <img className={styles.logotipo} src="https://img1.gratispng.com/20171220/rdw/gmail-logo-png-5a3a2279bae2a0.98815183151375935376557535.jpg" />
          </Link>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/" className="itemText">
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/contact" className="itemText">
                Contatos
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/company" className="itemText">
                Company
              </Link>
            </li>
            <li className={styles.item}>
              <Link to="/projects" className="itemText">
                Projetos
              </Link>
            </li>
          </ul>
        </Container>
      </nav>
    );
}
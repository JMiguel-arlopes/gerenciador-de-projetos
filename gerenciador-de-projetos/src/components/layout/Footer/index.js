import styles from './footer.module.css'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

export default function Footer() {
    return (
      <footer>
        <ul className={styles.logosList}>
          <li className={styles.logo}>
            <FaFacebook />
          </li>
          <li className={styles.logo}>
            <FaInstagram />
          </li>
          <li className={styles.logo}>
            <FaLinkedin />
          </li>
        </ul>
        <p className={styles.copyright}>
          <span>CBZ</span> &copy; 2023
        </p>
      </footer>
    );
}
import { Link } from "react-router-dom"
import styles from './buttonlink.module.css'

export default function ButtonLink(props) {
    const {text, to} = props;

    return (
        <Link className={styles.btn} to={to}>{text}</Link>
    )
}
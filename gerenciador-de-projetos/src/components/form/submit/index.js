import styles from './submit.module.css';

export default function Submit(props) {
    const {text} = props

    return (
        <input 
            className={styles.btn}
            type='submit' 
            value={text}
        />
    )
}
import styles from './input.module.css';

export default function Input(props) {
    const {type, text, name, placeholder, handleOnChange, value} = props;

    return (
        <div className={styles.input_container}>
            <label htmlFor={name}>{text}</label>
            <input 
                type={type} 
                id={name} 
                name={name}
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value}
            />
        </div>
    )
}
import styles from './select.module.css'

export default function Select(props) {

    const {text, name, options, handleOnChange, value } = props
    return (
        <div className={styles.selections}>
            <label>{text}</label>
            <select 
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}
            >
                {options.map(option => (
                    <option value={option.id} key={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
        
    )
}
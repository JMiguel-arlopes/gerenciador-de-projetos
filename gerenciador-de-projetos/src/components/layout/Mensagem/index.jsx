import { useEffect, useState } from 'react'
import styles from './mensagem.module.css'

export default function Mensagem(props){

    const {msg, type, toggleNotification} = props
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        if(!msg) {
            setVisible(false)
            return
        }
        setVisible(true)
        const timer = setTimeout(() => {
            if(toggleNotification) {
                toggleNotification()
            }
            // setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${styles.message} ${styles[type]}`}>
                    <p>{msg}</p>
                </div>
            )}
        </>
    )
}
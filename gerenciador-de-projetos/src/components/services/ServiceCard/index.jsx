import styles from '../../project/CardProject/cardproject.module.css'
import {BsFillTrashFill } from 'react-icons/bs'

export default function ServiceCard(props) {
    const {nameService, costService, descriptionService, idService, handleRemove} = props

    function remove(e) {
        e.preventDefault()
        handleRemove(idService, costService)
    }

    return (
        <div className={styles.container_card}>
            <h2>{nameService}</h2>
            <p><span>Custo Total:</span>  {costService}</p>
            <p>{descriptionService}</p>
            <div className={styles.category_row}>
                <button onClick={remove}>
                    <BsFillTrashFill/>
                    Excluir
                </button>
            </div>
        </div>
    )
}
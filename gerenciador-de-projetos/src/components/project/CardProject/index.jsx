import { Link } from 'react-router-dom'
import styles from './cardproject.module.css'
import {BsPencil, BsFillTrashFill } from 'react-icons/bs'


export default function CardProject(props) {

    const {id, name, total, category, handleRemove} = props

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.container_card}>
            <h2>{name}</h2>
            <p>
                <span>Orçamento: </span> 
                {total}R$
            </p>
            <p className={styles.card_text}>
                <span className={styles[category.toLowerCase()]}></span>
                {category}
            </p>
            <div className={styles.category_row}>
                <Link to={`/projects/${id}`}><BsPencil/> Editar</Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>

        </div>
    )
}
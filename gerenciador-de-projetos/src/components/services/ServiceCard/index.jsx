import styles from './serviceCard.module.css'

export default function ServiceCard(props) {
    console.log(props)
    const {nameService, costService, descriptionService, serviceId} = props

    return (
        <div>
            <p>Nome do serviço: {nameService}</p>
            <p>Custo do serviço: {costService}</p>
            <p>Descrição do serviço: {descriptionService}</p>
        </div>
    )
}
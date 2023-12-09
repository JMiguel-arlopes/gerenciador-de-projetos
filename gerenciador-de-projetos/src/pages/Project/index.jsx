import Container from "../../components/layout/Container"
import Loading from '../../components/layout/Loading'
import ProjectForm from '../../components/project/ProjectForm'
import Mensagem from '../../components/layout/Mensagem'
import ServicesForm from '../../components/services/ServicesForm'
import ServiceCard from "../../components/services/ServiceCard"
import styles from './project.module.css'

import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

export default function Project() {
    const [project, setProject] = useState({})
    const [services, setServices] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showServicesForm, setShowServicesForm] = useState(false)
    const [showMessageError, setShowMessageError] = useState(false)
    const [messageCostServiceError, setMessageCostServiceError] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            setProject(data)
            setServices(data.services)
        })
    }, [])

    function editPost(newProject) {
        // o handleSubmit vai passar o novo projeto como parametro da função efetuado no ProjectForm  
        // e vai revelar sua atualização para cá
        setShowMessageError(false)  

        if(project.total < project.cost) {
            setMessageCostServiceError(false)
            setShowMessageError(true)
            return 
        } 

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        }).then(resp => resp.json())
        .then(data => {
            setProject(data)
            setShowForm(false)
        })
    }

    function createService(newProject) {
        setMessageCostServiceError(false)
        const lastService = newProject.services[newProject.services.length - 1]

        lastService.id = uuidv4()
        
        const lastServiceCost = lastService.costService

        const newCost = parseFloat(newProject.cost) + parseFloat(lastServiceCost)

        // verificação do valor maximo:
        if(newCost > parseFloat(project.total)) {
            setShowMessageError(true)
            setMessageCostServiceError(true)
            newProject.services.pop()
            return false
        }

        // atualizar custo total
        newProject.cost = newCost

        // atualizar tarefa no banco de dados
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProject)
        })
        .then(resp => resp.json())
        .then(() => {
            setProject(newProject)
            setShowServicesForm(false)
        })
        .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        const newServices = project.services.filter(
            (service) => service.id !== id
        )
        
        const newProject = project
        newProject.services = newServices
        newProject.cost = parseFloat(newProject.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${newProject.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newProject)
        })
        .then(resp => resp.json())
        .then((data) => {
            // console.log(data)
            setProject(newProject)
            setServices(newServices)
        })
        .catch(err => console.log(err))
    }

    function toggleNotificationError() {
        setShowMessageError(!showMessageError)
    }

    function toggleForm() {
        setShowForm(!showForm)
    }

    function toggleServicesForm() {
        setShowServicesForm(!showServicesForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container >
                        {showMessageError && (
                            <Mensagem 
                                msg={messageCostServiceError 
                                    ? 'Orçamento ultrapassado, verifique o preço dos serviços'
                                    : 'O custo está maior que o orçamento'
                                }
                                type='error'
                                toggleNotification={toggleNotificationError}
                            />
                        )}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button onClick={toggleForm} className={styles.btn}>
                                {!showForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do orçamento:</span> {project.total}
                                    </p>
                                    <p>
                                        <span>Custo total:</span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        btnText='atualizar'
                                        projectData={project}
                                        handleSubmit={editPost}
                                    />
                                </div>
                                
                            )}
                        </div>
                        <div className={styles.details_container}>
                            <h2>Adicione um serviço:</h2>
                            <button onClick={toggleServicesForm} className={styles.btn}>
                                {!showServicesForm ? 'Adicionar serviços' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServicesForm && (
                                    <ServicesForm 
                                        btnText="Inserir serviço"
                                        handleSubmit={createService}
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços:</h2>
                        <Container direction='start'>
                            {services.length > 0 && (
                                services.map(service => {
                                    return (
                                        <ServiceCard
                                            key={service.id}
                                            nameService={service.nameService}
                                            costService={service.costService}
                                            descriptionService={service.descriptionService}
                                            idService={service.id}
                                            handleRemove={removeService}
                                        />

                                    )
                                })
                            )}
                            {services.length === 0 && <p>Não há serviços</p>}
                        </Container>
                    </Container>
                </div>
            ) : <Loading/>}
        </>
    )
    
}
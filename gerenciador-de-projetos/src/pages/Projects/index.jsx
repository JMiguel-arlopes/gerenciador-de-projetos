import Mensagem from '../../components/layout/Mensagem'
import styles from './projects.module.css'
import ButtonLink from '../../components/layout/ButtonLink'
import Container from '../../components/layout/Container'
import { useEffect, useState } from 'react'
import CardProject from '../../components/project/CardProject'
import Loading from '../../components/layout/Loading'

export default function Projects() {

    const [projects, setProjects] = useState([])
    const [removeNotification, setRemoveNotification] = useState(false)

    function toggleRemoveNotification() {
        setRemoveNotification(!removeNotification)
    }

    // function toggleCreateNotification() {
    //     setCreateNotification(!createNotification)
    // }

    useEffect(() => {
        setTimeout(()=> {
            fetch("http://localhost:5000/projects", {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(resp => resp.json())
            .then(data => {
                setProjects(data)
            }).catch(err => console.log(err))
        }, 300)
    }, [])
    

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(() => {
            setRemoveNotification(true)
            setProjects(projects.filter(project => project.id !== id))
        }).catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <ButtonLink to='/newproject' text='criar projeto'/>
            </div>

            <Mensagem msg='Projeto criado com sucesso' type='sucess'/>

            {removeNotification && (
                <Mensagem 
                    msg='Projeto deletado'
                    type='sucess'
                    toggleNotification={toggleRemoveNotification}
                />
            )}

            <Container direction="start">
                {projects.length > 0 
                    ? projects.map(item => {
                        return (
                            <CardProject
                                id={item.id}
                                name={item.name}
                                total={item.total}
                                category={item.category.name}
                                handleRemove={removeProject}
                            />
                        )
                    })
                    : <Loading />}
            </Container>
        </div>
    )
}
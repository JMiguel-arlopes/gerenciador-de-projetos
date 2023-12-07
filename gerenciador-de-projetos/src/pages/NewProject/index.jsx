import { useState } from 'react';
import ProjectForm from '../../components/project/ProjectForm';
import styles from './newproject.module.css'
import { useNavigate } from 'react-router-dom';

export default function NewProject() {

  let navigate = useNavigate();

  function createProject(project) {
    project.cost = 0
    project.services = []

    fetch("http://localhost:5000/projects", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(resp => resp.json())
      .then(() => {
        // """uma ideia:""" Aqui você cria um useContext para todas as rotas saberem que foi criado um 
        // novo projeto, eai você consegue controlar quando a notificação deve ser lançada
        navigate('/projects')
      })
      .catch(err => console.log(err))
  }

  return (
    <section className={styles.container_newproject}>
      <h2>Criar Projeto</h2>
      <p>Crie seus projetos para botar serviços</p>
      <ProjectForm 
        handleSubmit={createProject}
        btnText='Criar projeto'
      />
    </section>
  );
}

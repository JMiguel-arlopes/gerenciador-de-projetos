import { useEffect, useState } from "react";
import Input from "../../form/Input";
import Select from "../../form/select";
import Submit from "../../form/submit";
import styles from "./projectform.module.css";

export default function ProjectForm(props) {
  
    const {btnText, handleSubmit, projectData} = props

    const [categories, setCategories] = useState([])
    // vc não usa o "ProjectData" inicialmente no primeiro formulário, mas depois você usa na parte de edição do projeto
    const [project, setProject] = useState(projectData || {})

   
    useEffect(() => {
      fetch('http://localhost:5000/categories', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then((resp) => resp.json())
      .then((data) => setCategories(data))
    }, [])
    
    function submit(e) {
      e.preventDefault()
      handleSubmit(project)
    }

    function handleChange(e) {
      // ele ta fazendo uma cópia do project anterior, aí se tiver um [e.target.name] já registrado
      // ele substitui o valor, porém se o [e.target.name] não existir, ele cria.
      // ex: [e.target.name] == 'name' ? então substitui : então cria um novo
      setProject({...project, [e.target.name] : e.target.value})
    }


    function handleCategory(e) {
      // ele ta fazendo uma cópia do project anterior, se tiver um 'category' já registrado no objeto,
      // ele substitui o valor, porém se o 'category' não existir, ele cria.
      // na aplicação real, nesse caso, o valor está sendo um objeto. os valores desses itens entram em relação
      // ex: category ? então substitui o valor : então cria um novo
      setProject({...project, category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text
      }})
    }

    return (
      <form className={styles.projectForm} onSubmit={submit}>
        <Input
          type="text"
          name="name"
          text="Nome do Projeto:"
          placeholder="insira o nome do projeto"
          // ta passando o 'handleChange' e colocando no evento de 'onChange' do input.
          // A cada caractere inserido, aciona o evento, fazendo e setState agir e substituir o valor antigo pelo novo
          handleOnChange={handleChange}
          value={project.name ? project.name : ''}
        />
        <Input
          type="number"
          name="total"
          text="Orçamento do projeto:"
          placeholder="Insira o orçamento total"
          // ta passando o 'handleChange' e colocando no evento de 'onChange' do input. ou seja:
          // A cada caractere inserido, aciona o evento, fazendo e setState agir e substituir o valor antigo pelo novo
          handleOnChange={handleChange}
          value={project.total ? project.total : ''}
        />
        <Select 
          text="Selecione a categoria"
          name="category_id" 
          options={categories} 
          // ta passando o 'handleCategory' e colocando no evento de 'onChange' do Select. ou seja:
          // A cada mudança nas options, aciona o evento, fazendo e setState agir e substituir o valor antigo pelo novo.

          // Mesmo que o value do <select> seja uma string vazia, se o usuário selecionar "Opção 2", então e.target.value 
          // dentro da função handleCategory será "2", que é o valor da opção selecionada.
          // Em resumo, o e.target.value pega o valor da opção selecionada, independentemente do value definido no <select>.
          //  Se o usuário selecionar uma opção, o valor dessa opção será utilizado, mesmo que o value do <select>
          //  seja uma string vazia.
          handleOnChange={handleCategory}
          value={project.category ? project.category.id : ''}
        />
        <Submit text={btnText} />
      </form>
    );
}
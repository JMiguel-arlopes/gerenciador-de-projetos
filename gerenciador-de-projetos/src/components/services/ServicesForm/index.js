import { useState } from "react";
import Input from "../../form/Input";
import styles from "./servicesForm.module.css";
import Submit from "../../form/submit";

export default function ServicesForm(props) {
  const { handleSubmit, btnText, projectData } = props;
  const [service, setService] = useState({});

  function submit(e) {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  }

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  return (
    <form className={styles.servicesForm} onSubmit={submit}>
      <Input
        type="text"
        text="Nome do serviço"
        name="nameService"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
        value={undefined}
      />

      <Input
        type="number"
        text="Custo do serviço"
        name="costService"
        placeholder="Insira o custo do serviço"
        handleOnChange={handleChange}
        value={undefined}
      />

      <Input
        type="text"
        text="Descrição do serviço"
        name="descriptionService"
        placeholder="Insira uma descrição"
        handleOnChange={handleChange}
        value={undefined}
      />

      <Submit text={btnText} />
    </form>
  );
}

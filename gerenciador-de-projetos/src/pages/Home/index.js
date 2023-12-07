import styles from './home.module.css'
import ButtonLink from '../../components/layout/ButtonLink'

export default function Home() {
  return (
    <section className={styles.section}>
      <h1>
        Bem vindo ao <span>CBZ</span>
      </h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      <ButtonLink to='/newproject' text='Criar projeto'/>
      <img
        src="https://img.freepik.com/vetores-gratis/ilustracao-de-bandeira-brasil_53876-27017.jpg?w=2000"
      />
    </section>
  );
}
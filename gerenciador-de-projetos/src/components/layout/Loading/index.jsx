import Container from '../Container'
import styles from './loading.module.css'

export default function Loading() {
    return (
        <Container direction={'center'}>
            <div className={styles.loader}/>
        </Container>
        
    )
}
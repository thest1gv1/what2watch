import styles from './Home.module.scss';
import MoviesSwiper from "../components/MoviesSwiper/MoviesSwiper.tsx";
import Button from "../components/Button/Button.tsx";

const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInfo}>
        <h1>Не знаешь что <br /> посмотреть<br /> сегодня?</h1>
        <p>Ответь на несколько вопросов — получи идеальное кино за 30 секунд</p>
      </div>
      <MoviesSwiper />
      <Button className={styles.buttonHome}>Найди свой фильм</Button>
    </section>
  )
}

export default Home
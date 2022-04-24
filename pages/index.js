import Head from 'next/head'
import styles from "../styles/Home.module.css"
import Board from '../components/board'


const Home = () => {
   return (
     <div className={styles.container}>
      <Head>
        <title>Tic Tac Toe</title>
      </Head>

      <main className={styles.main}>
          <Board />
      </main>
    </div>
   )
}

export default Home

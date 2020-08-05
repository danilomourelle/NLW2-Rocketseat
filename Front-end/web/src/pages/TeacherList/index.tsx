import React from 'react'
import PageHeader from '../../components/PageHeader'

import whatsapp from '../../assets/images/icons/whatsapp.svg'
import './styles.css'

function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject"/>
          </div>

          <div className="input-block">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="text" id="week_day"/>
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time"/>
          </div>
        </form>
      </PageHeader>

      <main>
        <article className="teacher-item">
          <header>
            <img src="https://avatars1.githubusercontent.com/u/59848875?s=460&u=47f31197624ea195a858abc5eed72f6ddc8ba11f&v=4" alt="Danilo Mourelle"/>
            <div>
              <strong>Danilo Mourelle</strong>
              <span>Física</span>
            </div>
          </header>
          <p>
          Subtitulo
          <br /><br />
          Web Fullstack Developer using React in Front-end and NodeJs in Back-end. I've already worked with industrial robots programming and studied Alzheimer Disease.
          </p>

          <footer>
            <p>
              Preço/hora 
              <strong>R$ 75,00</strong>
            </p>
            <button type="button">
              <img src={whatsapp} alt="Entrar em contato"/>
              Entrar em contato
            </button>
          </footer>
        </article>
      </main>

    </div>
  )
}

export default TeacherList
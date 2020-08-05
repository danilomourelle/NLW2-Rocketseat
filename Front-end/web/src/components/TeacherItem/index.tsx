import React from 'react'

import whatsapp from '../../assets/images/icons/whatsapp.svg'

import './styles.css'


function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars1.githubusercontent.com/u/59848875?s=460&u=47f31197624ea195a858abc5eed72f6ddc8ba11f&v=4" alt="Danilo Mourelle" />
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
          <img src={whatsapp} alt="Entrar em contato" />
              Entrar em contato
            </button>
      </footer>
    </article>
  )
}

export default TeacherItem
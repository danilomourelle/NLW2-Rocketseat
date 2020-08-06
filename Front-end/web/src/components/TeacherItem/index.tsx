import React from 'react'

import whatsapp from '../../assets/images/icons/whatsapp.svg'
import api from '../../services/api'

import './styles.css'

export interface Teacher {
  id: number,
  avatar: string,
  bio: string,
  cost: number,
  name: string,
  subject: string,
  whatsapp: string,
  user_id: string
}

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {

  const createNewConnection = () => {
    api.post('connections', {
      user_id: teacher.user_id
    })
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
              <strong>{`R$ ${teacher.cost}`}</strong>
        </p>
        <a
          target="_blank"
          href={`https://wa.me/${teacher.whatsapp}`}
          onClick={createNewConnection}
        >
          <img src={whatsapp} alt="Entrar em contato" />
              Entrar em contato
            </a>
      </footer>
    </article>
  )
}

export default TeacherItem
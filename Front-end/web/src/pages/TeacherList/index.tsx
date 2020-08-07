import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import Input from '../../components/Inputs'
import Select from '../../components/Select'

import api from '../../services/api'

import './styles.css'


function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const searchTeacher = async (e: FormEvent) => {
    e.preventDefault();

    const response = await api.get<{classes:Teacher[]}>('classes', {
      params: {
        subject,
        week_day: weekday,
        time
      }
    })
    setTeachers(response.data.classes)
  }

  console.log(teachers)
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis">
        <form id="search-teachers" onSubmit={searchTeacher} >
          <Select
            name="subject"
            value={subject}
            onChange={(e) => { setSubject(e.target.value) }}
            label="Matéria"
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Física', label: 'Física' },
              { value: 'Química', label: 'Química' },
              { value: 'História', label: 'História' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Literatura', label: 'Literatura' },
              { value: 'Inglês', label: 'Inglês' },
            ]}
          />
          <Select
            name="week_day"
            value={weekday}
            onChange={(e) => { setWeekday(e.target.value) }}
            label="Dia da Semana"
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            name="time"
            type="time"
            value={time}
            onChange={(e) => { setTime(e.target.value) }}
            label="Hora"
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {
          teachers.map((teacher) => (
            <TeacherItem key={teacher.id} teacher={teacher} />
          ))
        }
      </main>

    </div>
  )
}

export default TeacherList
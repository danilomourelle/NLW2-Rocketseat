import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Inputs';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';
import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 7, from: "", to: "" }
  ]);

  const addNewScheduleItem = () => {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 7, from: "", to: "" }
    ])
  }

  const setScheduleItemValue = (position: number, field: string, value: string | number) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      } else {
        return scheduleItem
      }
    })

    setScheduleItems(updatedScheduleItems)
  }

  const handleCreateClass = (e: FormEvent) => {
    e.preventDefault()

    api.post('classes', {
      name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule: scheduleItems
    }).then(() => {
      alert("Cadastro realizado com sucesso")
      history.push('/')
    }).catch(() => {
      alert("Erro no cadastro")
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aula"
        description="O primeiro passo é preencher o formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              name="name"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
              label="Nome Completo"
            />
            <Input
              name="avatar"
              value={avatar}
              onChange={(e) => { setAvatar(e.target.value) }}
              label="Avatar" />
            <Input
              name="whatsapp"
              value={whatsapp}
              onChange={(e) => { setWhatsapp(e.target.value) }}
              label="Whatsapp" />
            <Textarea
              name="bio"
              value={bio}
              onChange={(e) => { setBio(e.target.value) }}
              label="Biografia" />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input
              name="cost"
              value={cost}
              onChange={(e) => { setCost(e.target.value) }}
              label="Custo da sua hora/aula"
            />
          </fieldset>

          <fieldset>
            <div>
              <span>Horários disponíveis</span>
              <button type="button" onClick={addNewScheduleItem}>
                + Novo Horário
              </button>
            </div>

            {
              scheduleItems.map((scheduleItem, index) => (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    value={scheduleItem.week_day}
                    onChange={(e) => { setScheduleItemValue(index, e.target.name, Number(e.target.value)) }}
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
                    name="from"
                    value={scheduleItem.from}
                    onChange={(e) => { setScheduleItemValue(index, e.target.name, e.target.value) }}
                    label="Das"
                    type="time" />
                  <Input
                    name="to"
                    value={scheduleItem.to}
                    onChange={(e) => { setScheduleItemValue(index, e.target.name, e.target.value) }}
                    label="Até"
                    type="time" />
                </div>
              ))
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type="submit">
              Salvar cadastro
            </button>
          </footer>
        </form>
      </main>

    </div>

  )
}

export default TeacherForm
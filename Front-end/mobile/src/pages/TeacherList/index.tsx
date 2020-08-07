import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import api from '../../services/api';
import styles from './styles'


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

function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const [subject, setSubject] = useState('')
  const [weekday, setWeekday] = useState('')
  const [time, setTime] = useState('')

  useFocusEffect(() => {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const teachersFavorite = JSON.parse(res) as Teacher[]
        const teachersFavoriteId = teachersFavorite.map(teacher => {
          return teacher.id
        })
        setFavorites(teachersFavoriteId)
      }
    })
  })

  const handleToggleFilterVisible = () => {
    setIsFilterVisible(!isFilterVisible)
  }

  const handleFiltersSubmit = async () => {
    const response = await api.get<{ classes: Teacher[] }>('classes', {
      params: {
        subject,
        week_day: weekday,
        time
      }
    })

    setTeachers(response.data.classes)
    setIsFilterVisible(false)
  }

  return (
    <View style={styles.container}>
      <Header
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        )}
      >
        {
          isFilterVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={text => setSubject(text)}
                placeholder="Qual a matéria"
                placeholderTextColor="#C1BCCC"
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    style={styles.input}
                    value={weekday}
                    onChangeText={text => setWeekday(text)}
                    placeholder="Dia da semana"
                    placeholderTextColor="#C1BCCC"
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    value={time}
                    onChangeText={text => setTime(text)}
                    placeholder="Horas"
                    placeholderTextColor="#C1BCCC"
                  />
                </View>
              </View>

              <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          )
        }
      </Header>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {
          teachers.map(teacher => (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorite={favorites.includes(teacher.id)}
            />
          ))
        }

      </ScrollView>
    </View>
  )
}

export default TeacherList;

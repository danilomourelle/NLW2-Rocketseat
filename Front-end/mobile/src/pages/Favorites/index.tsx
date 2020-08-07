import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';
import { Teacher } from '../TeacherList';

import styles from './styles'


function Favorites() {
  const [favorites, setFavorites] = useState<Teacher[]>([])


  useFocusEffect(() => {
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const teachersFavorite = JSON.parse(res) as Teacher[]

        setFavorites(teachersFavorite)
      }
    })
  })

  return (
    <View style={styles.container}>
      <Header title="Meus Proffys favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {
          favorites.map(teacher => (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorite
            />
          ))
        }

      </ScrollView>
    </View>
  )
}

export default Favorites;

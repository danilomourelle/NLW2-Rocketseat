import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

import { Teacher } from '../../pages/TeacherList';
import heartOutline from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcons from '../../assets/images/icons/whatsapp.png';

import styles from './styles'
import api from '../../services/api';

interface TeacherItemProps {
  teacher: Teacher,
  favorite: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite)

  const handleLinkToWhatsapp = () => {
    api.post('connections', {
      user_id: teacher.user_id
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  const handleToggleFavorite = async () => {
    const favorites = await AsyncStorage.getItem('favorites')
    let favoriteArray: Teacher[] = []
    if (favorites) {
      favoriteArray = JSON.parse(favorites)
    }

    if (isFavorite) {
      favoriteArray = favoriteArray.filter(teacherInList => {
        return teacherInList.id !== teacher.id
      })

      setIsFavorite(false)
    } else {
      favoriteArray.push(teacher)

      setIsFavorite(true)
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteArray))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}> {teacher.name} </Text>
          <Text style={styles.subject}> {teacher.subject} </Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>{`R$ ${teacher.cost}`}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[
              styles.favoriteButton,
              isFavorite && styles.favorite]}
            onPress={handleToggleFavorite}
          >
            {
              isFavorite
                ? <Image source={unfavoriteIcon} />
                : <Image source={heartOutline} />
            }
          </RectButton>

          <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
            <Image source={whatsappIcons} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}

export default TeacherItem
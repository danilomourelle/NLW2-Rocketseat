import React from 'react';
import { View } from 'react-native';

import styles from './styles'
import Header from '../../components/Header';


function Favorites() {
  return (
    <View style={styles.container}>
      <Header title="Meus Proffys favoritos" />
    </View>
  )
}

export default Favorites;

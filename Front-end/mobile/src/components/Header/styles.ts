import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#8257E5',
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 24,
    maxWidth: 160,
    marginTop: 16,
    marginBottom: 50,
  }
})

export default styles
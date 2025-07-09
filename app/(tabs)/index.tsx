import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import TableHour from '@/components/TableHour';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D80' }}
      headerImage={
        <Image
          source={require('@/assets/images/aluno.png')}
          style={styles.reactLogo}
        />
      }>
        
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem vindo!</ThemedText>
        <HelloWave />
      </ThemedView>
  
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">📚 Texto de boas-vindas:</ThemedText>
        <ThemedText>
          {`É uma alegria receber você em mais um ano de descobertas, crescimento e aprendizado. Aqui, cada dia é uma nova oportunidade de construir conhecimentos, fazer amizades e sonhar com um futuro brilhante. Estamos juntos nessa jornada! 💙 `}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Grade de Horários</ThemedText>
        <TableHour />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    top: 50,
    height: 220,
    width: 190,
    bottom: 0,
    left: -20,
    position: 'absolute',
  },
});

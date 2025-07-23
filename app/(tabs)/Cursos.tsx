import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, SafeAreaView } from 'react-native';
import CursoModal from '../../components/CursoModal';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type Curso = {
  id: number;
  nome: string;
};

export default function CursosScreen() {
  
  const [cursos, setCursos] = useState<Curso[]>([
    { id: 1, nome: 'Engenharia de Software' },
    { id: 2, nome: 'Direito' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const adicionarCurso = (nome: string) => {
    const novoCurso: Curso = {
      id: Date.now(),
      nome,
    };
    setCursos([...cursos, novoCurso]);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/diploma.png')}
          style={styles.reactLogo}
        />
      }>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <Text style={styles.title}>Lista de Cursos</Text>
        </ThemedText>
        <ThemedView style={styles.stepContainer}>
          <FlatList
              data={cursos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <Text style={styles.item}>{item.nome}</Text>}
            />
        </ThemedView>
      </ThemedView>
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Curso" onPress={() => setModalVisible(true)} />
      </View>


      <CursoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={adicionarCurso}
      />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    top: 60,
    height: 190,
    width: 190,
    left: -10,
    position: 'absolute',
  },
});

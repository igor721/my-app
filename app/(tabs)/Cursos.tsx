import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, SafeAreaView } from 'react-native';
import CursoModal from '../../components/CursoModal';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

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
        <IconSymbol   //verificar esse componente para alteração de icone na barra
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      
      <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Cursos</Text>
      <FlatList
        data={cursos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.nome}</Text>}
      />

      <View style={styles.buttonContainer}>
        <Button title="Adicionar Curso" onPress={() => setModalVisible(true)} />
      </View>

      <CursoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreate={adicionarCurso}
      />
    </SafeAreaView>
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
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
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
});

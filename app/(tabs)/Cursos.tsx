import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Pressable, Alert } from 'react-native';
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
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  const adicionarCurso = (nome: string) => {
    const novoCurso: Curso = { id: Date.now(), nome };
    setCursos([...cursos, novoCurso]);
  };

  const editarCurso = (id: number, nome: string) => {
    const cursosAtualizados = cursos.map(curso =>
      curso.id === id ? { ...curso, nome } : curso
    );
    setCursos(cursosAtualizados);
  };

  const deletarCurso = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja realmente excluir este curso?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setCursos(cursos.filter(curso => curso.id !== id)),
      },
    ]);
  };

  const abrirModalParaEditar = (curso: Curso) => {
    setCursoSelecionado(curso);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setCursoSelecionado(null);
    setModalVisible(false);
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
            renderItem={({ item }) => (
              <Pressable onPress={() => abrirModalParaEditar(item)}>
                <Text style={styles.item}>{item.nome}</Text>
              </Pressable>
            )}
          />
        </ThemedView>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Curso"
          onPress={() => {
            setCursoSelecionado(null); // limpar curso selecionado para criar novo
            setModalVisible(true);
          }}
        />
      </View>

      <CursoModal
        visible={modalVisible}
        onClose={fecharModal}
        onCreate={adicionarCurso}
        onEdit={editarCurso}
        onDelete={deletarCurso}
        curso={cursoSelecionado}
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
    color: '#ffffff',
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

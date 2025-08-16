import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisciplinaModal from '@/components/DisciplinaModal';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type Disciplina = {
  id: number;
  nome: string;
};

const STORAGE_KEY = 'disciplinas_salvas';

export default function DisciplinasScreen() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<Disciplina | null>(null);

  // carregar disciplinas salvas
  useEffect(() => {
    const carregar = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setDisciplinas(JSON.parse(json));
        }
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
      }
    };
    carregar();
  }, []);

  // salvar sempre que mudar
  useEffect(() => {
    const salvar = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(disciplinas));
      } catch (error) {
        console.error('Erro ao salvar disciplinas:', error);
      }
    };
    salvar();
  }, [disciplinas]);

  const adicionarDisciplina = (nome: string) => {
    const nova: Disciplina = { id: Date.now(), nome };
    setDisciplinas([...disciplinas, nova]);
  };

  const editarDisciplina = (id: number, nome: string) => {
    const atualizadas = disciplinas.map((d) =>
      d.id === id ? { ...d, nome } : d
    );
    setDisciplinas(atualizadas);
  };

  const deletarDisciplina = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja realmente excluir esta disciplina?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () =>
          setDisciplinas(disciplinas.filter((d) => d.id !== id)),
      },
    ]);
  };

  const abrirModalParaEditar = (disciplina: Disciplina) => {
    setDisciplinaSelecionada(disciplina);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setDisciplinaSelecionada(null);
    setModalVisible(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/educacao.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <Text style={styles.title}>Lista de Disciplinas</Text>
        </ThemedText>

        <ThemedView style={styles.stepContainer}>
          <View>
            {disciplinas.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => abrirModalParaEditar(item)}
              >
                <Text style={styles.item}>{item.nome}</Text>
              </Pressable>
            ))}
          </View>
        </ThemedView>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Disciplina"
          onPress={() => {
            setDisciplinaSelecionada(null);
            setModalVisible(true);
          }}
        />
      </View>

      <DisciplinaModal
        visible={modalVisible}
        onClose={fecharModal}
        onCreate={adicionarDisciplina}
        onEdit={editarDisciplina}
        onDelete={deletarDisciplina}
        disciplina={disciplinaSelecionada}
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

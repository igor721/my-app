import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import DisciplinaScreenDetalhe from '../screens/DisciplinaScreen';

type Disciplina = {
  id: number;
  nome: string;
};

const STORAGE_KEY = 'disciplinas_salvas';

export default function DisciplinasScreen() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [telaDetalhe, setTelaDetalhe] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<Disciplina | null>(null);

  // carregar disciplinas salvas
  useEffect(() => {
    const carregar = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setDisciplinas(JSON.parse(json));
      } catch (err) {
        console.error(err);
      }
    };
    carregar();
  }, []);

  // salvar ao mudar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(disciplinas)).catch(console.error);
  }, [disciplinas]);

  const adicionarDisciplina = (nome: string) => {
    const nova: Disciplina = { id: Date.now(), nome };
    setDisciplinas([...disciplinas, nova]);
  };

  const editarDisciplina = (id: number, nome: string) => {
    setDisciplinas(disciplinas.map(d => (d.id === id ? { ...d, nome } : d)));
  };

  const deletarDisciplina = (id: number) => {
    setDisciplinas(disciplinas.filter(d => d.id !== id));
  };

  if (telaDetalhe) {
    return (
      <DisciplinaScreenDetalhe
        disciplina={disciplinaSelecionada}
        onClose={() => {
          setTelaDetalhe(false);
          setDisciplinaSelecionada(null);
        }}
        onCreate={adicionarDisciplina}
        onEdit={editarDisciplina}
        onDelete={deletarDisciplina}
      />
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={require('@/assets/images/educacao.png')} style={styles.reactLogo} />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <Text style={styles.title}>Lista de Disciplinas</Text>
        </ThemedText>

        <ThemedView style={styles.stepContainer}>
          <View>
            {disciplinas.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setDisciplinaSelecionada(item);
                  setTelaDetalhe(true);
                }}
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
            setTelaDetalhe(true);
          }}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: {
    fontSize: 18,
    paddingVertical: 8,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    color: '#fff',
  },
  buttonContainer: { marginTop: 20 },
  stepContainer: { gap: 8, marginBottom: 8 },
  reactLogo: {
    top: 60,
    height: 190,
    width: 190,
    left: -10,
    position: 'absolute',
  },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import CursoScreenDetalhe from '../screens/CursoScreen';

type Curso = {
  id: number;
  nome: string;
};

const STORAGE_KEY = 'cursos_salvos';

export default function CursosScreen() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [telaDetalhe, setTelaDetalhe] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState<Curso | null>(null);

  // carregar cursos salvos
  useEffect(() => {
    const carregar = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setCursos(JSON.parse(json));
      } catch (err) {
        console.error(err);
      }
    };
    carregar();
  }, []);

  // salvar ao mudar
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cursos)).catch(console.error);
  }, [cursos]);

  const adicionarCurso = (nome: string) => {
    const novo: Curso = { id: Date.now(), nome };
    setCursos([...cursos, novo]);
  };

  const editarCurso = (id: number, nome: string) => {
    setCursos(cursos.map(c => (c.id === id ? { ...c, nome } : c)));
  };

  const deletarCurso = (id: number) => {
    setCursos(cursos.filter(c => c.id !== id));
  };

  // renderiza a tela de detalhe caso aberta
  if (telaDetalhe) {
    return (
      <CursoScreenDetalhe
        curso={cursoSelecionado}
        onClose={() => {
          setTelaDetalhe(false);
          setCursoSelecionado(null);
        }}
        onCreate={adicionarCurso}
        onEdit={editarCurso}
        onDelete={deletarCurso}
      />
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image source={require('@/assets/images/diploma.png')} style={styles.reactLogo} />
      }
    >
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <Text style={styles.title}>Lista de Cursos</Text>
        </ThemedText>

        <ThemedView style={styles.stepContainer}>
          <View>
            {cursos.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setCursoSelecionado(item);
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
          title="Adicionar Curso"
          onPress={() => {
            setCursoSelecionado(null);
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

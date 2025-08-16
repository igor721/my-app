import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Curso = {
  id: number;
  nome: string;
};

const storage_key = 'cursos_salvos';

export default function CursoFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [nome, setNome] = useState('');
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [idCurso, setIdCurso] = useState<number | null>(null);

  // Carrega os cursos ao iniciar
  useEffect(() => {
    const carregarCursos = async () => {
      try {
        const json = await AsyncStorage.getItem(storage_key);
        if (json) {
          setCursos(JSON.parse(json));
        }
      } catch (error) {
        console.error('Erro ao carregar cursos:', error);
      }
    };

    carregarCursos();

    // Verifica se há parâmetros de edição
    if (params.id && params.nome) {
      setIdCurso(Number(params.id));
      setNome(params.nome as string);
    }
  }, [params]);

  const salvarCursosENavegar = async (novosCursos: Curso[]) => {
    try {
      // Atualiza o estado local
      setCursos(novosCursos);
      
      // Persiste no AsyncStorage
      await AsyncStorage.setItem(storage_key, JSON.stringify(novosCursos));
      
      // Navega de volta após a persistência estar completa
      router.back();
    } catch (error) {
      console.error('Erro ao salvar cursos:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações');
    }
  };

  const editarCurso = async (id: number, nome: string) => {
    const cursosAtualizados = cursos.map(curso =>
      curso.id === id ? { ...curso, nome } : curso
    );
    await salvarCursosENavegar(cursosAtualizados);
  };

  const deletarCurso = async (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja realmente excluir este curso?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          const cursosAtualizados = cursos.filter(curso => curso.id !== id);
          await salvarCursosENavegar(cursosAtualizados);
        },
      },
    ]);
  };

  const handleSalvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome do curso não pode estar vazio');
      return;
    }

    if (idCurso) {
      await editarCurso(idCurso, nome);
    } else {
      const novoCurso = { id: Date.now(), nome };
      await salvarCursosENavegar([...cursos, novoCurso]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {idCurso ? 'Editar Curso' : 'Adicionar Curso'}
      </Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do curso"
        placeholderTextColor="#999"
      />

      <View style={styles.buttonContainer}>
        <Button
          title={idCurso ? "Salvar Alterações" : "Adicionar Curso"}
          onPress={handleSalvar}
          color="#4CAF50"
        />
      </View>

      {idCurso && (
        <View style={styles.buttonContainer}>
          <Button
            title="Excluir Curso"
            onPress={() => deletarCurso(idCurso)}
            color="#ff4444"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  input: {
    height: 50,
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    color: '#ffffff',
    backgroundColor: '#333',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
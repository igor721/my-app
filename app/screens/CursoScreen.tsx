import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Curso = {
  id: number;
  nome: string;
};

const STORAGE_KEY = 'cursos_salvos';

type Props = {
  curso: Curso | null;
  onClose: () => void;
  onCreate: (nome: string) => void;
  onEdit: (id: number, nome: string) => void;
  onDelete: (id: number) => void;
};

export default function CursoScreenDetalhe({ curso, onClose, onCreate, onEdit, onDelete }: Props) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (curso) {
      setNome(curso.nome);
    } else {
      setNome('');
    }
  }, [curso]);

  const handleSalvar = () => {
    if (nome.trim() === '') return;

    if (curso) {
      onEdit(curso.id, nome);
    } else {
      onCreate(nome);
    }
    onClose();
  };

  const handleExcluir = () => {
    if (curso) {
      Alert.alert('Excluir curso', 'Deseja realmente excluir este curso?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => { onDelete(curso.id); onClose(); } }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{curso ? 'Editar Curso' : 'Adicionar Curso'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do curso"
        value={nome}
        onChangeText={setNome}
      />
      <View style={styles.buttons}>
        <Button title="Cancelar" color="#888" onPress={onClose} />
        <Button title={curso ? 'Salvar' : 'Adicionar'} onPress={handleSalvar} />
      </View>
      {curso && (
        <View style={styles.deleteButton}>
          <Button title="Excluir" color="#D11A2A" onPress={handleExcluir} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  deleteButton: { marginTop: 10 },
});

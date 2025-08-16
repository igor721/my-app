import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

type Disciplina = {
  id: number;
  nome: string;
};

type Props = {
  disciplina: Disciplina | null;
  onClose: () => void;
  onCreate: (nome: string) => void;
  onEdit: (id: number, nome: string) => void;
  onDelete: (id: number) => void;
};

export default function DisciplinaScreenDetalhe({ disciplina, onClose, onCreate, onEdit, onDelete }: Props) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (disciplina) {
      setNome(disciplina.nome);
    } else {
      setNome('');
    }
  }, [disciplina]);

  const handleSalvar = () => {
    if (nome.trim() === '') return;

    if (disciplina) {
      onEdit(disciplina.id, nome);
    } else {
      onCreate(nome);
    }
    onClose();
  };

  const handleExcluir = () => {
    if (disciplina) {
      Alert.alert('Excluir disciplina', 'Deseja realmente excluir esta disciplina?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => { onDelete(disciplina.id); onClose(); } }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{disciplina ? 'Editar Disciplina' : 'Adicionar Disciplina'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da disciplina"
        value={nome}
        onChangeText={setNome}
      />
      <View style={styles.buttons}>
        <Button title="Cancelar" color="#888" onPress={onClose} />
        <Button title={disciplina ? 'Salvar' : 'Adicionar'} onPress={handleSalvar} />
      </View>
      {disciplina && (
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
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 16, color: '#fff'},
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  deleteButton: { marginTop: 10 }, 
});

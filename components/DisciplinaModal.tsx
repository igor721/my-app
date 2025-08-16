import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Disciplina = {
  id: number;
  nome: string;
};

type DisciplinaModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (nome: string) => void;
  onEdit: (id: number, nome: string) => void;
  onDelete: (id: number) => void;
  disciplina: Disciplina | null;
};

export default function DisciplinaModal({
  visible,
  onClose,
  onCreate,
  onEdit,
  onDelete,
  disciplina,
}: DisciplinaModalProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (disciplina) {
      setNome(disciplina.nome);
    } else {
      setNome('');
    }
  }, [disciplina, visible]);

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
      onDelete(disciplina.id);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {disciplina ? 'Editar Disciplina' : 'Adicionar Disciplina'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da disciplina"
            value={nome}
            onChangeText={setNome}
          />
          <View style={styles.buttonGroup}>
            <Button title="Cancelar" onPress={onClose} color="#888" />
            <Button
              title={disciplina ? 'Salvar' : 'Adicionar'}
              onPress={handleSalvar}
            />
          </View>

          {disciplina && (
            <View style={styles.deleteButton}>
              <Button title="Excluir" color="#D11A2A" onPress={handleExcluir} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  deleteButton: {
    marginTop: 16,
  },
});

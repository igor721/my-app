import React, { useEffect, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Curso = {
  id: number;
  nome: string;
};

type CursoModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (nome: string) => void;
  onEdit: (id: number, nome: string) => void;
  onDelete: (id: number) => void;
  curso: Curso | null;
};

export default function CursoModal({
  visible,
  onClose,
  onCreate,
  onEdit,
  onDelete,
  curso,
}: CursoModalProps) {
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (curso) {
      setNome(curso.nome);
    } else {
      setNome('');
    }
  }, [curso, visible]);

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
      onDelete(curso.id);
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            {curso ? 'Editar Curso' : 'Adicionar Curso'}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do curso"
            value={nome}
            onChangeText={setNome}
          />
          <View style={styles.buttonGroup}>
            <Button title="Cancelar" onPress={onClose} color="#888" />
            <Button title={curso ? 'Salvar' : 'Adicionar'} onPress={handleSalvar} />
          </View>

          {curso && (
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

import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onCreate: (nome: string) => void;
};

export default function CursoModal({ visible, onClose, onCreate }: Props) {
  const [nome, setNome] = useState('');

  const handleCreate = () => {
    if (nome.trim()) {
      onCreate(nome.trim());
      setNome('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Novo Curso</Text>
          <TextInput
            placeholder="Nome do curso"
            value={nome}
            onChangeText={setNome}
            style={styles.input}
          />
          <View style={styles.buttons}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Salvar" onPress={handleCreate} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

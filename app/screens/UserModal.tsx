import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, Alert } from 'react-native';

type UserModalProps = {
  visible: boolean;
  onClose: () => void;
  onCreate: (nome: string, email: string) => void;
  onEdit: (id: number, nome: string, email: string) => void;
  onDelete: (id: number) => void;
  usuario: {
    id: number;
    nome: string;
    email: string;
  } | null;
};

const UserModal: React.FC<UserModalProps> = ({
  visible,
  onClose,
  onCreate,
  onEdit,
  onDelete,
  usuario,
}) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
    } else {
      setNome('');
      setEmail('');
    }
  }, [usuario]);

  const handleSubmit = () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (usuario) {
      onEdit(usuario.id, nome, email);
    } else {
      onCreate(nome, email);
    }
    onClose();
  };

  const handleDelete = () => {
    if (usuario) {
      Alert.alert(
        'Confirmar exclusão',
        `Tem certeza que deseja excluir o usuário ${usuario.nome}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', onPress: () => {
            onDelete(usuario.id);
            onClose();
          }},
        ]
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>
          {usuario ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.buttonGroup}>
          <View style={styles.buttonWrapper}>
            <Button title="Cancelar" onPress={onClose} color="#F44336" />
          </View>
          
          {usuario && (
            <View style={styles.buttonWrapper}>
              <Button
                title="Excluir"
                onPress={handleDelete}
                color="#FF5722"
              />
            </View>
          )}
          
          <View style={styles.buttonWrapper}>
            <Button
              title={usuario ? 'Salvar' : 'Adicionar'}
              onPress={handleSubmit}
              color="#4CAF50"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default UserModal;
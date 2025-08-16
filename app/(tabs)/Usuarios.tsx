import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Pressable, Alert } from 'react-native';
import UserModal from '../screens/UserModal';
import { Image } from 'expo-image';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nome: 'João Silva', email: 'joao@exemplo.com' },
    { id: 2, nome: 'Maria Souza', email: 'maria@exemplo.com' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);

  const adicionarUsuario = (nome: string, email: string) => {
    const novoUsuario: Usuario = { 
      id: Date.now(), 
      nome,
      email 
    };
    setUsuarios([...usuarios, novoUsuario]);
  };

  const editarUsuario = (id: number, nome: string, email: string) => {
    const usuariosAtualizados = usuarios.map(usuario =>
      usuario.id === id ? { ...usuario, nome, email } : usuario
    );
    setUsuarios(usuariosAtualizados);
  };

  const deletarUsuario = (id: number) => {
    Alert.alert('Confirmar exclusão', 'Deseja realmente excluir este usuário?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => setUsuarios(usuarios.filter(usuario => usuario.id !== id)),
      },
    ]);
  };

  const abrirModalParaEditar = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setUsuarioSelecionado(null);
    setModalVisible(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/perfil.png')} // Altere para uma imagem de perfil
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          <Text style={styles.title}>Lista de Usuários</Text>
        </ThemedText>

        <ThemedView style={styles.stepContainer}>
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => abrirModalParaEditar(item)}>
                <View style={styles.itemContainer}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemEmail}>{item.email}</Text>
                </View>
              </Pressable>
            )}
          />
        </ThemedView>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Usuário"
          onPress={() => {
            setUsuarioSelecionado(null); // limpar usuário selecionado para criar novo
            setModalVisible(true);
          }}
        />
      </View>

      <UserModal
        visible={modalVisible}
        onClose={fecharModal}
        onCreate={adicionarUsuario}
        onEdit={editarUsuario}
        onDelete={deletarUsuario}
        usuario={usuarioSelecionado}
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
  itemContainer: {
    paddingVertical: 12,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemNome: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  itemEmail: {
    fontSize: 14,
    color: '#cccccc',
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
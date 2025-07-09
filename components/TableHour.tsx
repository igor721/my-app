import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const horario = [
  ['07:00 – 07:50', 'Matemática', 'Português', 'Geografia', 'Ciências', 'Inglês'],
  ['07:50 – 08:40', 'Matemática', 'Português', 'Geografia', 'Ciências', 'Inglês'],
  ['08:40 – 09:30', 'História', 'Educação Física', 'Artes', 'Matemática', 'Redação'],
  ['09:30 – 09:50', 'Intervalo', 'Intervalo', 'Intervalo', 'Intervalo', 'Intervalo'],
  ['09:50 – 10:40', 'Ciências', 'História', 'Inglês', 'Português', 'Matemática'],
  ['10:40 – 11:30', 'Redação', 'Matemática', 'Ciências', 'Geografia', 'História'],
];

const dias = ['Horário', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

const HorarioAulas = () => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.row}>
          {dias.map((dia, index) => (
            <Text key={index} style={[styles.cell, styles.header]}>
              {dia}
            </Text>
          ))}
        </View>

        {/* Linhas de conteúdo */}
        {horario.map((linha, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {linha.map((item, colIndex) => (
              <Text
                key={colIndex}
                style={[
                  styles.cell,
                  item === 'Intervalo' && styles.intervalo,
                ]}
              >
                {item}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    minWidth: 150,
    textAlign: 'center',
    color: '#ccc',
  },
  header: {
    backgroundColor: '#4f83cc',
    color: '#fff',
    fontWeight: 'bold',
  },
  intervalo: {
    backgroundColor: '#4169E1',
    fontStyle: 'italic',
  },
});

export default HorarioAulas;

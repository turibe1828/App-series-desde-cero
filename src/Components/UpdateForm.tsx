import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useState } from 'react';
import Button from './Button';

interface FormField {
  placeholder: string;
  key: string;
}

interface Props {
  onUpdate: (formValues: { [key: string]: string }) => void; 
  formType: 'Plataforma' | 'Actores' | 'Idiomas' | 'Directores'; 
}

const formTypes: { [key: string]: FormField[] } = {
  Plataforma: [{ placeholder: 'Nombre', key: 'Nombre' }],
  Actores: [
    { placeholder: 'Nombre', key: 'Nombre' },
    { placeholder: 'Apellido', key: 'Apellido' },
    { placeholder: 'Nacionalidad', key: 'Nacionalidad' },
    { placeholder: 'Fecha', key: 'Fecha' },
  ],
  Directores: [
    { placeholder: 'Nombre', key: 'Nombre' },
    { placeholder: 'Apellido', key: 'Apellido' },
    { placeholder: 'Nacionalidad', key: 'Nacionalidad' },
    { placeholder: 'Fecha', key: 'Fecha' },
  ],
  Idiomas: [
    { placeholder: 'Nuevo nombre', key: 'Nombre' },
    { placeholder: 'ISO', key: 'ISO' },
  ],
};

export default function UpdateForm({ onUpdate, formType }: Props) {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  return (
    <View style={styles.container}>
      {formTypes[formType].map((field) => (
        <View key={field.key} style={styles.inputContainer}>
          <Text style={styles.label}>{field.placeholder}</Text>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            value={formValues[field.key] || ''}
            onChangeText={(value) => handleInputChange(field.key, value)}
          />
        </View>
      ))}
      <Button
        onPress={() => {
          onUpdate(formValues);
          setFormValues({});
        }}
        title="Actualizar"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16, 
  },
  label: {
    fontSize: 16,
    marginBottom: 8, 
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    width: '100%', 
  },
});

import { StyleSheet, View, TextInput, Text } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import Button from './Button';

interface FormField {
  placeholder: string;
  key: string;
}

interface Props {
  onSubmit: (formValues: { [key: string]: string }) => void;
  formType: 'Plataforma' | 'Actores' | 'Idiomas'|'Directores'; 
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

export default function AddPostForm({ onSubmit, formType }: Props) {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
  const [date, setDate] = useState<Date | null>(null);  

  const handleInputChange = (key: string, value: string) => {
    setFormValues((prevValues) => ({ ...prevValues, [key]: value }));
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
    setFormValues((prevValues) => ({
      ...prevValues,
      Fecha: selectedDate ? selectedDate.toISOString().split('T')[0] : '', // Ajusta el formato de la fecha
    }));
  };  
  return (
    <View style={styles.container}>
      {formTypes[formType].map((field) => (
        <View key={field.key} style={styles.inputContainer}>
          {field.key === 'Fecha' ? (
            <>
              <Text style={styles.label}>Fecha</Text>
              <DatePicker
                selected={date} // Utiliza el estado de la fecha seleccionado
                onChange={handleDateChange} // Maneja el cambio de fecha
                dateFormat="yyyy-MM-dd" // Ajusta el formato de fecha
                placeholderText="Seleccionar Fecha"
                className="react-datepicker__input-container" // Agrega clase para el estilo
              />
            </>
          ) : (
            <>
              <Text style={styles.label}>{field.placeholder}</Text>
              <TextInput
                style={styles.input}
                placeholder={field.placeholder}
                value={formValues[field.key] || ''}
                onChangeText={(value) => handleInputChange(field.key, value)}
              />
            </>
          )}
        </View>
      ))}
          
      <Button
        onPress={() => {
          onSubmit(formValues);
          setFormValues({});
        }}
        title="Agregar"
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
    width: '50%', 
  },
});

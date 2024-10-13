import { Alert, FlatList } from "react-native";
import { StyleSheet, View } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from '../supabase/client'
import AddPostForm from "../Components/AddPostForm";
import { getAllData, submitData, deleteData, updateData } from "../supabase/api";
import PostCard from "../Components/postCard";
import UpdateForm from "../Components/UpdateForm";

const Idiomas = () => {
  const [idiomas, setNewIdiomas] = useState([]);
  const [selectedIdiomas, setSelectedIdiomas] = useState(null);
  const fetchIdiomas = async () => {
    const idiomasData = await getAllData("Idiomas");
    setNewIdiomas(idiomasData);
  };
  useEffect(() => {
    fetchIdiomas();
  }, []);

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const { Nombre, Apellido, Nacionalidad, Fecha } = formValues;
    const dataToSubmit = {
      Nombre: Nombre,
      Apellido: Apellido,
      Nacionalidad: Nacionalidad,
      Fecha: Fecha,
  };
  try {
    await submitData("Idiomas", dataToSubmit);
    fetchIdiomas();
} catch (error) {
    console.error("Error al enviar datos:", error);
};


  }
  const handleDelete = async (id: number) => {
    await deleteData("Idiomas",id);
    fetchIdiomas()
  };

  const handleUpdate = async (formValues: { [key: string]: string }) => {
    const { Nombre, Apellido, Nacionalidad, Fecha } = formValues;

    if (!selectedIdiomas) {
        Alert.alert("Error", "No se ha seleccionado ningún actor.");
        return;
    }
    if (!Nombre) {
        Alert.alert("Error", "El nombre no puede estar vacío.");
        return;
    }
    if (!Apellido) {
        Alert.alert("Error", "El apellido no puede estar vacío.");
        return;
    }
    if (!Nacionalidad) {
        Alert.alert("Error", "La nacionalidad no puede estar vacía.");
        return;
    }
    if (!Fecha) {
        Alert.alert("Error", "La fecha no puede estar vacía.");
        return;
    }
    const updatedData = {
        Nombre: Nombre,
        Apellido: Apellido,
        Nacionalidad: Nacionalidad,
        Fecha: Fecha,
    };

    try {
        await updateData("Idiomas", selectedIdiomas.id, updatedData);
        fetchIdiomas();
        setSelectedIdiomas(null);
    } catch (error) {
        console.error("Error al actualizar datos:", error);
    }
};



  return (
    <View style={styles.container}>
      <AddPostForm formType="Idiomas" onSubmit={handleSubmit} />
      <FlatList
        data={idiomas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => (
          <PostCard post={item} onDelete={() => handleDelete(item.id)} onUpdate={() => {
            setSelectedIdiomas(item); 
        }}
    />
)}
/>
 {selectedIdiomas && (
  <View style={styles.updateContainer}>
    <UpdateForm formType="Idiomas" onUpdate={handleUpdate}/>
</View>
            )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: '20%',
  },
  updateContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
},
});

export default Idiomas;

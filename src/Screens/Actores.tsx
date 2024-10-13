import { Alert, FlatList } from "react-native";
import { StyleSheet, View } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from '../supabase/client'
import AddPostForm from "../Components/AddPostForm";
import { getAllData, submitData, deleteData, updateData } from "../supabase/api";
import PostCard from "../Components/postCard";
import UpdateForm from "../Components/UpdateForm";

const Actores = () => {
  const [actores, setNewActores] = useState([]);
  const [selectedActores, setSelectedActores] = useState(null);
  const fetchActores = async () => {
    const actoresData = await getAllData("Actores");
    setNewActores(actoresData);
  };
  useEffect(() => {
    fetchActores();
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
    await submitData("Actores", dataToSubmit);
    fetchActores();
} catch (error) {
    console.error("Error al enviar datos:", error);
};


  }
  const handleDelete = async (id: number) => {
    await deleteData("Actores",id);
    fetchActores()
  };

  const handleUpdate = async (formValues: { [key: string]: string }) => {
    const { Nombre, Apellido, Nacionalidad, Fecha } = formValues;

    if (!selectedActores) {
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
        await updateData("Actores", selectedActores.id, updatedData);
        fetchActores();
        setSelectedActores(null);
    } catch (error) {
        console.error("Error al actualizar datos:", error);
    }
};


  return (
    <View style={styles.container}>
      <AddPostForm formType="Actores" onSubmit={handleSubmit} />
      <FlatList
        data={actores}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => (
          <PostCard post={item} onDelete={() => handleDelete(item.id)} onUpdate={() => {
            setSelectedActores(item); 
        }}
    />
)}
/>
 {selectedActores && (
  <View style={styles.updateContainer}>
    <UpdateForm formType="Actores" onUpdate={handleUpdate}/>
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

export default Actores;

import { Alert, FlatList } from "react-native";
import { StyleSheet, View } from 'react-native';
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from '../supabase/client'
import AddPostForm from "../Components/AddPostForm";
import { getAllData, submitData, deleteData, updateData } from "../supabase/api";
import PostCard from "../Components/postCard";
import UpdateForm from "../Components/UpdateForm";

const Plataforma = () => {
  const [plataforma, setNewPlataforma] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const fetchPlataformas = async () => {
    const plataformasData = await getAllData("Plataforma");
    setNewPlataforma(plataformasData);
  };
  useEffect(() => {
    fetchPlataformas();
  }, []);

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const Nombre = formValues.Nombre;
    await submitData("Plataforma",{Nombre:Nombre});
    fetchPlataformas();
  }
  const handleDelete = async (id: number) => {
    await deleteData("Plataforma",id);
    fetchPlataformas()
  };

  const handleUpdate = async (formValues: { [key: string]: string }) => {
    const nombre = formValues.Nombre;
    if (!selectedPlatform || !nombre) {
        Alert.alert("Error", "El nombre no puede estar vacío");
        return;
    }
    await updateData("Plataforma",selectedPlatform.id,{Nombre : nombre});
    fetchPlataformas(); 
    setSelectedPlatform(null); 
};


  return (
    <View style={styles.container}>
      <AddPostForm formType="Plataforma" onSubmit={handleSubmit} />
      <FlatList
        data={plataforma}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 8 }}
        renderItem={({ item }) => (
          <PostCard post={item} onDelete={() => handleDelete(item.id)} onUpdate={() => {
            setSelectedPlatform(item); 
        }}
    />
)}
/>
 {selectedPlatform && (
  <View style={styles.updateContainer}>
    <UpdateForm formType="Plataforma" onUpdate={handleUpdate}/>
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

export default Plataforma;

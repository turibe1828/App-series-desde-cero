import { supabase } from "./client";
       
  type columns= Record<string, any>;
  type TableName = "Actores" | "Directores" | "Idiomas" | "Plataforma";

export const getAllData = async (tableName:TableName) => {
  try {
      const { data, error } = await supabase
          .from(tableName)
          .select();

      return data;
  } catch (error:any) {
      console.error('Error fetching plataformas:', error.message);
      return [];
  }
};

export const fetchData = async (tableName:TableName  ) => {
  try{ 
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order('created_at',{ascending: false,});

    if (error) throw error;

    return data;
  }catch (error: any) {
    console.error(`Error al obtener datos de ${tableName}:`, error.message);
    return [];
  }
};
  
  export const submitData = async ( tableName:TableName, columns: columns ) => {
    try {
      const { data, error } = await supabase
        .from(tableName)   
        .insert(columns)      
        .select();
  
      if (error) throw error;
  
      console.log(`${tableName} insertado correctamente:`, data);
    } catch (error: any) {  
      console.error(`Error al insertar en ${tableName}:`, error.message);
    }
  };
  
  
  export const deleteData = async (tableName: TableName, id:number) => {
    try {
        const { data, error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', id);

        if (error) throw error;
        console.log(`${tableName} con ID ${id} eliminado correctamente:`, data);
        return data;

    } catch (error:any) {
      console.error(`Error al eliminar en ${tableName}:`, error.message);
    }
};
export const updateData = async (tableName: TableName, id: number, columns: columns) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(columns)
      .eq('id', id);

    if (error) throw error;
    console.log(`${tableName} con ID ${id} actualizado correctamente:`, data);
    return data;
  } catch (error:any) {
    console.error(`Error al actualizar en ${tableName}:`, error.message); 
  }
};


  export type posts = Awaited<ReturnType<typeof fetchData>>;
  export type Post= posts[number]
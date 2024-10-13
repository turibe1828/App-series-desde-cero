import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { Database } from "../db_types";

const supabaseUrl = Constants?.expoConfig?.extra?.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = Constants?.expoConfig?.extra?.REACT_APP_SUPABASE_ANNON_KEY;

/*const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_KEY || ''*/

console.log(supabaseUrl);
console.log(supabaseAnonKey);



export const supabase = createClient<Database>(supabaseUrl,
     supabaseAnonKey)
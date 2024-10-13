import React from "react";
import { Image } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//screens
import Plataforma from "./Screens/Plataforma";
import Actores from "./Screens/Actores";
import Directores from "./Screens/Directores";
import Idiomas from "./Screens/Idioma";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Logo } from "./Components/logo";
/*import { PlatformPressable } from "@react-navigation/elements";
import {AntDesgin} from '@expo/vector-icons'*/


const Tab= createBottomTabNavigator();

function MyTabs(){
    return(
        <Tab.Navigator
        initialRouteName="Plataforma"
        screenOptions={{
            tabBarActiveTintColor: 'purple',
            headerTitle: () => (
                <Logo/>
            ),
        }}>
            <Tab.Screen name= "Plataforma" component={Plataforma}
            options={{
                tabBarIcon:({color,size})=>(
                    <FontAwesome6 name="display" size={24} color={color} />
                )
            }}
            />
            <Tab.Screen name= "Actores" component={Actores} 
            options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="recent-actors" size={24} color={color} />
                )
            }}/>
            <Tab.Screen name= "Directores" component={Directores}
            options={{
                tabBarIcon:({color,size})=>(
                    <Ionicons name="film-outline" size={24} color={color} />
                )
            }} />
            <Tab.Screen name= "Idiomas" component={Idiomas} 
             options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="language" size={24} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}
export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );  
}
import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/components/screens/home";
import Inicial from "./src/components/screens/inicial";

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Inicial" options={{
            headerShown:false
          }}>
            {(props) => <Inicial {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Home" options={{
            headerShown:false
          }}>
            {(props) => <Home {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}


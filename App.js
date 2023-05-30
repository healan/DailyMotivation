import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyDrawer from "./component/Drawer";
import Home from "./component/Home";

export default function App() {

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>
      <MyDrawer />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
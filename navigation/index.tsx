/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */


 import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 import * as React from 'react';
 import { ColorSchemeName, Pressable } from 'react-native';
 import { View } from '../components/Themed';
 import { Octicons, MaterialCommunityIcons, MaterialIcons,
FontAwesome5,Fontisto,AntDesign} from '@expo/vector-icons';
 
 import Colors from '../constants/Colors';
 import useColorScheme from '../hooks/useColorScheme';
 import ModalScreen from '../screens/ModalScreen';
 
 import NotFoundScreen from '../screens/NotFoundScreen';
 import ChatsScreen from '../screens/ChatsScreen';
 import ChatRoomScreen from '../screens/ChatRoomScreen';
 import ContactsScreen from '../screens/ContactsScreen';

 import TabTwoScreen from '../screens/TabTwoScreen';
 import TabThreeScreen from '../screens/TabThreeScreen';

 import { MainTabParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
import { color } from 'react-native-reanimated';
 
 export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 const Stack = createNativeStackNavigator<RootStackParamList>();
 
 function RootNavigator() {
   return (
     <Stack.Navigator screenOptions={{ 
       headerStyle: {
         backgroundColor: Colors.light.tint,
         shadowOpacity: 0,
         elevation: 0,
       },
       headerTintColor: Colors.light.background,
       headerTitleAlign: 'left',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
      }}>
       <Stack.Screen 
        name="Root" 
        component={BottomTabNavigator}
        options={{
          title: "Love Chat",
          headerRight: () => (
            <View style={{
              flexDirection: 'row',
              width: 60,
              justifyContent: 'space-between',
              marginRight: 10,
              backgroundColor: Colors.light.tint,
            }}>
              <Octicons name="search" size={22} color={'white'} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'} />
            </View>
          )
        }}
        />

        <Stack.Screen 
          name="ChatRoom"  
          component={ChatRoomScreen} 
          options={({ route }) => ({
            title: route.params.name,
            headerRight: () => (
              <View style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                marginRight: 10,
                backgroundColor: Colors.light.tint,
              }}>
                <FontAwesome5 name='video' size={22} color={'white'} />
                <MaterialIcons name='call' size={22} color={'white'} />
                <MaterialCommunityIcons name='dots-vertical' size={22} color={'white'} />
              </View>
            )
          })} 
        />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />

     </Stack.Navigator>
   );
 }
 
 
  /**
  * A Top tab navigator displays tab buttons on the Top of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */

 /**
  * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
  * https://reactnavigation.org/docs/bottom-tab-navigator
  */
 const MainTab = createMaterialTopTabNavigator<MainTabParamList>();
 
 function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <MainTab.Navigator
       initialRouteName="Chats"
       screenOptions={{
         tabBarActiveTintColor: Colors[colorScheme].background,
         tabBarStyle: {
           backgroundColor: Colors[colorScheme].tint,
         },
         tabBarIndicatorStyle: {
           backgroundColor: Colors[colorScheme].background,
           height: 4,
         },
         tabBarLabelStyle: {
           fontWeight: 'bold',
         },
         tabBarShowIcon: true,
       }}>
       <MainTab.Screen
         name="Camera"
         component={TabThreeScreen}
         options={{
          tabBarIcon: ({color: string }) => <Fontisto name="camera" color="#68A5A2" size={18} />,
          tabBarLabel: () => null,
         }}
       />
       <MainTab.Screen
         name="Chats"
         component={ChatsScreen}
       />
       <MainTab.Screen
         name="Status"
         component={TabThreeScreen}
       />
       <MainTab.Screen
         name="Calls"
         component={TabThreeScreen}
       />
       
     </MainTab.Navigator>
   );
 }
 
 /**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={30} style={{ marginBottom: -3 }} {...props} />;
}


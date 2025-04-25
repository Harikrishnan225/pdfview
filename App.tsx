import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PdfInput from './component/PdfInput/PdfInput';
import PdfView from './component/PdfView/PdfView';
import PdfDownlooad from './component/PdfDownload/PdfDownload';
import {StatusBar} from 'react-native';
import PdfList from './component/PdfList/PdfList';
import ViewOffline from './component/ViewOffline/ViewOffline';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={'#0080FF'} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="PdfInput">
          <Stack.Screen name="PdfInput" component={PdfInput} />
          <Stack.Screen name="PdfList" component={PdfList} />
          <Stack.Screen name="PdfView" component={PdfView} />
          <Stack.Screen name="PdfDownload" component={PdfDownlooad} />
          <Stack.Screen name="ViewOffline" component={ViewOffline} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

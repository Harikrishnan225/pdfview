import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';

type ViewOfflineRouteProp = RouteProp<RootStackParamList, 'ViewOffline'>;
const ViewOffline = () => {
  const route = useRoute<ViewOfflineRouteProp>();
  console.log('route', route);
  const {toFile} = route.params;

  const source = {
    uri: toFile,
    cache: true,
  };
  return (
    <>
      <Text style={styles.heading}>View OffLine</Text>
      
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default ViewOffline;

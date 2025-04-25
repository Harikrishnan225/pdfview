import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface pdfStoredDataType {
  title: string;
  pdfUrl: string;
  id: string;
}

const PdfList = () => {
  const [pdfStoredData, setPdfStoredData] = useState<pdfStoredDataType[]>([]);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'PdfList'>>();

  useEffect(() => {
    pdfDataStored();
  }, []);

  const pdfDataStored = async () => {
    try {
      const data = await AsyncStorage.getItem('pdfData');
      const storedPdfData = await AsyncStorage.getItem('DownloadedPdfData');

      if (data) {
        const parsedData = JSON.parse(data);
        console.log('Parsed Data from AsyncStorage:', parsedData);
        console.log('Logged Data', storedPdfData);

        if (Array.isArray(parsedData)) {
          setPdfStoredData(parsedData);
        }
      } else {
        console.log('No PDF data found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error retrieving data from AsyncStorage:', error);
    }
  };

  const viewBtnPress = (pdfUrl: string, title: string, id: string) => {
    navigation.navigate('PdfView', {pdfUrl, title, id});
  };

  return (
    <>
      <Text style={styles.heading}>Pdf List</Text>
      <FlatList
        data={pdfStoredData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <View style={styles.tableContainer}>
            <Text style={styles.itemText}>
              {index + 1}. {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => {
                viewBtnPress(item.pdfUrl, item.title, item.id);
              }}>
              <Text style={styles.viewButton}>View</Text>
              <Text>
                <Ionicons name="download" size={20} color="#000" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
        style={styles.container}
      />
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
    backgroundColor: 'lightblue',
  },
  tableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 4,
    marginTop: 10,
    backgroundColor: '#0080FF',
    borderRadius: 5,
    width: '90%',
    marginHorizontal: 'auto',
  },
  itemText: {
    color: 'white',
    fontSize: 18,
    flex: 1,
  },
  viewButton: {
    color: 'white',
    backgroundColor: 'lightblue',
    borderRadius: 4,
    padding: 10,
    width: 70,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PdfList;

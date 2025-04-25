import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';

interface pdfStoredDataType {
  title: string;
  pdfUrl: string;
  id: string;
  toFile?: string;
}

const PdfDownlooad = () => {
  const [pdfStoredData, setPdfStoredData] = useState<pdfStoredDataType[]>([]);
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'PdfList'>>();

  useEffect(() => {
    pdfDataStored();
  }, []);

  const pdfDataStored = async () => {
    try {
      const data = await AsyncStorage.getItem('DownloadedPdfData');
      if (data) {
        const storedData = JSON.parse(data);
        console.log('datafromstorage', storedData);
        setPdfStoredData(storedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewBtnPress = (toFile: string) => {
    console.log('downloadpath',toFile);
    navigation.navigate('ViewOffline', {toFile});
  };

  return (
    <>
      <Text style={styles.heading}>Downloaded Files</Text>
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
                viewBtnPress(item.toFile || '');
              }}>
              <Text style={styles.viewButton}>View</Text>
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

export default PdfDownlooad;

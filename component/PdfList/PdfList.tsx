import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface pdfStoredDataType {
  title: string;
  pdfUrl: string;
  id: string;
}
const PdfList = () => {
  const [pdfStoredData, setPdfStoredData] = useState<pdfStoredDataType[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    pdfDataStored();
  }, []);

  const pdfDataStored = async () => {
    try {
      const data = await AsyncStorage.getItem('pdfData');
      if (data) {
        const parsedData = JSON.parse(data);
        setPdfStoredData(parsedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const viewBtnPress = (pdfUrl: string){
  //   navigation.navigate('PdfView', {pdfUrl})
  // }

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
            {/* onPress={() => viewBtnPress(item.pdfUrl)} */}
            <TouchableOpacity>
              <Text style={styles.viewButton}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  container: {
    flex: 1,
  },
  tableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 4,
    backgroundColor: 'black',
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
    backgroundColor: 'gray',
    borderRadius: 4,
    padding: 10,
    width: 70,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PdfList;

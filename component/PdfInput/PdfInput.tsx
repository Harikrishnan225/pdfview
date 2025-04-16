import React, {useState} from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface pdfDataType {
  title: string;
  pdfUrl: string;
  id: string;
}
const PdfInput = ({navigation}: {navigation: any}) => {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfData, setPdfData] = useState<pdfDataType[]>([]);

  const pdfValue = async () => {
    try {
      const localStored = await AsyncStorage.getItem('pdfData');

      const parsedPdfData: pdfDataType[] = localStored
        ? JSON.parse(localStored)
        : [];

      const newPdfData: pdfDataType = {
        title: text,
        pdfUrl: pdfUrl,
        id: uuid.v4(),
      };

      const updatedPdfData = [...parsedPdfData, newPdfData];

      await AsyncStorage.setItem('pdfData', JSON.stringify(updatedPdfData));

      setPdfData(updatedPdfData);
      Alert.alert('Pdf Successfully Saved');
      setText('');
      setPdfUrl('');
      navigation.navigate('PdfList');
    } catch (error) {
      console.log(error);
    }
  };

  const pdfListPage = () => {
    navigation.navigate('PdfList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pdfHeading}>UpLoad PDF Url</Text>
      <View>
        <TextInput
          style={styles.inputField}
          placeholder="Enter title"
          placeholderTextColor="black"
          onChangeText={newValue => setText(newValue)}
          value={text}
        />
      </View>

      <View>
        <TextInput
          style={styles.inputField}
          placeholder="Enter the Url"
          placeholderTextColor="black"
          onChangeText={newValue => setPdfUrl(newValue)}
          value={pdfUrl}
        />
      </View>

      <TouchableOpacity
        style={styles.saveBtnContainer}
        onPress={pdfValue}
        disabled={!text || !pdfUrl}>
        <Text style={styles.saveBtn}>Save</Text>
      </TouchableOpacity>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.saveBtnContainer, styles.viewbtn]}
          onPress={pdfListPage}>
          <Text style={styles.saveBtn}>View All Pdf</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.saveBtnContainer, styles.viewbtn]}>
          <Text style={styles.saveBtn}>View Downloaded Pdf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    margin: 'auto',
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 15,
  },
  saveBtnContainer: {
    width: '90%',
    height: 50,
    backgroundColor: '#0080FF',
    borderRadius: 5,
    marginHorizontal: 'auto',
  },
  saveBtn: {
    textAlign: 'center',
    margin: 'auto',
    color: 'white',
  },
  pdfHeading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 100,
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 22,
  },
  viewbtn: {
    width: '50%',
  },
});

export default PdfInput;

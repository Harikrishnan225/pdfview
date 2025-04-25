import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface pdfDataType {
  title: string;
  id: string;
  pdfUrl: string;
  toFile: string;
}

const PdfView = ({route}: any) => {
  const {pdfUrl, title, id} = route.params;
  const source = {uri: pdfUrl, cache: true};
  const [hasPermission, setHasPermission] = useState(false);
  const [downloadedPdfList, setDownloadedPdfList] = useState<pdfDataType[]>([]);

  console.log('pdfloaded', source.uri);

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Pdf Download needs Permission',
          message: 'Download the Pdf File to LocalStorage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can Download');
        setHasPermission(true);
      } else {
        console.log('Download permission denied');
        setHasPermission(false);
      }
    } catch (err) {
      console.warn('Permission error:', err);
    }
  };

  useEffect(() => {
    const loadDownloadedPdfList = async () => {
      try {
        const storedPdfData = await AsyncStorage.getItem('DownloadedPdfData');
        if (storedPdfData) {
          setDownloadedPdfList(JSON.parse(storedPdfData));
        }
      } catch (error) {
        console.log('Error loading data from AsyncStorage:', error);
      }
    };
  
    loadDownloadedPdfList();
  }, []);
  

  const updatedPdfData = async (id: string, title: string, toFile: string) => {
    const downloadPdfData: pdfDataType = {
      title: title,
      id: id,
      pdfUrl:pdfUrl,
      toFile: toFile,
    };
  
    setDownloadedPdfList(prevList => {
      const updatedPdf = [...prevList, downloadPdfData];
      console.log("Updated PDF List: ", updatedPdf);
      AsyncStorage.setItem('DownloadedPdfData', JSON.stringify(updatedPdf)).catch(error => {
        console.log('Error saving data to AsyncStorage:', error);
      });
      return updatedPdf;
    });
  };
  
  
  const handleDownloadFile = () => {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      requestPermission();
    } else {
      setHasPermission(true);
    }
    const fromUrl = pdfUrl;
    const toFile = `${RNFS.DocumentDirectoryPath}/${title}-${new Date().getTime()}.pdf`;
    console.log('Unique file path:', toFile); 
    console.log('filePATH', toFile);

    const options = {
      fromUrl: fromUrl,
      toFile: toFile,
      begin: (res: any) => {
        console.log('Download started');
      },
      progress: (res: any) => {
        let progressPercent = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Downloaded ${progressPercent.toFixed(2)}%`);
      },
    };

    RNFS.downloadFile(options)
      .promise.then(res => {
        Alert.alert('File downloaded successfully');
        updatedPdfData(id, title, toFile);
        console.log('File downloaded successfully');
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{backgroundColor: 'red', color: 'white'}}>
          {source.uri}
        </Text>
      </View>

      <Pdf
        trustAllCerts={false}
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

      <Button title="Download PDF" onPress={handleDownloadFile} />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default PdfView;

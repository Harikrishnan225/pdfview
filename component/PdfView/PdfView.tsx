import React from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import Pdf from 'react-native-pdf';

const PdfView = ({route}: any) => {
  const sourceUrl = route.params;
  const source = {uri: sourceUrl.pdfUrl, cache: true};

  console.log('pdfloaded', source.uri);

  return (
    <>
      <View style={styles.container}>
        <View>
          <Text style={{backgroundColor: 'red', color:'white'}}>{source.uri}</Text>
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
      </View>
      <Button title="Download PDF" />
    </>
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

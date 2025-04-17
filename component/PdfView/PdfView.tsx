import React,{useEffect} from "react";
import { Button } from "react-native";
import { WebView } from 'react-native-webview';


const PdfView = ({route}:any) => {
  const {pdfUrl} = route.params;  
    useEffect(() => {
        console.log("PdfScreen", pdfUrl);
      }, [pdfUrl]);
    
    return (
       <>
        <WebView
          source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}` }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          useWebKit={true}
        />

        <Button title="Download PDF"/>
       </>
      );
}

export default PdfView;
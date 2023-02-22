import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import {ZEN_URL, TRANSLATE_URL} from '../config.js';

export default function Home() {
  const [author, setAuthor] = useState();
  const [hquote, setHquote] = useState();
  const [quote, setQuote] = useState();

  const getMotivationText = async() => {
    await axios.get(ZEN_URL)
            .then((response)=>{
                let data = response.data;
                setAuthor(data[0].a);
                setHquote(data[0].h);
                setQuote(data[0].q);

                getKoMotivationText();
            })
            .catch((err)=>{
                console.log(11, err);
            })
    };
  
  const getKoMotivationText = async() => {

      const headers = {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*'
      }

      let data ={
        author : author, 
        quote : quote
      };

      console.log(39, data);
      await axios({
        method : 'post',
        url : TRANSLATE_URL+'/quote/translate/',
        data : data
      })
      .then((res)=>{
        console.log(48, res.data);
      })
      .catch((error)=>{
        console.log(error.toJSON());
      })
  };

    useEffect(()=>{
        getMotivationText();
    }, []);

    useEffect(()=>{
      console.log(59, author);

      if(author !== '' && author !== undefined 
          && quote!== '' && quote !== undefined )
        {
          getKoMotivationText();
        };
      
    }, [author]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>{author}</Text>
      <Text>{hquote}</Text>
      <Text>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import {ZEN_URL, TRANSLATE_URL} from '../config.js';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default function Home() {
  const [author, setAuthor] = useState();
  const [hquote, setHquote] = useState();
  const [quote, setQuote] = useState();
  const [option, setOption] = useState('ko');
  const [transQuote, setTransQuote] = useState();
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  
  let today = new Date().toLocaleDateString();
   

  const getMotivationText = async() => {
    await axios.get(ZEN_URL)
            .then((response)=>{
                let data = response.data;
                setAuthor(data[0].a);
                setHquote(data[0].h);
                setQuote(data[0].q);
                console.log(21);
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
        quote : quote,
        option : option
      };

      console.log(39, data);

      await axios({
        method : 'post',
        url : TRANSLATE_URL+'/quote/translate/',
        data : data
      })
      .then((res)=>{
        console.log(48, res.data);
        setTransQuote(res.data.text);
      })
      .catch((error)=>{
        console.log(error.toJSON());
      })
  };

    useEffect(()=>{
        // getMotivationText();
    }, []);

    useEffect(()=>{
      console.log(59, author);

      if(author !== '' && author !== undefined 
          && quote !== '' && quote !== undefined 
          )
        {
          getKoMotivationText();
        };
      
    }, [author]);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" />
      <Text>{author}</Text>
      <Text>{hquote}</Text>
      <Text>{quote}</Text>
      <Text>{transQuote}</Text>
      <Button 
        icon="camera" 
        mode="contained" 
        onPress={() => setOption('ko')}>
        Press me
      </Button> */}
    

      <Card>
        <Card.Title title="Daily Motivation" subtitle="Carpe diem" left={LeftContent} />
        <Card.Content>
          <Text variant="titleLarge">Card title</Text>
          <Text variant="bodyMedium">{today}</Text>
          <Text variant="bodyMedium">{author}</Text>
          <Text variant="bodyMedium">{hquote}</Text>
          <Text variant="bodyMedium">{quote}</Text>
          <Text variant="bodyMedium">{transQuote}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Actions>
          <Button onPress={()=>console.log(104)}>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});

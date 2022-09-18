import logoImg from '../../assets/logo-nlw-esports.png'

import { useEffect, useState } from "react";
import { Background } from "../../components/Background";
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import {useNavigation} from '@react-navigation/native'

interface Game {
  id: string
  title: string
  banner: string
  _count:{ 
    ads: number
  }
}

export function Home() {

  const [game, setGames] = useState<Game[]>([]);
  const navigation = useNavigation();

  function handleOpenGame({id, title, banner}: GameCardProps) {
    navigation.navigate('game', {id, title, banner});
  }

  useEffect(()=>{
    fetch('http://192.168.1.108:5000/games')
    .then(response => response.json())
    .then(data => {
      setGames(data)
    })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo}/>

        <Heading 
          title='Encontre seu duo!' 
          subtitle='Selecione o game que deseja jogar...'
        />
        <FlatList 
          data={game} 
          keyExtractor={item => item.id} 
          renderItem={({item}) => (
            <GameCard
              data={item}
              onPress={() => handleOpenGame(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
          
        />
        
      </SafeAreaView>
    </Background>
  );
}
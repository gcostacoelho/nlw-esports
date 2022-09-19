import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, Image, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from '../../@types/navigation';
import { Background } from "../../components/Background";
import { Entypo } from "@expo/vector-icons";

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from "../../components/DuoMatch";

import logoImg from '../../assets/logo-nlw-esports.png'

export function Game() {

  const nav = useNavigation()
  const route = useRoute();
  const game = route.params as GameParams;

  const [duo, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');


  function goBack(){ nav.goBack() }

  async function getDiscordUser(adsId:string) {
    fetch(`http://192.168.1.108:5000/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => {
      setDiscordDuoSelected(data.discord)
    })
  }

  useEffect(()=>{
    fetch(`http://192.168.1.108:5000/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => {
      setDuos(data)
    })
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}  
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>

        <Image 
          source={{uri: game.banner}} 
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading 
          title={game.title}
          subtitle='Conecte-se e comece a jogar'
        />

        <FlatList
          data={duo}
          keyExtractor={item => item.id}
          renderItem={({item}) =>(
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={[duo.length > 0 ? styles.contentList : styles.emptyListContent]}
          style={styles.containerList}
          ListEmptyComponent={()=>(
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para esse jogo ainda
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
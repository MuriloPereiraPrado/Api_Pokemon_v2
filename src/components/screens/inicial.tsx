import { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from '../../css/style';

export default function Inicial({...props}){

    
    const [retorno,setRetorno] = useState(null);

    const data = async (idPokemon) => {
        try{
          const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
          if(!resposta.ok){
            throw new Error('Erro na API');
          }
          const json = await resposta.json();

          const pokemon = {
            nome : json.name,
            img : json.sprites.other["official-artwork"].front_default,
            peso : json.weight,
            habilidades : json.abilities,
          }

          setRetorno(pokemon);
          
        } catch (error) {
          console.error('Erro na requisição: ', error.message);
    }
}

    useEffect(() => {
        data(1);
    }, []);
    
    const func1 = () => {
        data(1)
        props.navigation.navigate('Home', {
            selecionado : retorno
        });
    }
    return(
        <View style={styles.containerIni}>
        <StatusBar hidden/>
        <LottieView 
                  style={{width:100, height:100}}
                  source={require('../../animation/pokebolaA.json')}
                  autoPlay
                  loop={false}
                  />
        <TouchableOpacity style={styles.buttonInicio} onPress={() => func1()}>
          <Text style={styles.textIni}>Pokedex</Text>
        </TouchableOpacity>
      </View>
    );
}
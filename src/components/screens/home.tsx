import { useEffect, useState, useRef, createRef } from 'react';
import {View, Text, Image, TouchableOpacity,FlatList, StatusBar} from 'react-native';
import { Animated as Anima }  from 'react-native';
import { styles} from '../../css/style';
import Animated, { withRepeat } from 'react-native-reanimated';
import { useSharedValue, withSpring, withSequence, withTiming } from 'react-native-reanimated';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';



export default function Home({route, navigation}){
    const [retorno,setRetorno] = useState(null);
    const [habilidades,setHabilidades] = useState([]);
    const [hab,setHab] = useState<any[]>([]);
    const [posi,setPosi] = useState(1);
    const [flag,setFlag] = useState(false);

    const widthIm = useSharedValue(0);
    const heightIm = useSharedValue(0);
    const opaIm = useRef(new Anima.Value(0)).current;
  

    useEffect(() => {
        if(retorno === null){
            getPokemon(posi);
            console.log(`teste`);
    }
    });

const getPokemon = async (id) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const json = await response.json();
            const poke = {
              nome : json.name,
              img : json.sprites.other["official-artwork"].front_default,
              peso : json.weight,
            }

            const habili = json.abilities;
            setHabilidades(habili);
            setRetorno(poke);
            habilidades.map((item) => {
                console.log(hab);
                setHab(old => [...old, item.ability]);
            });
            //console.log(hab);
            //console.log(hab[0].ability.name)
            widthIm.value = withSpring(170);
            heightIm.value = withSpring(170);

  }

    const proximoF = () => {
        setPosi(posi + 1);
        setHab([]);
        getPokemon(posi);
    };
      
    const proximoT = () => {
        setPosi(posi - 1);
        setHab([]);
        getPokemon(posi);
    };
    if(retorno !== null){
        return(
        <View style={styles.container}>
            <StatusBar hidden/>
                <Text style={styles.npoke}>{retorno.nome}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TouchableOpacity style={styles.button} onPress={() => proximoT()}>
                        <Text style={styles.text}>Anterior</Text>
                    </TouchableOpacity>
                        <Animated.View style={[styles.box, {width:widthIm, height:heightIm}]}>
                                <Image resizeMode="stretch" source={{uri:retorno.img}} style={{width:130, height:130}}/>
                        </Animated.View>
                    <TouchableOpacity style={styles.button} onPress={() => proximoF()}>
                        <Text style={styles.text}>Próximo</Text>
                    </TouchableOpacity>
                </View> 
                    
        
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{...styles.npoke, color:`#000000ff`, fontSize:40}}>Habilidades</Text>
                <FlatList data={hab}
                            renderItem={({item}) => <HabilitPoke habilidade={item.name}/>}/>
                </View>
            
      </View>
    )
    }else{
        return(
            <View>
                <Text>Carregando</Text>
            </View>
        )
    }
}

function HabilitPoke({habilidade}){
    return(
        <View style={styles.boxHab}>
            <Text style={styles.habtext}>{habilidade}</Text>
        </View>
    )
}
import React, { useState, useEffect } from 'react';
import { getAllHot, getAllNew, getAllTop, getAllRising } from '../api/redditApi';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';

const Home = ({ navigation }) => {
  const [data, setData] = useState()
  const [colorItem, setColorItem] = useState(1)

  /* Se crea una variable donde ira guardado el resultado de la Api y asi mismo se llama al consumo que esta en el otro archivo */
  useEffect(() => {
    async function fetchMyAPI() {
      setColorItem(1)
      let info = await getAllHot()
      captureDays(info)
    }
    fetchMyAPI()
  }, [])


  /* Cada una de estas funciones se llama al momento que se desea visualizar, yendo al cunsumo del api y renovando el valor de data */
  const changeHot = async () => {
    setData(undefined)
    setColorItem(1)
    let data = await getAllHot()
    captureDays(data)
  }

  const changeNew = async () => {
    setData(undefined)
    setColorItem(2)
    let data = await getAllNew()
    captureDays(data)
  }

  const changeTop = async () => {
    setData(undefined)
    setColorItem(3)
    let data = await getAllTop()
    captureDays(data)
  }

  const changePopular = async () => {
    setData(undefined)
    setColorItem(4)
    let data = await getAllRising()
    captureDays(data)
  }


  /* esta funcion se llama cada vez que se hace un llamado a cualquier Api ya sea (nuevo,top,hot), esto para verificar hace cuanto
     se creo esta publicacion en reddit.
     Cabe aclarar que en el momento solo diferencia por años, esto se hizo asi por que se identifico que todas las publicaciones era
     antiguas, Pero de no se asi simplemente se agregaria otra condicion y variable verificando mes o horas
  */
  const captureDays = (data) => {
    for (let i = 0; i < data.data.children.length; i++) {
      let datesYeard = new Date().getFullYear() - new Date(data.data.children[i].data.created).getFullYear()
      if (datesYeard < 0) {
      } else {
        data.data.children[i].data.created = datesYeard
        data.data.children[i].data.time = 'years ago'
      }
    }
    setData(data.data.children)
  }


  /* En este diseño se crea unas tabs las cuales llevaran al consumo del api que se desea, esto para solo llamar el api que se requiere
      y asi no sobre cargar la app con data innesesaria, asi mismo todas las apis se dan valor en una misma variable la cual es la que
      se visualizara siempre con esto hace que sea muy resiclable y si se desea añadir uno nuevo solo es agregar otra función apuntando
      la misma variable.
      Estos tabs se pudo hacer de distinta manera como en un arreglo para que solo se añadiera la palabra
      al momento de dar click en alguno de estos items envia la data del item seleccionado con la url a la cual se redirigira
      en la WebView, esto mediante navigation enviando este parementro ya mencionado 
  */
  return (
    <View style={styles.box}>
      <View style={styles.boxMenuChild}>
        <TouchableOpacity style={(colorItem === 1) ? [styles.titleMenu, styles.bgTitle] : styles.titleMenu} onPress={changeHot}>
          <Text style={(colorItem === 1) ? styles.textMenusColor : ''}>Hot</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(colorItem === 2) ? [styles.titleMenu, styles.bgTitle] : styles.titleMenu} onPress={changeNew} >
          <Text style={(colorItem === 2) ? styles.textMenusColor : ''}>New</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(colorItem === 3) ? [styles.titleMenu, styles.bgTitle] : styles.titleMenu} onPress={changeTop}>
          <Text style={(colorItem === 3) ? styles.textMenusColor : ''}>Top</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(colorItem === 4) ? [styles.titleMenu, styles.bgTitle] : styles.titleMenu} onPress={changePopular}>
          <Text style={(colorItem === 4) ? styles.textMenusColor : ''}>Popular</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxMenu}>
        {
          data === undefined ?
            <View style={styles.indicadorMid}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
            :
            <FlatList data={data.sort((a, b) => a.data.title.localeCompare(b))}
              renderItem={({ item }) =>
                <TouchableOpacity id={item.key} onPress={() => navigation.navigate('Details', { url: item.data.permalink })}>
                  <View style={styles.content} >
                    <View>
                      <Image source={{ uri: item.data.url }} style={styles.img} />
                    </View>
                    <View style={styles.boxLeft} >
                      <Text style={styles.title}>
                        {item.data.title}
                      </Text>
                      <View style={styles.contentSubs}>
                        <View style={styles.contentTextSub}>
                          <Text style={styles.textSubTile}>
                            author
                          </Text>
                          <Text style={styles.textSub}>
                            {item.data.author}
                          </Text>
                        </View>
                        <View style={styles.contentTextSub}>
                          <Text style={styles.textSubTile}>
                            Score
                          </Text>
                          <Text style={styles.textSub}>
                            {item.data.score}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.contentSubs}>
                        <View>
                          <Text style={styles.textSubTile}>
                            Comments
                          </Text>
                          <Text style={styles.textSub}>
                            {item.data.num_comments}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.textSubTile}>
                            created
                          </Text>
                          <Text style={styles.textSub}>
                            {item.data.created} {item.data.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    flex: 1,
    marginTop: 10,
    paddingEnd: 15,
    paddingStart: 15,
  },
  titleMenu: {
    paddingHorizontal: 32.4,
    paddingVertical: 15,
    fontWeight: 'bold'
  },
  bgTitle: {
    backgroundColor: '#ff0136',
  },
  textMenusColor: {
    color: '#fff',
  },
  boxMenuChild: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  boxMenu: {
    flex: 10,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    height: 200,
    paddingTop: 20,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingEnd: 40,
    marginTop: 15,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 10,
  },
  img: {
    height: '100%',
    width: 100
  },
  boxLeft: {
    flexWrap: 'nowrap',
    paddingStart: 10,
    width: '78%'

  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  contentSubs: {
    flexDirection: 'row',
    paddingEnd: 90,
    marginTop: 10
  },
  textSubTile: {
    fontWeight: 'bold',
    paddingEnd: 20,
    width: 122,
    color: '#ff0136'
  },
  textSub: {
    fontWeight: '600',
    paddingEnd: 20,
    width: 122,
  },
  contentTextSub: {
    flexDirection: 'column'
  },
  indicadorMid: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default Home;
import React, { useState, useEffect } from 'react';  // Importa useState
import { Button, View, Text } from 'react-native';  // Importa Text para mostrar el mensaje
import axios from 'axios';
import Config from 'react-native-config';

const App = () => {
  const apiURL = Config.API_URL;

  const [deviceState, setDeviceState] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  useEffect(() => {
    // Consultar deviceState al cargar la app
    axios.get(`${apiURL}/riego/state`)
      .then(response => {
        //console.log('Respuesta completa:', response); // Vamos a registrar la respuesta completa
        //console.log('Data:', response.data); // Ahora registramos solo el "data"
        setDeviceState(response.data.deviceState);
        setLastAction(response.data.lastAction);
      })
      .catch(error => {
        console.error('Error al obtener deviceState:', error);
      });
  }, []);
  const riegoOn = () => {
    axios.post(`${apiURL}/riego/on`)
      .then(response => {
        console.log(response.data.message);
        setDeviceState(response.data.message);
        setLastAction(response.data.lastAction);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const riegoOff = () => {
    axios.post(`${apiURL}/riego/off`)
      .then(response => {
        console.log(response.data.message);
        setDeviceState(response.data.message);
        setLastAction(response.data.lastAction);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Encender Riego" onPress={riegoOn} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Apagar Riego" onPress={riegoOff} />
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {deviceState && <Text>Estado del riego: {deviceState}</Text>}
        {lastAction && <Text>Última acción: {lastAction}</Text>}
      </View>
    </>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import './Tank.css'; // Importa el archivo CSS
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const Tank = () => {
  const [counter, setCounter] = useState(0);
  const [fills, setFills] = useState(0);
  const [tankFull, setTankFull] = useState(false);
  const [botellas, setBotellas] = useState([]);

  useEffect(() => {
    const obtenerBotellas = async () => {
      const botellasCollection = collection(db, 'botellas');
      const botellasSnapshot = await getDocs(botellasCollection);
      const botellasData = botellasSnapshot.docs.map(doc => doc.data());
      setBotellas(botellasData.length);
    };

    obtenerBotellas();
  }, []); 
  
const handleAddBotella = async () => {
  try {
    const docRef = await addDoc(collection(db, 'botellas'), {
      litros: 0.5,
    });
    const botellasCollection = collection(db, 'botellas');
    const botellasSnapshot = await getDocs(botellasCollection);
    const botellasData = botellasSnapshot.docs.map(doc => doc.data());
    setBotellas(botellasData.length);

    console.log('Documento agregado con ID: ', docRef.id);
  } catch (e) {
    console.error('Error añadiendo documento: ', e);
  }
};

  const reiniciarBotellas = async () => {
    try {
      const botellasCollection = collection(db, 'botellas');
      const botellasSnapshot = await getDocs(botellasCollection);
      botellasSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setBotellas(0);
      console.log('Todas las botellas han sido eliminadas.');
    } catch (error) {
      console.error('Error al eliminar las botellas:', error);
    }
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < 100) {
        setCounter(prevCounter => prevCounter + 1);
      } else {
        setTankFull(true);
      }
    }, 100); // Incrementa el contador cada 100ms

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [counter]); // Ejecuta el efecto cada vez que el valor de "counter" cambie

  useEffect(() => {
    if (tankFull) {
      // Incrementa el contador de llenado solo cuando el tanque está lleno
      setFills(prevFills => prevFills + 1);
      handleAddBotella(); // Agrega una botella a la base de datos
      // Vacía el tanque después de un segundo
      setTimeout(() => {
        setCounter(0);
        setTankFull(false);
      }, 1000);
    }
  }, [tankFull]);
  
  return (
    <div className="tank-container">
      <button onClick={reiniciarBotellas} className="btn btn-primary">Reiniciar y Borrar Todas las Botellas</button>
      <h2>Proceso de purificacion</h2>
      <p>Cada una de nuestras botellas cuenta con 500ml de agua purificada</p>
      <div className="tank">
        <div className="tank-water" style={{ height: `${counter}%` }}></div>
      </div>
      {tankFull && <div>agua purificada con exito!</div>}
      <div>Botellas de purificadas: {botellas}</div>
      <div>litros totales purificados: {botellas*0.5}L</div>
    </div>
  );
};

export default Tank;

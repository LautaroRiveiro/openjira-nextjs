import mongoose, { ConnectionStates } from 'mongoose'

/**
 * ConnectionStates (Mongoose connection status):
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 **/

const connection = {
  isConnected: ConnectionStates.disconnected
}

export const connect = async () => {
  if (connection.isConnected === ConnectionStates.connected) {
    console.log('Ya estamos conectados')
    return
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState
    
    if (connection.isConnected === ConnectionStates.connected) {
      console.log('Usando conexión anterior')
      return
    }

    await mongoose.disconnect()
  }
  
  const url = process.env.MONGO_URL
  
  if (!url) {
    throw new Error('Configurar string de conexión en variable de entorno')
  }

  await mongoose.connect(url)
  connection.isConnected = ConnectionStates.connected
  console.log('Conectado a MongoDB: ', url)
}

export const disconnect = async () => {
  if (connection.isConnected !== ConnectionStates.disconnected) {
    await mongoose.disconnect()
    connection.isConnected = ConnectionStates.disconnected
    console.log('Desconectado de MongoDB')
  }
}
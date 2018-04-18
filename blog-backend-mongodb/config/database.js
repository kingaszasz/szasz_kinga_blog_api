//ezekre van szükségünk h fusson a mongodb
const host = 'localhost' //saját gépünk
const port = 27017
const user = 'root'  //a user neve, akivel csatlakozni akarok
const password = 'rootpass'
const database = 'newblog'

const options = {
  connectTimeoutMS: 2000, //mennyi időt adunka kapcsolódásra
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 100, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0 //ideiglenes tároló mérete
}

//amikor kapcsolódunk a teljes url, a vége az autentikáció
const uri = `mongodb://${user}:${password}@${host}:${port}/${database}?authMechanism=SCRAM-SHA-1`

module.exports = {
  uri: uri,
  options: options
}

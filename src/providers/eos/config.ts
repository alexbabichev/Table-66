export const userData = [
  {
    username: 'alexbabichev',
    pkey: '5KMbwAXmCqsaDrpZBJ3c5wnsqL751SPqAXqfmDdAqCQRKDz4qKm'
  },{
    username: 'alexbabichev',
    pkey: '5K8GCXXyU9fiuE3MUJDXETJewPKLzeJStYUGZZEauPaxrmMqfzw'
  }, {
    username: 'epsilon',
    pkey: '5J5v4Bzgk3BhvBdbeZNu91sJb21CbXwLwCFMsUcRhTCW7uVN1MJ'
  }
]

export const config = {
  chainId: '038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca', // 32 byte (64 char) hex string
  keyProvider: [userData[0].pkey, userData[1].pkey, userData[2].pkey], // WIF string or array of keys..
  httpEndpoint: 'http://dev.cryptolions.io:38888',
  expireInSeconds: 60,
  broadcast: true,
  verbose: false, // API activity
  sign: true
}
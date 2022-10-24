import firebase from 'firebase/compat/app'
import { boot } from 'quasar/wrappers'
import 'firebase/compat/auth'
import { useUserStore } from 'stores/user-store'

const firebaseConfig = {
  apiKey: 'AIzaSyCpaiOWyMrKqgXbewSO9pIEVgbLJnYNQ-4',
  authDomain: 'diccionaro-mapuzungu.firebaseapp.com',
  projectId: 'diccionaro-mapuzungu',
  storageBucket: 'diccionaro-mapuzungu.appspot.com',
  messagingSenderId: '13506553396',
  appId: '1:13506553396:web:855635e4041d37882fcc61',
  measurementId: 'G-BG83P2MB9V'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()

export default boot(({ store }) => {
  return new Promise(resolve => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const userStore = useUserStore(store)
        userStore.$patch({ isLoggedIn: true })
      }
      resolve()
      unsubscribe()
    })
  })
})

export { firebaseAuth }

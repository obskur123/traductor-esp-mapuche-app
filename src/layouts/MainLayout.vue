<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar
        class="toolbar"
      >
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          LLEKUM ZUNGUN
          <q-icon name="book"></q-icon>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>
        <DrawerItem label="Inicio" icon="home" to="/"></DrawerItem>
        <DrawerItem v-if="!userStore.isLoggedIn" label="Ingresar" icon="login" to="/login"></DrawerItem>
        <DrawerItem v-if="userStore.isLoggedIn" label="Salir" icon="logout" @click="logUserOut"></DrawerItem>
        <DrawerItem v-if="userStore.isLoggedIn" label="Traducciones" icon="book" to="/translations"></DrawerItem>
        <DrawerItem label="Traductor" icon="abc" to="/translator"></DrawerItem>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import DrawerItem from 'components/DrawerItem.vue'
import { firebaseAuth } from 'boot/firebase'
import { mapStores } from 'pinia/dist/pinia'
import { useUserStore } from 'stores/user-store'

export default defineComponent({
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  components: {
    DrawerItem
  },
  methods: {
    logUserOut () {
      firebaseAuth.signOut()
      this.userStore.$patch({ isLoggedIn: false })
      this.$router.push({ path: '/' })
    },
    toggleLeftDrawer () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>

<style scoped>
  .toolbar {
    background-color: crimson;
  }

</style>

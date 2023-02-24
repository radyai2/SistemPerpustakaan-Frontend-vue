import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../components/DashboardView.vue'
import UserView from '../components/UserView.vue'
import BukuView from '../components/BukuView.vue'
import TambahSiswa from '../components/crud_siswa/TambahSiswa.vue'
import TambahBuku from '../components/crud_buku/TambahBuku.vue'
import EditSiswa from '../components/crud_siswa/EditSiswa.vue'
import EditBuku from '../components/crud_buku/EditBuku.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView
  },
  {
    path: '/user',
    name: 'UserView',
    component: UserView
  },
  {
    path: '/buku',
    name: 'BukuView',
    component: BukuView
  },
  {
    path: '/tambahsiswa',
    name: 'TambahSiswa',
    component: TambahSiswa
  },
  {
    path: '/tambahbuku',
    name: 'TambahBuku',
    component: TambahBuku
  },
  {
    path: '/editsiswa/:id',
    name: 'EditSiswa',
    component: EditSiswa
  },
  {
    path: '/editbuku/:id',
    name: 'EditBuku',
    component: EditBuku
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

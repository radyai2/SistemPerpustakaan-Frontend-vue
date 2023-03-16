import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../components/DashboardView.vue'
import UserView from '../components/UserView.vue'
import BukuView from '../components/BukuView.vue'
import TambahSiswa from '../components/crud_siswa/TambahSiswa.vue'
import TambahBuku from '../components/crud_buku/TambahBuku.vue'
import EditSiswa from '../components/crud_siswa/EditSiswa'
import EditBuku from '../components/crud_buku/EditBuku.vue'
import Peminjaman from '../components/TransaksiView.vue'
import detailpeminjaman from '../components/peminjaman/DetailPeminjaman.vue'
import tambahpinjam from '../components/peminjaman/TambahPeminjaman.vue'
import denda from '../components/peminjaman/DendaView.vue'
import history from '../components/peminjaman/HistoryView.vue'
import login from '../views/LoginView.vue'

Vue.use(VueRouter)
Vue.use(require('vue-moment'))

const routes = [
  {
    path: '/',
    name: 'DashboardView',
    component: DashboardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user',
    name: 'UserView',
    component: UserView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/buku',
    name: 'BukuView',
    component: BukuView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tambahsiswa',
    name: 'TambahSiswa',
    component: TambahSiswa,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tambahbuku',
    name: 'TambahBuku',
    component: TambahBuku,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'Edit',
    path: '/editsiswa/:id',
    component: EditSiswa,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    name: 'EditBuku',
    path: '/editbuku/:id',
    component: EditBuku,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/peminjaman',
    component: Peminjaman,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/detailpeminjaman/:id',
    component: detailpeminjaman,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/tambahpinjam',
    component: tambahpinjam,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/denda',
    component: denda,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/history',
    component: history,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: login,
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth')) {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

export default router

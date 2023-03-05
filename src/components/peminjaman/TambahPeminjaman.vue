<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Peminjaman</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="card card-primary card-outline">
                        <div class="card-body">
                            <router-link to="/peminjaman" class="btn btn-primary mb-3"> kembali </router-link>
                            <form action="">

                                <label for="nama" class="form-label">Nama:</label>
                                <select v-model="peminjaman.id_siswa" class="form-control" id="nama">
                                    <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa">{{ s.nama_siswa }}
                                    </option>
                                </select>

                                <label for="kelas" class="form-label">Kelas:</label>
                                <select v-model="peminjaman.id_kelas" class="form-control" id="kelas">
                                    <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}
                                    </option>
                                </select>

                                <label for="buku" class="form-label">Buku:</label>
                                <select v-model="peminjaman.id_buku" class="form-control" id="buku">
                                    <option v-for="b in buku" :key="b.id_buku" :value="b.id_buku">{{ b.nama_buku }}
                                    </option>
                                </select>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../template/NavigationBar.vue'
import sidebar from '../template/AppSidebar.vue'
import axios from 'axios'

export default {
    components: {
        'sidebar-component': sidebar,
        'navbar-component': Navbar
    },
    data() {
        return {
            peminjaman: {},
            siswa: {},
            kelas: {},
            buku: {},

        }
    },
    created() {
        this.getsiswa()
        this.getkelas()
        this.getbuku()
    },
    methods: {
        getsiswa() {
            axios.get('http://localhost:8000/api/getsiswa')
                .then(
                    ({ data }) => {
                        this.siswa = data
                    }
                )
        },
        getkelas() {
            axios.get('http://localhost:8000/api/getkelas')
                .then(
                    ({ data }) => {
                        this.kelas = data
                    }
                )
        },
        getbuku() {
            axios.get('http://localhost:8000/api/getbuku')
                .then(
                    ({ data }) => {
                        this.kelas = data
                    }
                )
        }

    }
}

</script>

<template>
    <div>

        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Denda Peminjaman</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-20">
                            <div class="card card-primary card-outline">
                                <div class="card-body">

                                    <!-- <a href="/tambahpinjam" class="btn btn-primary mb-2">Tambah</a> -->

                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">ID</th>
                                                <th>Nama Siswa</th>
                                                <th>Denda</th>
                                                <th>Alasan</th>
                                                <th>Tanggal Kembali</th>
                                                <th>Tenggat</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="p in denda" :key="p.id_peminjaman">
                                                <td>{{ p.id_peminjaman }}</td>
                                                <td>{{ p.nama }}</td>
                                                <td>Rp.{{ p.denda }}</td>
                                                <td>
                                                    <span v-if="p.tgl_kembali > p.tenggat"
                                                        class="badge bg-danger">Terlambat</span>

                                                    <span v-else class="badge bg-danger">Buku rusak</span>
                                                </td>
                                                <td>{{ p.tgl_kembali }}</td>
                                                <td>{{ p.tenggat }}</td>
                                                <td>
                                                    <span v-if="p.status == 'kembali'"
                                                        class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Belum kembali</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button class="btn btn-success" @click="bayardenda(p)"><i
                                                                class="bi bi-gear"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import navbar from '../template/NavigationBar.vue'
import sidebar from '../template/AppSidebar.vue'
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'
// import { Bootstrap4Pagination } from 'laravel-vue-pagination';
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';
// import pagination from 'laravel-vue-pagination'


Vue.use(axios)

export default {
    components: {
        'navbar-component': navbar,
        'sidebar-component': sidebar,
        // 'paginate-component' : pagination
    },
    data() {
        return {
            denda: {},
        }
    },
    mounted() {
        this.gethistory()
    },
    methods: {
        gethistory() {
            axios.get('http://localhost:8000/api/getdenda', {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.denda = data
                    }
                )
        },
        bayardenda(p) {
            swal({
                title: "Ingin membayar denda?",
                text: "Sekali bayar! tidak ada pengembalian dana!!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.put('http://localhost:8000/api/bayardenda/' + p.id_peminjaman, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                            .then((response) => { console.log(response) })
                        swal("Terima kasih telah telah membayar denda!", {
                            icon: "success",
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200);
                    } else {
                        swal("Tidak jadi bayar denda", {
                            icon: 'error'
                        });
                    }
                });
        }
    }
}
</script>
<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Detail Peminjaman</h1>
                        </div>         
                    </div>
                    <router-link to="/peminjaman" class="btn btn-primary">Kembali</router-link>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <span><b>Nama:</b></span>  {{nama}} <br>
                                    <span><b>Alamat:</b></span>  {{alamat}} <br>
                                    <span><b>Judul buku:</b></span>  {{judul_buku}} <br>
                                    <span><b>Tanggal pinjam:</b></span>  {{tgl_pinjam}} <br>
                                    <span><b>Tanggal kembali:</b></span>  {{tgl_kembali}} <br>
                                    <span><b>Status:</b></span>  {{status}} <br>
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

export default {
    components: {
        'navbar-component' : navbar,
        'sidebar-component' : sidebar,
    },
    data(){
        return{
            peminjaman:[],
            id_siswa: '',
            id_kelas: '',
            alamat: '',
            nama: '',
            judul_buku: '',
            tgl_pinjam: '',
            tgl_kembali: '',
            status: '',
        }
    },
    created(){
        this.getdetail(this.$route.params.id)
    },
    methods: {
        getdetail(id_peminjaman){
            axios.get('http://localhost:8000/api/peminjaman/' + id_peminjaman)
            .then(
                (response) => {
                    console.log(response.data[0])
                    this.id_siswa = response.data[0].id_siswa
                    this.id_kelas = response.data[0].id_kelas
                    this.nama = response.data[0].nama
                    this.alamat = response.data[0].alamat
                    this.judul_buku = response.data[0].judul_buku
                    this.tgl_kembali = response.data[0].tgl_kembali
                    this.tgl_pinjam = response.data[0].tgl_pinjam
                    this.status = response.data[0].status
                }
            )
        }
    }
}
</script>
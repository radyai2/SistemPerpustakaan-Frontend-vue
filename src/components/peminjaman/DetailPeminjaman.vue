<template>
    <div>
        <!-- EDIT MODAL -->
        <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel"
            tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Edit Tanggal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="edit_detail">
                            <input type="hidden" v-model="id_peminjaman">

                            
                            <label for="pinjam">Tgl pinjam</label>
                            <input type="date" v-model="tgl_pinjam" id="pinjam" class="form-control">
                            <small>*boleh tidak di ubah</small><br>

                            <label for="kembali">Tgl kembali</label>      
                            <input type="date" v-model="tgl_kembali" id="kembali" class="form-control">

                            <label for="tenggat">Tenggat</label>
                            <input type="date" class="form-control" v-model="tenggat" id="tenggat">
                            <small>*boleh tidak di ubah</small><br>

                            <label for="denda">Denda</label>
                            <input type="number" class="form-control" v-model="denda" id="denda">
                            <small>*Diisi bila perlu</small><br>

                            <input type="submit" class="btn btn-success mt-2" name="" id="">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bayar hoetang -->
        <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2"
            tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Bayar denda</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Hide this modal and show the first with the button below.
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Back to
                            first</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- END EDIT MODAL -->

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
                    <div class="btn-group">
                        <router-link to="/history" class="btn btn-primary">Kembali</router-link>
                        <span v-if="status == 'kembali'"> <button class="btn btn-success" data-bs-target="#exampleModalToggle"
                                data-bs-toggle="modal">Edit</button></span>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <span><b>ID:</b></span> {{ id_peminjaman }} <br>
                                    <span><b>Nama:</b></span> {{ nama }} <br>
                                    <span><b>Alamat:</b></span> {{ alamat }} <br>
                                    <span><b>Judul buku:</b></span> {{ judul_buku }} <br>
                                    <span><b>Tanggal pinjam:</b></span> {{ tgl_pinjam }} <br>
                                    <span><b>Tanggal kembali:</b></span> {{ tgl_kembali }} <br>
                                    <span><b>Tenggat:</b></span> {{ tenggat }} <br>

                                    <span v-if="tgl_kembali == null"><b>Keterangan:</b><span class="badge bg-warning">Belum
                                            kembali</span> </span>
                                    <span v-else-if="tgl_kembali > tenggat"><b>Keterangan:</b><span
                                            class="badge bg-danger">Terlambat</span> </span>
                                    <span v-else><b>Keterangan:</b><span class="badge bg-success">Tepat waktu</span> </span>
                                    <br>

                                    <span><b>Status:</b></span> {{ status }} <br>

                                    <span v-if="tgl_kembali > tenggat"><b>Denda: </b>Rp.{{ denda }} </span>
                                    <span v-else><b>Denda: </b> 0 </span> <br>


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
// import { swal } from 'public/plugins/sweetalert2/sweetalert2.all'
import swal from 'sweetalert'

export default {
    components: {
        'navbar-component': navbar,
        'sidebar-component': sidebar,
    },
    data() {
        return {
            peminjaman: [],
            id_peminjaman: '',
            id_siswa: '',
            id_kelas: '',
            alamat: '',
            nama: '',
            judul_buku: '',
            tgl_pinjam: '',
            tgl_kembali: '',
            status: '',
            denda: '',
            tenggat: '',
        }
    },
    created() {
        this.getdetail(this.$route.params.id)
        // this.edit_detail(this.$route.params.id)
    },
    methods: {
        getdetail(id) {
            axios.get('http://localhost:8000/api/peminjaman/' + id, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    (response) => {
                        console.log(response.data[0])
                        this.id_peminjaman = response.data[0].id_peminjaman
                        this.id_siswa = response.data[0].id_siswa
                        this.id_kelas = response.data[0].id_kelas
                        this.nama = response.data[0].nama
                        this.alamat = response.data[0].alamat
                        this.judul_buku = response.data[0].judul_buku
                        this.tgl_kembali = response.data[0].tgl_kembali
                        this.tgl_pinjam = response.data[0].tgl_pinjam
                        this.status = response.data[0].status
                        this.denda = response.data[0].denda
                        this.tenggat = response.data[0].tenggat
                    }
                )
        },
        edit_detail(){
            let datapeminjaman = {
                id_peminjaman : this.id_peminjaman,
                tgl_pinjam : this.tgl_pinjam,
                tgl_kembali : this.tgl_kembali,
                tenggat : this.tenggat,
                denda : this.denda,
            }
            axios.put('http://localhost:8000/api/editpeminjaman/' + this.id_peminjaman , datapeminjaman, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
            .then(
                (response) => {
                    console.log(response)
                    swal({
                        title: 'Sukses update peminjaman',
                        icon: 'success'
                    })
                    this.$router.push('/history')
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                }
            )
        }
        // bayardenda() {
        //     swal({
        //         title: 'Ingin bayar bayar denda?',
        //         icon: 'warning',
        //         buttons: true,
        //         dangerMode: true
        //     })
        //         .then((willdelete) => {
        //             if (willdelete) {
        //                 axios.put('http://localhost:8000/api/bayardenda/' + this.id_peminjaman)
        //                     .then(
        //                         (response) => {
        //                             console.log(response)
        //                         }
        //                     )
        //                 setTimeout(() => {
        //                     location.reload()
        //                 }, 1200);
        //                 swal({
        //                     title: 'Sukses melunasi denda',
        //                     icon: 'success'
        //                 })
        //             } else {
        //                 swal({
        //                     title: 'Batal bayar denda',
        //                     icon: 'success'
        //                 })
        //             }
        //         })
        // }
    }
}
</script>
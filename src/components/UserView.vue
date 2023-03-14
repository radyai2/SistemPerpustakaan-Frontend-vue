<template>
    <div>
        <!-- MODAL TAMBAH SISWA-->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah Siswa</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="save">
                            <label for="nama" class="form-label">Nama Siswa:</label>
                            <input type="text" class="form-control" required v-model="siswa.nama_siswa" id="nama" autocomplete="off"
                                placeholder="Masukkan nama..">

                            <label for="tgl_lahir" class="form-label">Date:</label>
                            <input type="date" class="form-control" required v-model="siswa.tanggal_lahir" id="tgl_lahir"
                                autocomplete="off">

                            <label for="gender" class="form-label">Gender: </label> <br>
                            <div class="btn-group btn-group-toggle" id="gender" data-toggle="buttons">
                                <label class="btn btn-outline-primary">
                                    <input type="radio" value="L" v-model="siswa.gender"> Laki-laki
                                </label>
                                <label class="btn btn-outline-warning">
                                    <input type="radio" value="P" v-model="siswa.gender"> Perempuan
                                </label>
                            </div><br>

                            <label for="umur">Umur:</label>
                            <input type="number" class="form-control" required v-model="siswa.umur" id="umur">

                            <label for="alamat" class="form-label">Alamat:</label>
                            <input type="text" class="form-control" required v-model="siswa.alamat" id="alamat" autocomplete="off">

                            <br>
                            <input type="submit" class="btn btn-primary">

                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL TAMBAH END -->


        <!-- DETAIL MODAL -->
        <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Detail "{{ nama_siswa }}"</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body table-responsive">
                        <table class="table table-bordered no-margin">
                            <tbody>
                                <tr>
                                    <th>Umur</th>
                                    <td><span>{{ umur }}</span></td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td><span>{{ gender }}</span></td>
                                </tr>
                                <tr>
                                    <th>Tanggal lahir</th>
                                    <td><span>{{ tanggal_lahir }}</span></td>
                                </tr>
                                <tr>
                                    <th>Alamat</th>
                                    <td><span>{{ alamat }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--DETAIL MODAL END -->

        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <h1 class="">Data Anggota</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <!-- <router-link to="/tambahsiswa" class="btn btn-primary mb-2">Tambah</router-link> -->
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"><i><i class="bi bi-person-fill-add"></i></i></button>
                                    <br>
                                    <br>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th>Nama Lengkap</th>
                                                <th>Gender</th>
                                                <th>Alamat</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(siswa, index) in result" :key="siswa.id_siswa">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ siswa.nama_siswa }}</td>
                                                <td>{{ siswa.gender }}</td>
                                                <td>{{ siswa.alamat }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-success"
                                                            @click="getDetail(siswa)" data-bs-toggle="modal"
                                                            data-bs-target="#detailModal"><i
                                                                class="bi bi-search"></i></button>
                                                        <!-- <button type="button" @click="showDetail()" class="btn btn-success" >Detail</button> -->
                                                        <router-link :to="{ path: '/editsiswa/' + siswa.id_siswa }"
                                                            class="btn btn-primary"><i
                                                                class="bi bi-pencil-square"></i></router-link>
                                                        <!-- <a href="" @click.prevent="ShowEdit" class="btn btn-primary">Edit</a> -->
                                                        <button type="button" class="btn btn-danger"
                                                            @click="remove(siswa)"><i class="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table><br>
                                    <!-- <button :disabled="currentPage === 1" @click="setPage(currentPage - 1)" class="btn btn-info">Prev</button>
                                        <button v-for="page in pages" :key="page" @click="setPage(page)" :class="{ active: currentPage === page }" class="btn btn-info">{{ page }}</button>
                                        <button :disabled="currentPage === pageCount" @click="setPage(currentPage + 1)" class="btn btn-info">Next</button> -->
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

import Vue from 'vue';
import axios from 'axios';
import swal from 'sweetalert';

Vue.use(axios);

import NavigationBar from '../components/template/NavigationBar.vue'
import AppSidebar from '../components/template/AppSidebar.vue'
// import AppSidebar from '../components/template/SidebarAdmin2.vue'
// import NavigationBar from '../components/template/NavbarAdmin2.vue'

export default {
    components: {
        'navbar-component': NavigationBar,
        'sidebar-component': AppSidebar,
    },
    data() {
        return {
            result: [],
            siswa: {},
            datakelas: {},
            id_siswa: "",
            // id_kelas: "",
            nama_siswa: "",
            umur: "",
            tanggal_lahir: "",
            gender: "",
            alamat: "",
            // currentPage: 1,
            // pageSize: 5,
            // pageCount: 0,
        }
    },
    mounted() {
        // this.loadData()
        this.getDetail()

    },
    created() {
        this.GetSiswa()
        // this.getDetail()
        this.getkelas()
    },
    methods: {
        // async loadData(){
        //     const response = await axios.get('http://127.0.0.1:8000/api/getsiswa')
        //     this.siswa = response.data

        //     this.pageCount = Math.ceil(this.siswa.length / this.pageSize)
        // },
        // setPage(pageNumber){
        //     this.currentPage = pageNumber
        // },
        // getPaginateSiswa(){
        //     const startIndex = (this.currentPage - 1) * this.pageSize
        //     const endIndex = startIndex + this.pageSize
        //     return this.siswa.slice(startIndex, endIndex)   
        // },

        GetSiswa() {
            var page = "http://127.0.0.1:8000/api/getsiswa";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.result = data;
                }
            );
        },
        getkelas() {
            axios.get('http://127.0.0.1:8000/api/getkelas')
                .then(
                    ({ data }) => {
                        console.log(data);
                        this.datakelas = data;
                    }
                )
        },
        save() {
            this.save_data();
        },
        save_data() {
            axios.post('http://127.0.0.1:8000/api/createsiswa', this.siswa, this.kelas)
                .then(
                    ({ data }) => {
                        swal("Sukses tambah siswa", {
                            icon: "success",
                            buttons: false
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200)
                        this.siswa = data;
                    })
        },
        remove(siswa) {
            swal({
                title: "Are you sure?",
                text: "Kalo dah pencet 'OK' gk bisa dibalikin lo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {

                    var url = 'http://127.0.0.1:8000/api/deletesiswa/' + siswa.id_siswa;
                    axios.delete(url);

                    swal("yah file nya udah kehapus!", {
                        title: "Poof!",
                        icon: "success",
                        button: false
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1300)
                } else {
                    swal("Okee datanya gk jadi di hapus!", {
                        icon: "success"
                    });

                }
            });
            this.userLoad;

        },
        // ShowEdit(){
        //     this.$router.push({
        //         path: '/siswa/:id/edit',
        //         params: {
        //             id: this.id
        //         }
        //     })
        // }
        showDetail() {
            swal({
                icon: 'error',
                title: 'Oops...',
                text: 'Masih belum tersedia!',
            })
        },
        getDetail(siswa) {
            axios.get('http://localhost:8000/api/getsiswa/' + siswa.id_siswa)
                .then((response) => {
                    console.log(response.data[0])
                    this.nama_siswa = response.data[0].nama_siswa
                    this.umur = response.data[0].umur
                    this.alamat = response.data[0].alamat
                    this.gender = response.data[0].gender
                    this.tanggal_lahir = response.data[0].tanggal_lahir

                }
                )
        }
    },
    // contohremove(siswa){
    //     axios.delete('http://localhost:8000/api/deletesiswa/' + siswa.id_siswa)
    //     .then(
    //         ({data}) => {
    //             this.siswa = data
    //             alert("sukses hapus data");
    //         }
    //     )
    // },

    // computed: {
    //     pages(){
    //         const pages = []
    //         for (let i = 1; i <= this.pageCount; i++){
    //             pages.push(i)
    //         }
    //         return pages
    //     }
    // }

}
</script>
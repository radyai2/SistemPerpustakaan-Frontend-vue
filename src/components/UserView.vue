<template>
        <div>
            <!-- MODAL -->
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
                                <input type="text" class="form-control" v-model="siswa.nama_siswa" id="nama" autocomplete="off" placeholder="Masukkan nama..">

                                <label for="tgl_lahir" class="form-label">Date:</label>
                                <input type="date" class="form-control" v-model="siswa.tanggal_lahir" id="tgl_lahir" autocomplete="off">
                                
                                <label for="gender" class="form-label">Gender: </label> <br>
                                <div class="btn-group btn-group-toggle" id="gender" data-toggle="buttons">                                                
                                        <label class="btn" style="background-color: lightblue;">
                                            <input type="radio" value="L" v-model="siswa.gender"> Laki-laki
                                        </label>
                                        <label class="btn" style="background-color: pink;">
                                            <input type="radio" value="P" v-model="siswa.gender"> Perempuan
                                        </label>
                                </div><br>

                                <label for="kelas">Kelas:</label>
                                <select v-model="siswa.id_kelas" id="kelas" class="form-control">
                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                                </select>

                                <label for="alamat" class="form-label">Alamat:</label>
                                <input type="text" class="form-control" v-model="siswa.alamat" id="alamat" autocomplete="off">

                                <br>
                                <input type="submit" class="btn btn-primary">

                            </form>
                </div>
                </div>
            </div>
            </div>
            <!-- MODAL END -->

            <navbar-component></navbar-component>
            <sidebar-component></sidebar-component>
            <div class="content-wrapper">            
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0">Data Anggota</h1>
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
                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Tambah</button>
                                        <br><br>
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style="width: 10px">#</th>
                                                    <th>Nama Lengkap</th>
                                                    <th>Kelas</th>
                                                    <th>Gender</th>
                                                    <th>Alamat</th>
                                                    <th>Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(siswa , index) in result" :key="siswa.id_siswa">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ siswa.nama_siswa }}</td>
                                                    <td>{{ siswa.nama_kelas }}</td>
                                                    <td>{{ siswa.gender }}</td>
                                                    <td>{{ siswa.alamat }}</td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <button class="btn btn-success" @click="showDetail(siswa)"> Detail </button>
                                                            <router-link :to="{path : '/editsiswa/' + siswa.id_siswa}" class="btn btn-primary">Edit</router-link>
                                                            <!-- <a href="" @click.prevent="ShowEdit" class="btn btn-primary">Edit</a> -->
                                                            <button type="button" class="btn btn-danger" @click="remove(siswa)"> Hapus </button>
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

    import Vue from 'vue';
    import axios from 'axios';
    import swal from 'sweetalert';

    Vue.use(axios);
    
    import NavigationBar from '../components/template/NavigationBar.vue'
    import AppSidebar from '../components/template/AppSidebar.vue'  

    export default {
        components:{
            'navbar-component' : NavigationBar,
            'sidebar-component' : AppSidebar,
        },
        data() {
            return{
                result: {},
                siswa: {},
                kelas: {},
            }
        },
        created() {
            this.GetSiswa();
            this.DataKelas();
        },
        methods: {
            DataKelas(){
                axios.get('http://127.0.0.1:8000/api/getkelas')
                .then(
                ({data}) => {
                    this.kelas = data
                });
            },
            GetSiswa(){
                var page = "http://127.0.0.1:8000/api/getsiswa";
                axios.get(page).then(
                    ({data})=>{ 
                        console.log(data);
                        this.result = data;
                    }
                );
            },
            save(){
                this.save_data();
            },
            save_data(){
                axios.post('http://127.0.0.1:8000/api/createsiswa', this.siswa,this.kelas)
                .then(
                ({data}) => {
                    swal({
                        title: "Sukses tambah siswa",
                        icon: "success"
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                    this.siswa = data;
                }
            )
            },
            remove(siswa){
                swal({
                title: "Are you sure?",
                text: "Kalo dah pencet 'OK' gk bisa dibalikin lo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
            if (willDelete) {

                var url = 'http://127.0.0.1:8000/api/deletesiswa/'+ siswa.id_siswa;
                axios.delete(url);
                
                swal("yah file nya udah kehapus!", {
                    title: "Poof!",
                icon: "error",
                });
                setTimeout(() => {
                        window.location.reload()
                    }, 1000)
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
            showDetail(){
                swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Masih belum tersedia!',
                })
            },
        }
    }
    </script>
<template>
        <div>
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
                                        <router-link class="btn btn-info mb-2" to="/tambahsiswa">
                                            <i class="fas fa-plus"></i> Tambah
                                        </router-link>
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
                                                <tr v-for="siswa in siswa" :key="siswa.id_siswa">
                                                    <td>{{ siswa.id_siswa }}</td>
                                                    <td>{{ siswa.nama_siswa }}</td>
                                                    <td>{{ siswa.nama_kelas }}</td>
                                                    <td>{{ siswa.gender }}</td>
                                                    <td>{{ siswa.alamat }}</td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <router-link :to="{path: '/editsiswa/'+siswa.id_siswa}" class="btn btn-primary"> Edit </router-link>
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
                siswa: {}
            }
        },
        created() {
            this.GetSiswa();
        },
        methods: {
            GetSiswa(){
                var page = "http://127.0.0.1:8000/api/getsiswa";
                axios.get(page).then(
                    ({data})=>{
                        console.log(data);
                        this.siswa = data;
                    }
                );
            },
            remove(siswa){
                var url = 'http://127.0.0.1:8000/api/deletesiswa/'+ siswa.id_siswa;
                axios.delete(url);
                alert("Sukses delete User");
                this.userLoad;
            }
        }
    }
    </script>
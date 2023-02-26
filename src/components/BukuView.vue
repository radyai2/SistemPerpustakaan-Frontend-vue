<template>
    <div>

        <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                         <form @submit.prevent="save">
                                <label for="nama" class="form-label">Judul buku:</label>
                                <input type="text" class="form-control" v-model="buku.judul_buku" id="nama" autocomplete="off" placeholder="Masukkan nama..">

                                <label for="tgl_lahir" class="form-label">Pengarang:</label>
                                <input type="text" class="form-control" v-model="buku.pengarang" id="tgl_lahir" autocomplete="off">

                                <br>
                                <input type="submit" class="btn btn-primary">

                            </form>
                </div>
                </div>
            </div>
            </div>


        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Buku</h1>
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
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Tambah</button>
                                    <br><br>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th>Judul buku</th>
                                                <th>Pengarang</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="buku in result" :key="buku.id_buku">
                                                <td>{{ buku.id_buku }}</td>
                                                <td>{{ buku.judul_buku }}</td>
                                                <td>{{ buku.pengarang }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link :to="{path: '/editbuku/'+buku.id_buku}" class="btn btn-primary"> Edit </router-link>
                                                        <button type="button" class="btn btn-danger" @click="remove(buku)"> Hapus </button>
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
            result: {},
            buku: {}
        }
    },
    created() {
        this.userLoad();
    },
    methods: {
        userLoad(){
            var page = "http://127.0.0.1:8000/api/getbuku";
            axios.get(page).then(
                ({data})=>{
                    console.log(data);
                    this.result = data;
                }
            );
        },
        remove(buku){
            var url = 'http://127.0.0.1:8000/api/deletebuku/'+ buku.id_buku;
            axios.delete(url);
            alert("Sukses delete buku");
            this.userLoad;
        },
        save(){
            this.save_data();
        },
        save_data(){
            axios.post('http://127.0.0.1:8000/api/createbuku', this.buku)
            .then(
                ({data}) => {
                    alert("Berhasil Tambah Buku");
                    this.$router.push('/buku');
                    this.buku = data;
                }
            )
        },
    }
}
</script>
<template>
    <div>
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
                        <div class="col-md-8">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="/tambahbuku">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th>Judul buku</th>
                                                <th>Gender</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="buku in result" :key="buku.id_buku">
                                                <td>{{ buku.id_buku }}</td>
                                                <td>{{ buku.judul_buku }}</td>
                                                <td>{{ buku.pengarang }}</td>
                                                <td>
                                                    <router-link :to="{path: '/editbuku/'+buku.id_buku}" class="btn btn-primary"> Edit </router-link>
                                                    <button type="button" class="btn btn-danger" @click="remove(buku)"> Hapus </button>
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
            result: {}
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
        }
    }
}
</script>
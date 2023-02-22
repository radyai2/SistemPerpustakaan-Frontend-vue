<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Anggota</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <form>
                                        <label for="nama" class="form-label">Nama:</label>
                                        <input type="text" v-model="siswa.nama_siswa" class="form-control"  id="nama" autocomplete="off" placeholder="Masukkan nama..">

                                        <label for="tgl_lahir" class="form-label">Tanggal Lahir:</label>
                                        <input type="date" v-model="siswa.tanggal_lahir" class="form-control"  id="tgl_lahir">

                                        <label for="gender" class="form-label">Gender:</label>
                                        <select  id="gender" v-model="siswa.gender" class="form-control">
                                        <option value="L">L</option>
                                        <option value="P">P</option>
                                        </select>

                                        <label for="alamat" class="form-labek">Alamat:</label>
                                        <textarea id="alamat" v-model="siswa.alamat" class="form-control"></textarea>
                                        <br>
                                        <input type="submit" class="btn btn-primary">

                                    </form>
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

import NavigationBar from '../template/NavigationBar.vue'
import AppSidebar from '../template/AppSidebar.vue'

export default {
    components:{
        'navbar-component' : NavigationBar,
        'sidebar-component' : AppSidebar,
    },
    data(){
        return{
            siswa: {},
        }
    },
    mounted(){
        const id = this.$route.params.id;
        this.getItem(id);
    },
    methods: {
        getItem(id){
            axios.get('http://127.0.0.1:8000/api/getsiswa/' + id)
            .then(
                res => {
                    this.siswa = res.data;
                }
            );
        },
        UpdateSiswa(){
            axios.put('http://127.0.0.1:8000/api/updatesiswa/' + this.siswa.id_siswa, this.siswa)
            .then(
                res => {
                    console.log(res.data); 
                }
            );
        }
    }
  
}
</script>
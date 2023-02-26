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
                                        <input type="text" class="form-control" v-model="siswa.nama_siswa" id="nama" autocomplete="off" placeholder="Masukkan nama..">

                                        <label for="tgl_lahir" class="form-label">Tanggal Lahir:</label>
                                        <input type="date" class="form-control" v-model="siswa.tanggal_lahir" id="tgl_lahir">

                                        <label for="gender" class="form-label">Gender:</label>
                                        <select v-model="siswa.gender" id="gender" class="form-control">
                                        <option value="L">L</option>
                                        <option value="P">P</option>
                                        </select>

                                        <label for="alamat" class="form-labek">Alamat:</label>
                                        <textarea v-model="siswa.alamat" id="alamat" class="form-control"></textarea>
                                        <br>
                                        <input type="submit"  @click.prevent="save_edit" class="btn btn-primary">

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
    props: ['id'],  
    components:{
        'navbar-component' : NavigationBar,
        'sidebar-component' : AppSidebar,
    },
   data(){
        return{
            siswa:{}
        }
   },
   mounted(){
    this.GetSiswa()
   },
   methods: {
        GetSiswa(){
            axios.get('http://127.0.0.1:8000/api/getsiswa/' + this.$route.params.id)
            .then(
                ({data}) => {
                    console.log(data);
                    this.siswa = data
                }
            );
        },
        save_edit(){
            axios.patch('http://127.0.0.1:8000/api/updatesiswa/' + this.$route.params.id , this.siswa)
            .then(
                ({data}) => {
                    alert('Sukses update siswa');
                    this.$router.push('/user');
                    this.siswa = data;
                }
            );
        },
    }    
}
   

</script>
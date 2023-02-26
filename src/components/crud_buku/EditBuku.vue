<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Buku</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <form @submit.prevent="Edit">           
                                        <label for="buku" class="form-label">Judul Buku:</label>
                                        <input type="text" v-model="buku.judul_buku" class="form-control" id="buku" placeholder="Masukkan judul buku.." autocomplete="off">

                                        <label for="pengarang" class="form-label">Pengarang</label>
                                        <input type="text" v-model="buku.pengarang" class="form-control" id="pengarang" placeholder="Masukkan nama pengarang" autocomplete="off">
                                        <br>
                                        <input type="submit" value="Simpan" class="btn btn-primary">
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
            buku: {},

        }
    },
    methods: {
        Edit(){
            this.EditBuku();
        },
        EditBuku(){
            axios.patch('http://localhost:8000/api/updatebuku/' + this.$router.params.id , this.buku)
            .then(
                ({data}) => {
                    alert('Sukses update buku');
                    this.$router.push('/buku');
                    this.buku = data
                }
            );
        },
    },
   
}
</script>
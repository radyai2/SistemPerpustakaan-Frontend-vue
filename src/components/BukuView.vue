<template>
    <div>

        <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Tambah buku</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                         <form @submit.prevent="save">
                                <label for="nama" class="form-label">Judul buku:</label>
                                <input type="text" class="form-control" v-model="buku.judul_buku" id="nama" autocomplete="off" placeholder="Masukkan nama..">

                                <label for="tgl_lahir" class="form-label">Pengarang:</label>
                                <input type="text" class="form-control" v-model="buku.pengarang" id="tgl_lahir" autocomplete="off">

                                <label for="foto" class="form-label">Foto</label>
                                <input type="file" ref="fileInput" class="form-control">
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
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-bookmark-plus"></i></button>
                                    <br><br>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">ID</th>
                                                <th>Judul buku</th>
                                                <th>Foto</th>
                                                <th>Pengarang</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(buku,index) in result" :key="buku.id_buku">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ buku.judul_buku }}</td>
                                                <td></td>
                                                <td>{{ buku.pengarang }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link :to="{path: '/editbuku/'+buku.id_buku}" class="btn btn-primary"> <i class="bi bi-pencil-square"></i> </router-link>
                                                        <button type="button" class="btn btn-danger" @click="remove(buku)"> <i class="bi bi-trash"></i> </button>
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
            buku: {}
        }
    },
    created() {
        this.userLoad();
    },
    methods: {
        userLoad(){
            // var page = "http://127.0.0.1:8000/api/getbuku";
            axios.get('http://127.0.0.1:8000/api/getbuku' , {headers : {'Authorization' : 'Bearer' + this.$store.state.token}}).then(
                ({data})=>{
                    console.log(data);
                    this.result = data;
                }
            );
        },
        remove(buku){
            swal({
                title: "Are you sure?",
                text: "Kalo dah pencet 'OK' gk bisa dibalikin lo",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
            if (willDelete) {
                // var url = 'http://127.0.0.1:8000/api/deletebuku/'+ buku.id_buku;
                    axios.delete('http://127.0.0.1:8000/api/deletebuku/'+ buku.id_buku , {headers : {'Authorization' : 'Bearer' + this.$store.state.token}});
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
        save(){
            this.save_data();
        },
        save_data(){
            axios.post('http://127.0.0.1:8000/api/createbuku', this.buku ,  {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
            .then(
                ({data}) => {
                    swal({
                        title: "Sukses tambah buku",
                        icon: "success"
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                    this.$router.push('/buku');
                    this.buku = data;
                }
            )
        },
        showDetail(){
            swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Masih belum tersedia!',
            })
        }
    }
}
</script>
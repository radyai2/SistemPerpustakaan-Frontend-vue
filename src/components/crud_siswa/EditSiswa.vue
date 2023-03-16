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
                            <form @submit.prevent="save_edit">
                                <input type="hidden" v-model="id_siswa">
                                <label for="nama" class="form-label">Nama:</label>
                                <input type="text" class="form-control" v-model="nama_siswa" id="nama" autocomplete="off"
                                    placeholder="Masukkan nama..">

                                <label for="tgl_lahir" class="form-label">Tanggal Lahir:</label>
                                <input type="date" class="form-control" v-model="tanggal_lahir" id="tgl_lahir">

                                <label for="gender" class="form-label">Gender:</label>
                                <select v-model="gender" id="gender" class="form-control">
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>

                                <label for="umur">Umur:</label>
                                <input type="number" v-model="umur" class="form-control" id="umur">

                                <label for="alamat" class="form-label">Alamat:</label>
                                <input type="text" v-model="alamat" id="alamat" class="form-control">
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
import swal from 'sweetalert';

Vue.use(axios);

import NavigationBar from '../template/NavigationBar.vue'
import AppSidebar from '../template/AppSidebar.vue'

export default {
    components: {
        'navbar-component': NavigationBar,
        'sidebar-component': AppSidebar,
    },
    data: function () {
        return {
            siswa: [],
            id_siswa: "",
            umur: "",
            nama_siswa: "",
            tanggal_lahir: "",
            gender: "",
            alamat: "",
            kelas: {},
        }
    },
    mounted() {
        this.GetSiswa(),
            this.getdetail(this.$route.params.id),
            this.DataKelas()
    },
    methods: {
        GetSiswa() {
            axios.get('http://127.0.0.1:8000/api/getsiswa',{headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.siswa = data
                    }
                );
        },
        DataKelas() {
            axios.get('http://127.0.0.1:8000/api/getkelas',{headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.kelas = data
                    }
                );
        },
        getdetail(id_siswa) {
            axios.get('http://127.0.0.1:8000/api/getsiswa/' + id_siswa,{headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then((response) => {
                    console.log(response.data[0])
                    this.id_siswa = response.data[0].id_siswa
                    this.umur = response.data[0].umur
                    this.nama_siswa = response.data[0].nama_siswa
                    this.tanggal_lahir = response.data[0].tanggal_lahir
                    this.gender = response.data[0].gender
                    this.alamat = response.data[0].alamat
                })
        },
        save_edit: function () {
            let DataSiswa = {
                id_siswa: this.id_siswa,
                umur: this.umur,
                nama_siswa: this.nama_siswa,
                tanggal_lahir: this.tanggal_lahir,
                gender: this.gender,
                alamat: this.alamat

            }
            axios.put("http://127.0.0.1:8000/api/updatesiswa/" + this.id_siswa, DataSiswa, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    res => {
                        swal({
                            title: "Sukses update siswa",
                            icon: "success"
                        })
                        console.log(res)
                        this.$router.push('/user')
                    }

                )
        },
    }
}


</script>
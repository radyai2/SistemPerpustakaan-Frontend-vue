
<template>
    <div>

        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">History Peminjaman</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-20">
                            <div class="card card-primary card-outline">
                                <div class="card-body">

                                    <!-- <a href="/tambahpinjam" class="btn btn-primary mb-2">Tambah</a> -->
                                    <div class="btn-group">
                                        <button class="btn btn-outline-danger mb-2" @click="generatePDF()"><i
                                                class="bi bi-download"></i> PDF</button>
                                        <button class="btn btn-outline-success mb-2" @click="exportToExcel()"><i
                                                class="bi bi-download"></i> EXCEL</button>
                                    </div>

                                    <table class="table table-bordered" ref="table">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">ID</th>
                                                <th>Nama Siswa</th>
                                                <th>Buku</th>
                                                <th>Tanggal Pinjam</th>
                                                <th>Tanggal Kembali</th>
                                                <th>Tenggat</th>
                                                <th>Status</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="p in history" :key="p.id_peminjaman">
                                                <td>{{ p.id_peminjaman }}</td>
                                                <td>{{ p.nama }}</td>
                                                <td>{{ p.judul_buku }}</td>
                                                <td>{{ p.tgl_pinjam }}</td>
                                                <td>{{ p.tgl_kembali }}</td>
                                                <td>{{ p.tenggat }}</td>
                                                <td>
                                                    <span v-if="p.status == 'kembali'"
                                                        class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Belum kembali</span>
                                                </td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link :to="{ path: '/detailpeminjaman/' + p.id_peminjaman }"
                                                            class="btn btn-primary"> <i class="bi bi-search"></i>
                                                        </router-link>
                                                        <button class="btn btn-danger" @click="hapus(p)"><i
                                                                class="bi bi-trash"></i></button>
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

import navbar from '../template/NavigationBar.vue'
import sidebar from '../template/AppSidebar.vue'
import axios from 'axios'
import Vue from 'vue'
import swal from 'sweetalert'


import xlsx from "xlsx/dist/xlsx.full.min"
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// npm install xlsx --save
// npm install exceljs --save

// import { Bootstrap4Pagination } from 'laravel-vue-pagination';
// import { Bootstrap5Pagination } from 'laravel-vue-pagination';
// import pagination from 'laravel-vue-pagination'


Vue.use(axios)

export default {
    components: {
        'navbar-component': navbar,
        'sidebar-component': sidebar,
        // 'paginate-component' : pagination
    },
    data() {
        return {
            history: {},
        }
    },
    mounted() {
        this.gethistory()
    },
    methods: {
        gethistory() {
            axios.get('http://localhost:8000/api/gethistory', {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                .then(
                    ({ data }) => {
                        this.history = data
                    }
                )
        },
        hapus(p) {
            swal({
                title: "Are you sure?",
                text: "Kalo dah pencet 'OK' gk bisa di balikin!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    axios.delete('http://localhost:8000/api/deletepeminjaman/' + p.id_peminjaman, {headers : {'Authorization' : 'Bearer' + this.$store.state.token}})
                    swal("Poof! data peminjaman sudah ke hapus!", {
                        icon: "success",
                        button: false
                    });
                    setTimeout(() => {
                        window.location.reload()
                    }, 1200);
                } else {
                    swal("Oke datanya gk jadi di hapus!", { icon: 'success' });

                }
            });
        },
        generatePDF() {
            swal({
                title: 'Export PDF?',
                buttons: true,
                dangerMode: true
            }).then(
                (download) => {
                    if (download) {
                        const table = this.$refs.table;
                        html2canvas(table).then(canvas => {
                            const imgData = canvas.toDataURL('image/png');
                            const pdf = new jsPDF('p', 'mm', 'a4');
                            const tableWidth = table.offsetWidth;
                            const tableHeight = table.offsetHeight;
                            const imgWidth = pdf.internal.pageSize.getWidth() - 20;
                            const imgHeight = (tableHeight * imgWidth) / tableWidth;
                            const x = 10;
                            const y = 10;
                            pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
                            pdf.save('History.pdf');
                        });
                        swal({
                            icon: 'success',
                            title: 'Downloaded',
                            timer: 1000,
                            buttons: false
                        })
                    }
                }
            )
        },
        exportToExcel() {
            swal({
                title: "Export Excel?",
                buttons: true,
                dangerMode: true
            }).then(
                (download) => {
                    if (download) {
                        const worksheet = xlsx.utils.json_to_sheet(this.history);
                        const workbook = xlsx.utils.book_new();
                        xlsx.utils.book_append_sheet(workbook, worksheet, 'history');
                        xlsx.writeFile(workbook, 'history_peminjaman.xlsx');

                        swal({
                            title: 'Downloaded',
                            icon: 'success',
                            timer: 1000,
                            buttons: false
                        })
                    }
                }
            )
        }
    }
}
</script>
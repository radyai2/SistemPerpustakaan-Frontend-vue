<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="#" class="brand-link">
            <span class="brand-text font-weight-light">Perpustakaan</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <a href="/" class="nav-link">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <!-- <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-user-friends"></i>
                        <p>Anggota</p>
                    </a>
                </li> -->
        
                    
                    <li class="nav-item">
                        <a href="/user" class="nav-link">
                            <i class="nav-icon fas bi bi-people-fill"></i>
                            <p>Anggota</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/buku" class="nav-link">
                            <i class="nav-icon fas bi bi-book-half"></i>
                            <p>Buku</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/peminjaman" class="nav-link">
                            <i class="fas fa-file-export nav-icon"></i>
                            <p>Peminjaman</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/denda" class="nav-link">
                            <i class="fas bi bi-currency-dollar nav-icon"></i>
                            <p>Denda</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/history" class="nav-link">
                            <i class="fas bi bi-clock-history nav-icon"></i>
                            <p>History</p>
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>


</script>
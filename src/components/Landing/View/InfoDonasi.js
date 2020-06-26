import React from 'react'
import { Link } from 'react-router-dom'

import BigCard from '../BigCard'
import BigCardList from '../BigCardList'
import DaftarLembaga from './DaftarLembaga'

const InfoDonasi = () => (
    <div className="bg-gray-200 py-16">
        <h3 className="text-center text-blue-800 text-xl md:text-2xl font-bold mb-4">Info Donasi</h3>
        <p className="text-center text-gray-800 text-xs md:text-sm leading-relaxed max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl px-4 mx-auto mb-8">
            {/* SONJO Husada membantu pengadaan logistik medis dan non medis. Donasi yang terkumpul melalui gerakan ini di
            lembaga-lembaga kemanusiaan di bawah akan disalurkan langsung ke RS dan Puskesmas untuk logistik Fasyankes
            di DIY. SONJO Husada juga menerima sumbangan dalam bentuk barang yang bisa dikoordinasikan bersama. */}
            SONJO Husada adalah program kerjasama antara Sambatan Jogja (SONJO) dan Tim Relawan Covid 19. Program ini bertujuan untuk menyalurkan bantuan logistik ke rumah sakit, puskesmas, klinik (fasilitas layanan kesehatan)  di Daerah Istimewa Yogyakarta dalam menghadapi Covid-19. Pemenuhan  logistik ditujukan untuk semua yg berjuang  di garda depan para Tenaga Kesehatan, Pasien dan Keluarga. Untuk mendukung program SONJO Husada, situs <strong>Peduli Corona</strong> dibangun untuk mempermudah donatur/ masyarakat yang peduli untuk meringankan dengan memenuhi kebutuhan logistik medis & non-medis.Situs ini dikembangkan oleh Tim Relawan Covid 19 dan gerakan Sambatan Jogja (SONJO).
        </p>

        <BigCard title="Langkah Donasi Barang dan Alat Kesehatan">
            <BigCardList number="1">
                Silakan <Link to="/login" className="font-semibold text-blue-800 hover:underline">login</Link> ke dashboard.
                Jika belum memiliki akun, silakan <Link to="/daftar" className="font-semibold text-blue-800 hover:underline">daftar</Link> sebagai ‘Donatur’ terlebih dahulu
            </BigCardList>

            <BigCardList number="2">
                Setelah masuk ke dashboard, pilih menu <span className="font-semibold">‘Input Bantuan’</span> untuk menginputkan informasi barang yang akan didonasikan
            </BigCardList>

            <BigCardList number="3">
                Jika hendak mengalokasikan donasi yang sudah diinputkan, pastikan donasi tersebut sudah memiliki keterangan 'Ready' sebagai tanda bahwa donasi tersebut sudah dikonfirmasi oleh admin sistem
            </BigCardList>

            <BigCardList number="4">
                Pilih menu <span className="font-semibold">‘Alokasi Bantuan’</span>, kemudian pilih permohonan bantuan yang akan dibantu. Setelah memilih, alokasikan donasi berupa barang yang sudah berlabel 'Ready'
            </BigCardList>

            <BigCardList number="5">
                Jika membutuhkan dokumen bukti penyerahan bisa didownload di link berikut <a href="shorturl.at/uxCWY"><strong>shorturl.at/uxCWY. </strong></a>
                Dokumen yang sudah diisi dan foto bukti donasi kemudian bisa diunggah melalui <a href="shorturl.at/hyFVW"><strong>shorturl.at/hyFVW</strong></a> atau dikirimkan ke e-mail 
                <strong> sonjo.supply.demand@gmail.com</strong>
            </BigCardList>
        </BigCard>

        <BigCard title="Langkah Donasi Dana">
            <BigCardList number="1">
                Pilih salah satu lembaga sosial yang ingin menjadi tujuan penerima donasi
                </BigCardList>
            <BigCardList number="2">
                Transfer ke nomor rekening lembaga pilihan Anda. Untuk memudahkan administrasi, setiap transaksi untuk
                kegiatan ini ditambahkan angka 123. Misal Anda ingin mendonasikan Rp50.000, tambahkan 123 di akhir
                sehingga menjadi Rp50.123
            </BigCardList>
            <BigCardList number="3">
                Jika membutuhkan dokumen bukti penyerahan bisa didownload di link berikut <a href="shorturl.at/uxCWY"><strong>shorturl.at/uxCWY. </strong></a>
                Dokumen yang sudah diisi dan foto bukti donasi kemudian bisa diunggah melalui <a href="shorturl.at/hyFVW"><strong>shorturl.at/hyFVW</strong></a> atau dikirimkan ke e-mail 
                <strong> sonjo.supply.demand@gmail.com</strong>
            </BigCardList>
        </BigCard>

        <h3 className="text-center text-blue-800 text-sm md:text-lg font-bold mb-6 mt-20">Daftar Lembaga Sosial</h3>
        <DaftarLembaga />
    </div>
)

export default InfoDonasi
import React from 'react'
import { Link } from 'react-router-dom'

import BigCard from './BigCard'
import BigCardList from './BigCardList'

const PengajuanBantuan = () => (
    <div className="bg-gray-100 py-16">
        <h3 className="text-center text-blue-800 text-xl md:text-2xl font-bold mb-4">Pengajuan Bantuan</h3>
        <p className="text-center text-gray-800 text-xs md:text-sm leading-relaxed max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl px-4 mx-auto mb-8">
            Apabila lembaga Anda membutuhkan bantuan barang atau alat kesehatan, Anda dapat mengajukan permohonan bantuan
            dengan mengikuti langkah-langkah berikut.
        </p>

        <BigCard title="Langkah Pengajuan Permohonan Bantuan">
            <BigCardList number="1">
                Silakan <Link to="/login" className="font-semibold text-blue-800 hover:underline">login</Link> ke dashboard. 
                Jika belum memiliki akun, silakan <Link to="/daftar" className="font-semibold text-blue-800 hover:underline">daftar</Link> sebagai ‘Pemohon Bantuan’ terlebih dahulu
            </BigCardList>
            <BigCardList number="2">
                Setelah masuk ke dashboard, pilih menu <span className="font-semibold">‘Input Kebutuhan’</span> untuk menginputkan informasi barang atau alat kesehatan yang dibutuhkan
            </BigCardList>
        </BigCard>
    </div>
)

export default PengajuanBantuan
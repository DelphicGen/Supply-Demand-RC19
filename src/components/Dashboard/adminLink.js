import React from 'react'
import { CheckBox, ConfirmationNumber, CardGiftcard } from '@material-ui/icons'

export const links = [
    {
        link: '/dashboard/tambah-barang',
        icon: (<CheckBox className="text-white" fontSize="small" />),
        info: 'Tambah Barang'
    },
    {
        link: '/dashboard/konfirmasi-donasi',
        icon: (<ConfirmationNumber className="text-white" fontSize="small" />),
        info: 'Konfirmasi Donasi'
    },
    {
        link: '/dashboard/riwayat-alokasi',
        icon: (<CardGiftcard className="text-white" fontSize="small" />),
        info: 'Riwayat Alokasi'
    }
]
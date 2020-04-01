import React from 'react'
import {CardGiftcardOutlined, CheckBox} from '@material-ui/icons'

export const links = [
    {
        link: '/dashboard/alokasi-bantuan',
        icon: (<CardGiftcardOutlined className="text-white" fontSize="small" />),
        info: 'Alokasi Bantuan'
    },
    {
        link: '/dashboard/tambah-barang',
        icon: (<CheckBox className="text-white" fontSize="small" />),
        info: 'Tambah Barang'
    }
]
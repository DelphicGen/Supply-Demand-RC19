import React from 'react'
import { Create, CardGiftcard, CardGiftcardOutlined } from '@material-ui/icons';

export const links = [
    {
        link: '/dashboard/input-bantuan',
        icon: (<Create className="text-white" fontSize="small" />),
        info: 'Input Bantuan'
    },
    {
        link: '/dashboard/donasi-saya',
        icon: (<CardGiftcard className="text-white" fontSize="small" />),
        info: 'Donasi Saya'
    },
    {
        link: '/dashboard/alokasi-bantuan',
        icon: (<CardGiftcardOutlined className="text-white" fontSize="small" />),
        info: 'Alokasi Bantuan'
    }
]
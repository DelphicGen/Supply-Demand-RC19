import React from 'react'
import { Favorite, Create, CardGiftcard, CardGiftcardOutlined } from '@material-ui/icons';

export const links = [
    {
        link: '/dashboard/info-demand',
        icon: (<Favorite className="text-white" fontSize="small" />),
        info: 'Info Demand'
    },
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
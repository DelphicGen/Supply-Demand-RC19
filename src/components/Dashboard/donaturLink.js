import React from 'react'
import { Create, CardGiftcard, DoubleArrowRounded } from '@material-ui/icons';

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
        icon: (<DoubleArrowRounded className="text-white" fontSize="small" />),
        info: 'Alokasi Bantuan'
    }
]
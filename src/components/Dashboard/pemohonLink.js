import React from 'react'
import { Favorite, CardGiftcard } from '@material-ui/icons';

export const links = [
    {
        link: '/dashboard/input-kebutuhan',
        icon: (<Favorite className="text-white" fontSize="small" />),
        info: 'Input Kebutuhan'
    },
    {
        link: '/dashboard/riwayat-kebutuhan',
        icon: (<CardGiftcard className="text-white" fontSize="small" />),
        info: 'Riwayat Permohonan'
    },
   
]
import React from 'react'
import { Favorite, Create, CardGiftcard } from '@material-ui/icons';

export const links = [
    {
        link: '/dashboard/input-kebutuhan',
        icon: (<Favorite className="text-white" fontSize="small" />),
        info: 'Input Kebutuhan'
    },
    {
        link: '/dashboard/riwayat-kebutuhan',
        icon: (<Create className="text-white" fontSize="small" />),
        info: 'Riwayat Kebutuhan'
    },
   
]
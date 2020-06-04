import React from 'react'

import SmallCard from '../SmallCard'

const listLembaga1 = [
    {
        title: 'NU CARE - LAZISNU DIY',
        bank: 'Bank Mandiri',
        account: {
            number: '137 000 1926 883'
        }
    },
    {
        title: 'YAYASAN RUMPUN NURANI',
        bank: 'Bank Syariah Mandiri',
        account: {
            number: '714781449',
            name: 'Yayasan Rumpun Nurani'
        },
        contact: {
            name: 'Luki',
            number: '+62 818-0422-5566'
        },
        instagram: '@rumpunnurani'
    },
    {
        title: 'KAGAMADOK',
        bank: 'Bank BRI',
        account: {
            number: '0029-01-001966-56-6',
            name: 'Kagama Kedokteran'
        },
        contact: {
            name: 'Awalia Febriana',
            number: '+62 812-3371-3474'
        }
    },
    {
        title: 'LAZIS UNISIA (UII)',
        bank: 'Bank Syariah Mandiri',
        account: {
            number: '712-734-5222',
            name: 'Lazis UII'
        },
        contact: {
            name: 'Lazis Unisia UII',
            number: '+62 852-2805-9087'
        }
    },
    {
        title: 'YAYASAN INDONESIA BERTAUHID',
        bank: 'Bank BNI Syariah',
        account: {
            number: '644 744 644 3',
            name: 'Yayasan Indonesia Bertauhid'
        },
        contact: {
            name: 'Wildan Sonjo Legawa⁩',
            number: '+62 813-9326-6877'
        }
    },
    {
        title: 'AKSI CEPAT TANGGAP',
        bank: 'Bank BNI/BNI Syariah',
        account: {
            number: '341 854 750',
            name: 'Aksi Cepat Tanggap'
        },
        contact: {
            name: 'Onny ACT',
            number: '+62 813-2771-8919'
        }
    }
]

const DaftarLembaga = props => (
    <div className="w-11/12 mx-auto md:grid md:justify-center" style={{gridTemplateColumns: 'repeat( auto-fill, minmax(256px, 292px) )'}}>
        {listLembaga1.map(lembaga => (
            <SmallCard
                key={lembaga.title}
                title={lembaga.title}
                bank={lembaga.bank}
                account={lembaga.account}
                contact={lembaga.contact}
                instagram={lembaga.instagram} />
        ))}
    </div>
)

export default DaftarLembaga
import React, {useState, useMemo, useContext} from 'react'
import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import { links } from '../../../components/Dashboard/donaturLink'
import {AuthContext} from '../../../context/auth-context'

const InfoDemand = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)
    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no'
            },
            {
                Header: 'Nama Barang',
                accessor: 'namabarang'
            },
            {
                Header: 'Kuantitas',
                accessor: 'kuantitas'
            }
        ]       
    )
    const data = useMemo(
        () => [
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            },
            {
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                namabarang: 'Barang3',
                kuantitas: '3'
            }
        ]
      )

    return (
        <div className="flex items-center md:pt-0 pt-10 md:pb-0 pb-24">
            <Sidebar role="Donatur" name={name} links={links} />
            <Table columns={ columns } data={ data } title='Info Demand' />
        </div>
    )
}

export default InfoDemand

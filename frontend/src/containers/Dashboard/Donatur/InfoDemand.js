import React, {useState, useMemo} from 'react'
import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import { links } from '../../../components/Dashboard/donaturLink'

const InfoDemand = () => {
    const [name, setName] = useState('BPD DIY')
    // const [data, setData] = useState()
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
    const data = React.useMemo(
        () => [
            {
                no: '1',
                namabarang: 'Barang1',
                kuantitas: '1'
            },
            {
                no: '2',
                namabarang: 'Barang2',
                kuantitas: '2'
            },
            {
                no: '3',
                namabarang: 'Barang3',
                kuantitas: '3'
            }
        ]
      )
    

    return (
        <div className="flex items-center">
            <Sidebar role="Donatur" name={name} links={links} />
            <Table columns={ columns } data={ data } />
        </div>
    )
}

export default InfoDemand

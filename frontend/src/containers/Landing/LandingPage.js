import React, {useMemo} from 'react'
import Table from '../../components/Dashboard/Table'

const LandingPage = () => {

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

    return(
        <React.Fragment>
            <div>

            </div>
            <Table colums={ columns } data={ data } />
        </React.Fragment>
    )
}

export default LandingPage
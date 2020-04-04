import React, {useMemo} from 'react'
import logo from '../../images/LandingPage.png'

import Button from '../../components/UI/Button'
import WhiteButton from '../../components/UI/WhiteButton'
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
            <div className="flex items-center justify-center py-10 lg:flex-row flex-col">
                <img style={{height: '280px', width: '280px'}} src={logo} alt="doctor-with-mask" />
                <div className="md:pl-10 px-10">
                    <p className="text-blue-800 md:mt-0 mt-10 font-bold md:text-4xl text-3xl lg:text-left text-center">Website Kebutuhan Bantuan Barang</p>
                    <p className="text-red-600 font-bold md:text-5xl text-4xl lg:text-left text-center">Covid-19</p>
                    <div className="mt-10 lg:text-left text-center">
                        <Button to="/login" exact>LOGIN</Button>
                        <WhiteButton to="/daftar" exact>REGISTER</WhiteButton>
                    </div>
                </div>
            </div>
            <Table columns={ columns } data={ data } />
            <div className="bg-blue-800 text-white py-10 mt-20">
                <h5 className="text-xl text-center">Icon by JustIcon</h5>
            </div>
        </React.Fragment>
    )
}

export default LandingPage
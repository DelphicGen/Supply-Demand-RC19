import React, {useMemo} from 'react'
import {Link} from 'react-router-dom'
import Table from '../../components/Dashboard/Table'
import logo from '../../images/LandingPage.png'
import {useMediaQuery} from '../../components/Dashboard/Hooks';

const LandingPage = () => {
    const mediaQuery = useMediaQuery('(max-width: 419px)');
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
        <div className="pb-20">
            <div className="flex items-center justify-center py-10 lg:flex-row flex-col">
                <img style={{height: '280px', width: '280px'}} src={logo} alt="doctor-with-mask" />
                <div className="md:pl-10 px-10">
                    <p className="text-blue-800 md:mt-0 mt-10 font-bold md:text-4xl text-3xl lg:text-left text-center">Website Kebutuhan Bantuan Barang</p>
                    <p className="text-red-600 font-bold md:text-5xl text-4xl lg:text-left text-center">Covid-19</p>
                    <div className="mt-10 lg:text-left text-center">
                        <Link to="/daftar">
                            <button
                                className="p-2 bg-blue-800 rounded-md focus:outline-none shadow-xl text-gray-200 mr-10 text-lg font-bold tracking-widest transform hover:scale-95 hover:shadow-none duration-300"
                                style={styles.container(mediaQuery)}
                                type="submit"
                            >
                                LOGIN
                            </button>
                        </Link>
                        <Link to="/daftar">
                            <button
                                className="p-2 bg-white rounded-md focus:outline-none shadow-xl text-blue-800 text-lg font-bold tracking-widest transform hover:scale-95 hover:shadow-none duration-300"
                                // style={{width: 150, maxHeight: 41}}
                                style={styles.container(mediaQuery)}
                                type="submit"
                            >
                                REGISTER
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Table columns={ columns } data={ data } />
        </div>
    )
}

const styles = {
    container: mediaQuery => ({
        marginRight: mediaQuery && '10px',
        width: mediaQuery ? 120 : 150,
        maxHeight: 41
    })
};

export default LandingPage
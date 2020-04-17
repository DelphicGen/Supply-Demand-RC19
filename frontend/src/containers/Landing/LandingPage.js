import React, {useState, useContext, useEffect} from 'react'
import {AuthContext} from '../../context/auth-context'
import {useHttpClient} from '../../hooks/http-hook'

import logo from '../../images/LandingPage.png'
import Button from '../../components/UI/Button'
import RadioTextInput from '../../components/Form/RadioTextInput'
import WhiteButton from '../../components/UI/WhiteButton'
import Table from '../../components/Dashboard/Table'

const LandingPage = () => {
    const [table, setTable]= useState('kebutuhan')
    const columns = [
            {
                Header: 'No',
                accessor: 'no'
            },
            {
                Header: 'Nama Barang',
                accessor: 'item'
            },
            {
                Header: 'Kuantitas',
                accessor: 'quantity'
            }
        ]

    const [dataDemand, setDataDemand] = useState([])
    const [dataStock, setDataStock] = useState([])
    const {isLoading, error, sendRequest} = useHttpClient()

    const radioChangeHandler = event => {
        setTable(event.target.value)
    }

    const auth = useContext(AuthContext)

    let dashboardLink = '/dashboard/alokasi-bantuan'

    if(auth.role === 'DONATOR'){
        dashboardLink = '/dashboard/donasi-saya'
    } else if(auth.role === 'APPLICANT'){
        dashboardLink = '/dashboard/riwayat-permohonan'
    }

    useEffect(() => {
        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json'}
        ).then(responseData => {
            console.log(responseData)
            // setDataDemand(responseData.data.requestItems)
        }, [sendRequest])

        sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/v1/stocks`,
            'GET',
            null,
            {'Accept': 'application/json', 'Content-Type': 'application/json'}
        ).then(responseData => {
            console.log(responseData)
            if(responseData){
                // setDataStock(responseData.data)
            }
        })
    }, [sendRequest])

    return(
        <React.Fragment>
            <div className="flex items-center justify-center py-10 lg:flex-row flex-col">
                <img style={{height: '280px', width: '280px'}} src={logo} alt="doctor-with-mask" />
                <div className="md:pl-10 px-10">
                    <p className="text-blue-800 md:mt-0 mt-4 font-bold md:text-4xl text-3xl lg:text-left text-center">Website Kebutuhan Bantuan Barang</p>
                    <p className="text-red-600 font-bold md:text-5xl text-4xl lg:text-left text-center">Covid-19</p>
                    <div className="mt-4 lg:text-left text-center">
                        {!auth.isLogin ?
                            <React.Fragment>
                                <Button to="/login">LOGIN</Button>
                                <WhiteButton to="/daftar">DAFTAR</WhiteButton>
                            </React.Fragment> 
                            : <Button to={dashboardLink}>DASHBOARD</Button>
                        }
                    </div>
                </div>
            </div>

            <p className="text-blue-800 md:mt-0 mt-4 font-bold text-xl md:text-3xl lg:text-4xl text-center">Data Kebutuhan dan Stok</p>
            <div className="flex flex-row justify-center">
                <div className="mt-1 w-2/3 max-w-sm lg:max-w-xl opacity-50 bg-gray-500" style={{height: 2}}></div>
            </div>
            <div className="flex flex-row items-center justify-center mt-5 mb-8">
                <RadioTextInput
                    changed={radioChangeHandler}
                    id="kebutuhan"
                    isSelected={table === 'kebutuhan'}
                    label="Data Kebutuhan"
                    value="kebutuhan" />

                <RadioTextInput
                    changed={radioChangeHandler}
                    id="stok"
                    isSelected={table === 'stok'}
                    label="Data Stok"
                    value="stok" />
            </div>

            <Table columns={ columns } data={ table === 'kebutuhan' ? dataDemand : dataStock } isLandingPage={true} />
            <div className="bg-blue-800 text-white py-10 mt-20 lg:absolute lg:w-full lg:bottom-0">
                <h5 className="text-sm text-center">Icon by JustIcon</h5>
            </div>
        </React.Fragment>
    )
}

export default LandingPage
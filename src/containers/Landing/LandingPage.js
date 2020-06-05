import React, { useState, useEffect } from 'react'
import { Element } from 'react-scroll'
import { useHttpClient } from '../../hooks/http-hook'
import Scroll from 'react-scroll'

import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Button from '../../components/UI/Button'
import ErrorModal from '../../components/UI/ErrorModal'
import logo from '../../images/LandingPage.png'
import Select from '../../components/UI/Select'
import RadioTextInput from '../../components/Form/RadioTextInput'
import Table from '../../components/Dashboard/Table'
import Navbar from '../../components/Landing/Navbar'

// Divs
import InfoDonasi from '../../components/Landing/View/InfoDonasi'
import PengajuanBantuan from '../../components/Landing/View/PengajuanBantuan'
import Contact from '../../components/Landing/View/Contact'
import Credit from '../../components/Landing/View/Credit'

const Link = Scroll.Link

const LandingPage = () => {

    const [table, setTable] = useState('kebutuhan')
    const stockColumns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Nama Barang',
            accessor: data => {
                let output = []
                data.donationItems.map(donation => output.push(donation.item.name))
                return output.join(', ')
            }
        },
        {
            Header: 'Kuantitas',
            accessor: data => {
                let output = []
                data.donationItems.map(donation => output.push(`${donation.quantity % 1 === 0 ? Math.floor(donation.quantity) : donation.quantity} ${donation.unit.name}`))
                return output.join(', ')
            }
        },
        {
            Header: 'Donatur',
            accessor: 'donator'
        },
        {
            Header: 'Kontak',
            accessor: 'contact'
        }
    ]

    const demandColumns = [
        {
            Header: 'No',
            accessor: 'no'
        },
        {
            Header: 'Nama Barang',
            accessor: data => {
                let output = []
                data.requestItems.map(request => output.push(request.item.name))
                return output.join(', ')
            }
        },
        {
            Header: 'Kuantitas',
            accessor: data => {
                let output = []
                data.requestItems.map(request => {
                    let quantity = request.quantity % 1 === 0 ? Math.round(request.quantity) : request.quantity
                    return output.push(`${quantity} ${request.unit.name}`)
                })
                return output.join(', ')
            }
        },
        {
            Header: 'Lembaga Pemohon',
            accessor: 'applicant'
        },
        {
            Header: 'Kontak',
            accessor: 'contact'
        }
    ]

    const [stockItem, setStockItem] = useState([])
    const [demandItem, setDemandItem] = useState([])

    const [dataDemand, setDataDemand] = useState([])
    const [dataStock, setDataStock] = useState([])

    const [filteredDataDemand, setFilteredDataDemand] = useState([])
    const [filteredDataStock, setFilteredDataStock] = useState([])

    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const radioChangeHandler = event => {
        setTable(event.target.value)
    }

    useEffect(() => {
        const fetchDemand = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests?page=1&size=10000`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            ).then(responseData => {
                let demand = ['Semua Item']
                let temp = []
                if (responseData.data) {
                    responseData.data.forEach(data => {
                        temp = [...temp, { requestItems: data.requestItems, applicant: data.donationApplicant.name, contact: data.donationApplicant.contact_number, isFulfilled: data.isFulfilled }]
                        data.requestItems.forEach(item => {
                            if (!demand.includes(item.item.name)) {
                                demand.push(item.item.name)
                            }
                        })
                    })
                    setFilteredDataDemand(temp.filter(tmp => !tmp.isFulfilled))

                    let objectDemand = demand.map(dem => ({ name: dem }))
                    setDemandItem(objectDemand)
                    setDataDemand(temp.filter(tmp => !tmp.isFulfilled))
                }
            })
        }

        const fetchStock = () => {
            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/donations?page=1&size=10000`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            ).then(responseData => {
                let temp = []
                let stock = ['Semua Item']
                if (responseData.data) {
                    responseData.data.forEach(data => {
                        if (data.donationItems) {
                            temp = [...temp, { donationItems: data.donationItems, donator: data.donator.name, contact: data.donator.contact_number, isFulfilled: data.isFulfilled }]
                            data.donationItems.forEach(item => {
                                if (!stock.includes(item.item.name)) {
                                    stock.push(item.item.name)
                                }
                            })
                        }
                    })
                    setFilteredDataStock(temp.filter(tmp => !tmp.isFulfilled))
                    let objectStock = stock.map(st => ({ name: st }))
                    setStockItem(objectStock)
                    setDataStock(temp.filter(tmp => !tmp.isFulfilled))
                }
            })
        }
        if (table === 'stok' && dataStock.length === 0) {
            fetchStock()
        } else if (table === 'kebutuhan' && dataDemand.length === 0) {
            fetchDemand()
        }
    }, [sendRequest, table, dataStock, dataDemand])

    const changeDemand = (demand) => {
        if (demand === 'Semua Item') {
            setFilteredDataDemand(dataDemand)
        } else {
            setFilteredDataDemand(dataDemand.filter(data => data.requestItems.some(item => item.item.name === demand)))
        }
    }

    const changeStock = stock => {
        if (stock === 'Semua Item') {
            setFilteredDataStock(dataStock)
        } else {
            setFilteredDataStock(dataStock.filter(data => data.donationItems.some(item => item.item.name === stock)))
        }
    }

    //Filter
    let filterSelect = null

    if (!isLoading) {
        if ((table === 'kebutuhan' && filteredDataDemand.length > 0) || (table === 'stok' && filteredDataStock.length > 0)) {
            filterSelect = (
                <React.Fragment>
                    <Select
                        onSelectChange={table === 'stok' ? changeStock : changeDemand}
                        label='Filter'
                        landingPage={true}
                        divClassName="items-center mx-auto w-10/12 md:w-8/12 lg:w-7/12 mt-2 lg:mt-0"
                        arrayList={table === 'kebutuhan' ? demandItem : stockItem}
                    />
                    <p className="mx-auto w-10/12 md:w-8/12 lg:w-7/12 text-gray-700 text-xs md:text-sm font-medium mb-2">Note : Item yang tidak ada di filter berarti kosong.</p>
                </React.Fragment>
            )
        }
    }

    //Table
    let content = <div className="w-full flex flex-row justify-center mb-3 pb-4">
        <LoadingSpinner />
    </div>
    if (!isLoading) {
        if (table === 'stok') {
            if (filteredDataStock.length === 0) {
                content = <p className="text-center text-sm md:text-base font-semibold">Maaf, saat ini stok bantuan kosong.</p>
            } else {
                content = <Table columns={stockColumns} data={filteredDataStock} isLandingPage={true} />
            }
        } else {
            if (filteredDataDemand.length === 0) {
                content = <p className="text-center text-sm md:text-base font-semibold">Saat ini tidak ada data kebutuhan.</p>
            } else {
                content = <Table columns={demandColumns} data={filteredDataDemand} isLandingPage={true} />
            }
        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Navbar />

            <Element id='top' name='top'>
                <div className="flex items-center justify-center pt-32 pb-10 lg:flex-row flex-col">
                    <img style={{ height: '280px', width: '280px' }} src={logo} alt="doctor-with-mask" />
                    <div className="md:pl-10 px-10">
                        <p className="text-blue-800 md:mt-0 mt-4 font-bold md:text-4xl text-3xl lg:text-left text-center">Peduli Corona</p>
                        <p className="text-center md:text-justify tracking-wide text-gray-800 text-xs md:text-sm font-normal max-w-sm md:max-w-xl leading-relaxed mb-6 mt-4">
                        Peduli Corona adalah website penyaluran kebutuhan dan stok <i>(supply and demand)</i> bantuan alat kesehatan Covid-19 untuk 
                        RS, Puskesmas, serta fasIilitas dan yayasan kesehatan di Daerah Istimewa Yogyakarta. Website ini dikembangkan oleh 
                        Tim Relawan Covid 19 dan Sambatan Jogja.
                        </p>

                        <div className="flex flex-row flex-wrap justify-center md:justify-start">
                            <div className="mb-4 sm:mr-6">
                                <p className="text-center md:text-left text-gray-800 font-semibold text-xs md:text-sm leading-relaxed mb-3">Ingin berdonasi?</p>
                                <Link
                                    to='donasi'
                                    spy={true}
                                    smooth={true}
                                    duration={750}
                                >
                                    <Button scroll={true}>INFO DONASI</Button>
                                </Link>
                            </div>
                            <div className="">
                                <p className="text-center md:text-left text-gray-800 font-semibold text-xs md:text-sm leading-relaxed mb-3">Ingin mengajukan bantuan?</p>
                                <Link
                                    to='bantuan'
                                    spy={true}
                                    smooth={true}
                                    duration={750}
                                >
                                    <Button scroll={true}>PENGAJUAN BANTUAN</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Element>

            <Element id='data' name='data'>
                <p className="text-blue-800 md:mt-0 mt-8 md:mt-16 lg:mt-20 font-bold text-xl md:text-2xl text-center">Data Kebutuhan dan Bantuan</p>
                <div className="flex flex-row items-center justify-center mt-2 mb-4">
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
                        label="Data Bantuan"
                        value="stok" />
                </div>
                <div className="flex flex-row justify-center mb-4">
                    <div className="mt-1 w-2/3 max-w-sm lg:max-w-xl opacity-50 bg-gray-500" style={{ height: 2 }}></div>
                </div>

                <div className="pb-16">
                    {filterSelect}
                    {content}
                </div>
            </Element>

            <Element id='donasi' name='donasi'>
                <InfoDonasi />
            </Element>

            <Element id='bantuan' name='bantuan'>
                <PengajuanBantuan />
            </Element>

            <Element id="kontak" name="kontak">
                <Contact />
            </Element>

            <Credit />

            <div className="bg-gray-200 py-2">
                <h5 className="text-sm text-center text-blue-800 font-semibold">Icon by JustIcon</h5>
            </div>
        </React.Fragment>
    )
}

export default LandingPage
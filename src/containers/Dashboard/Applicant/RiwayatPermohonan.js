import React, { useMemo, useState, useContext, useEffect } from 'react'
import { links } from '../../../components/Dashboard/pemohonLink'
import { AuthContext } from '../../../context/auth-context'
import { useHttpClient } from '../../../hooks/http-hook'
import { AddCircle } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from '../../../hooks/medquery-hook';

import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import WhiteButton from '../../../components/UI/WhiteButton'
import Title from '../../../components/Dashboard/Title'
import LoadingSpinner from '../../../components/UI/LoadingSpinner'
// import UpdateDonasi from './UpdateDonasi'

const RiwayatPermohonan = () => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest } = useHttpClient()
    const history = useHistory()
    const mediaQuery = useMediaQuery('(max-width: 600px)')

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no'
            },
            {
                Header: 'Nama Barang',
                accessor: 'item'
            },
            {
                Header: 'Stok',
                accessor: 'quantity'
            },
            {
                Header: 'Keterangan',
                accessor: 'keterangan'
            },
            {
                Header: 'Update',
                accessor: 'update'
            }
        ]
    )

    const [dataTable, setDataTable] = useState([])
    const [unitList, setUnitList] = useState([])
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        const fetchItems = () => {
            // sendRequest(
            //     `${process.env.REACT_APP_BACKEND_URL}/v1/units`,
            //     'GET',
            //     null,
            //     {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
            // ).then(responseData => {
            //     setUnitList(responseData)
            // })

            // sendRequest(
            //     `${process.env.REACT_APP_BACKEND_URL}/v1/items`,
            //     'GET',
            //     null,
            //     {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
            // ).then(responseData => {
            //     setItemList(responseData)
            // })


            sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests/user/${auth.id}`,
                'GET',
                null,
                { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
            ).then(responseData => {
                console.log(responseData)
                console.log('response data of request');


                if (responseData) {
                    let temp = []
                    if (responseData.data) {
                        responseData.data.forEach(data => {
                            data.requestItems.forEach(item => {
                                //temp is each object of requestItems
                                temp = [...temp, item]
                            })
                            // temp = [...temp, data.requestItems[0]]
                            // temp = [data.donationItems[0]]

                            console.log(temp)
                            console.log('print temp');
                        })

                        // for each object requestItem add request id is the id of the reqeust at that time;
                        temp.forEach((data, index) => data.request_id = responseData.data[index].id)

                        //for each object rquest id; jika foreach object di main data[] which object.isFulfillled itu 
                        temp.forEach((data, index) => {
                            if (responseData.data[index].isFulfilled) {
                                return (
                                    data.keterangan = (
                                        <div className="inline-block py-1 px-2 rounded-full text-green-600 bg-green-200 text-center">
                                            Sudah Diproses
                                        </div>
                                    )
                                )
                            } else {
                                //else yang isFullfiled is false; belum terfulfill aka belum diprocess; 
                                return (
                                    data.keterangan = (
                                        <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200 text-center">
                                            Belum Diproses
                                        </div>
                                    )
                                )
                            }
                        })

                        temp.forEach((data) => {

                            data.update = (
                                <WhiteButton width={120} onClick={() => update(data)} donasi={true} >
                                    <AddCircle className="text-blue-800 mr-2 text-sm" style={styles.container(mediaQuery)} /><span style={styles2.container(mediaQuery)} className="text-sm">UPDATE</span>
                                </WhiteButton>
                            )
                        })

                        setDataTable(temp)
                    }
                }
            })
        }

        if (auth.token) {
            fetchItems()
        }
    }, [auth.token, sendRequest])

    const update = (data) => {
        console.log(data)
        console.log('this update data');
        localStorage.setItem('selected', JSON.stringify(data))
        // let i
        // let x
        // console.log(list1)
        // for([i, x] of itemList.entries()){
        //     if(x.name === data.item){
        //         localStorage.setItem('selectedItemIndex', JSON.stringify({itemIndex: i}))
        //         break;
        //     }
        // }
        // for([i, x] of unitList.entries()){
        //     if(x.name === data.unit){
        //         localStorage.setItem('selectedUnitIndex', JSON.stringify({unitIndex: i}))
        //         break;
        //     }
        // }
        history.push('/dashboard/riwayat-kebutuhan/update')
    }

    let content = <LoadingSpinner />
    if (!isLoading) {
        if (dataTable.length > 0) {
            content = <Table columns={columns} data={dataTable} />
        } else {
            content = <p className="text-sm font-semibold">Anda belum melakukan donasi.</p>
        }
    }

    return (
        <React.Fragment>
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-r-lg">
                <h5 className="font-semibold text-md text-white">{`Dashboard Pemohon`} </h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className="flex flex-row">
                <Sidebar role="Pemohon" name={auth.name} links={links} />
                <div className="p-8 pb-24 md:p-16 w-full lg:w-11/12">
                    <Title>Permohonan Saya</Title>
                    <div className="h-3"></div>
                    {content}
                </div>
            </div>
        </React.Fragment>
    )
}

const styles = {
    container: mediaQuery => ({
        fontSize: mediaQuery ? '15' : '25'
    })
};

const styles2 = {
    container: mediaQuery => ({
        fontSize: mediaQuery && '10px'
    })
};


export default RiwayatPermohonan
import React, { useMemo, useState, useContext, useEffect } from 'react'
import {links} from '../../../components/Dashboard/pemohonLink'
import {AuthContext} from '../../../context/auth-context'
import {useHttpClient} from '../../../hooks/http-hook'
import {AddCircle} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import {useMediaQuery} from '../../../hooks/medquery-hook';

import Sidebar from '../../../components/Dashboard/SideBar'
import Table from '../../../components/Dashboard/Table'
import WhiteButton from '../../../components/UI/WhiteButton'
import Title from '../../../components/Dashboard/Title'
// import UpdateDonasi from './UpdateDonasi'

const RiwayatPermohonan = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState(auth.name)
    const {isLoading, error, sendRequest} = useHttpClient()
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
                `${process.env.REACT_APP_BACKEND_URL}/v1/requests`,
                'GET',
                null,
                {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}`}
            ).then(responseData => {
                console.log(responseData)
                console.log('response data of request');

 
                if(responseData){
                    let temp = []
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
                        if(responseData.data[index].isFulfilled){
                            return(
                                data.keterangan = (
                                    <div className="inline-block py-1 px-2 rounded-full text-green-600 bg-green-200">
                                        Sudah Diproses
                                    </div>
                                )
                            )
                        } else{
                          //else yang isFullfiled is false; belum terfulfill aka belum diprocess; 
                            return(
                                data.keterangan = (
                                    <div className="inline-block py-1 px-2 rounded-full text-red-800 bg-red-200">
                                        Belum Diproses
                                    </div>
                                )
                            )
                        }
                    })
                    //for each objec request item yg isinya ;
                    // id: "1aZXT7o9koiK94Td6RI6MOHQhzU"
                    // item: "test"
                    // unit: "Ekor"
                    // quantity: "1.00"
                    // request_id: "1aZXT935g3DU0FmBSGaAAJvzzWz"
                    // keterangan: {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
                    // update: isinya react compoonent
                    //
                    
                    temp.forEach((data) => {

                        

                        data.update = (
                            <WhiteButton width={120} onClick={() => update(data)} donasi={true} >
                                <AddCircle className="text-blue-800 mr-2 text-sm" style={styles.container(mediaQuery)} /><span style={styles2.container(mediaQuery)} className="text-sm">UPDATE</span>
                            </WhiteButton>
                        )
                    })

                    setDataTable(temp)
                }
            })
        }

        if(auth.token){
            fetchItems()
        }
    }, [auth.token, sendRequest])

    const update = (data) => {
        localStorage.setItem('selected', JSON.stringify(data))
        history.push('/dashboard/riwayat-permohonan/update')
    }

    return(
        <React.Fragment>
            <div className="p-8 py-4 block md:hidden md:text-left lg:pl-5 md:pl-3 inline-block bg-blue-700 rounded-r-lg">
                <h5 className="font-semibold text-md text-white">{`Dashboard Donatur`} </h5>
                <h2 className="font-semibold text-lg text-white">{auth.name}</h2>
            </div>
            <div className={`items-center md:pt-0 pt-10 md:pb-0 pb-24 flex`}>
                <Sidebar role="" name="PEMOHON" links={links} />
                <div className="flex w-full flex-col py-8 md:p-16" style={{paddingLeft: '5px', paddingRight: '5px'}}>
                    <Title>Permohonan Saya</Title>
                    <Table columns={ columns } data={ dataTable } donasi={true} />
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
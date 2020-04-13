import React from 'react'
import Sidebar from '../../../components/Dashboard/SideBar'
import {links} from '../../../components/Dashboard/pemohonLink'
import Title from '../../../components/Dashboard/Title'



const RiwayatPermohonan = () => {
  return(
    <div className="flex flex-row h-full w-full">

       <Sidebar role="" name="PEMOHON" links={links} />

       <div className="flex w-full flex-col p-8 md:p-16">
                <Title>Riwayat Pemohon</Title>

            </div>
   </div>  

)
}

export default RiwayatPermohonan
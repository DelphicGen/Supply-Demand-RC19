import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth-context'

import Button from '../UI/Button'
import WhiteButton from '../UI/WhiteButton'

const AuthButtonNav = () => {
    const auth = useContext(AuthContext)

    let dashboardLink = '/dashboard/tambah-barang'

    if (auth.role === 'DONATOR') {
        dashboardLink = '/dashboard/donasi-saya'
    } else if (auth.role === 'APPLICANT') {
        dashboardLink = '/dashboard/riwayat-kebutuhan'
    }

    return (
        <React.Fragment>
            {!auth.isLogin ?
                <React.Fragment>
                    <Button to="/login">LOGIN</Button>
                    <WhiteButton to="/daftar">DAFTAR</WhiteButton>
                </React.Fragment>
                : <Button to={dashboardLink}>DASHBOARD</Button>
            }
        </React.Fragment>
    )
}

export default AuthButtonNav
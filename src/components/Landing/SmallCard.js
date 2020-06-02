import React from 'react'
import { CreditCard, LocalPhone, Instagram } from '@material-ui/icons'
import { useMediaQuery } from '../../hooks/medquery-hook'

const SmallCard = props => {
    const mediaQuery = useMediaQuery('(min-width: 768px)')

    return (
        <div className="bg-white mx-auto md:mx-2 mb-3 md:mb-4 rounded-lg shadow-lg" style={styles.container(mediaQuery)}>
            <div className="flex flex-row flex-wrap items-end" style={styles2.container(mediaQuery)}>
                <h5 className="p-5 font-bold text-blue-800 text-md md:text-xl">{props.title}</h5>
            </div>
            <div className="bg-gray-700 w-full h-px"></div>
            <div className="p-5">
                <div className="flex flex-row mb-6">
                    <CreditCard className="text-gray-800" fontSize="small" />
                    <div className="ml-3">
                        <p className="text-xs md:text-sm text-gray-800 mb-1">{props.bank}</p>
                        <p className="text-xs md:text-sm text-gray-800 mb-1">{props.account.number}</p>
                        <p className="text-xs md:text-sm text-gray-800 mb-1">{props.account.name && 'a.n.'} {props.account.name}</p>
                    </div>
                </div>

                {props.contact &&
                    <div className="flex flex-row mb-6">
                        <LocalPhone className="text-gray-800" fontSize="small" />
                        <div className="ml-3">
                            <p className="text-xs md:text-sm text-gray-800 mb-1">{props.contact.name}</p>
                            <p className="text-xs md:text-sm text-gray-800 mb-1">{props.contact.number}</p>
                        </div>
                    </div>
                }

                {props.instagram &&
                    <div className="flex flex-row mb-3">
                        <Instagram className="text-gray-800" fontSize="small" />
                        <div className="ml-3">
                            <p className="text-xs md:text-sm text-gray-800 mb-1">{props.instagram}</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const styles = {
    container: mediaQuery => ({
        width: mediaQuery ? '280px' : '80%',
        height: mediaQuery ? '335px' : 'auto'
    })
}

const styles2 = {
    container: mediaQuery => ({
        height: mediaQuery ? '100px' : 'auto'
    })
}

export default SmallCard
import React, {useEffect} from 'react'
import { useTable, usePagination } from 'react-table'
import {useMediaQuery} from '../../hooks/medquery-hook';
import './Table.module.css'

const Table = ({ columns, data, isLandingPage, pageToGo, donasi }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex},
    } = useTable({
          columns,
          data,
        },usePagination)
    
    const mediaQuery = useMediaQuery('(max-width: 1260px)');
    const mediaQuery2 = useMediaQuery('(max-width: 768px)');

    useEffect(() => {
        let page = Math.floor(pageToGo / 10) || 0
        gotoPage(page)
    }, [gotoPage, pageToGo])

    return (
        <div className="flex-auto">
            <div className={`${!isLandingPage ? 'w-full' : 'w-10/12 md:w-8/12 lg:w-7/12'} overflow-y-hidden h-full ${isLandingPage && 'lg:pb-32 mx-auto'}`}>
                <div className="w-full overflow-y-auto">
                    <table {...getTableProps()} className={`${donasi && 'md:text-base text-sm'} ${donasi ? 'w-full md:w-11/12' : 'w-full'}`}>
                        <thead>
                        {
                            headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="border-b bg-blue-800 text-white">
                                {
                                    headerGroup.headers.map(column => {
                                        if(column.Header === 'No'){
                                            return (
                                                <th {...column.getHeaderProps()} className={`${donasi ? 'w-1/12 pl-2 md:pl-4 pr-0' : 'px-3 pl-4'} text-left text-xs md:text-sm font-medium md:font-semibold py-4`}>{column.render('Header')}</th>
                                            )
                                        }
                                        else{
                                            return (
                                                <th {...column.getHeaderProps()} className={`${donasi ? 'w-1/12 pl-2 md:pl-4 pr-0' : 'px-3 pl-4'} text-left text-xs md:text-sm font-medium md:font-semibold`}>{column.render('Header')}</th>
                                            )
                                        }
                                    })
                                }
                                </tr>
                            ))
                        }
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                            <tr {...row.getRowProps()} className={`border-b-2 ${isLandingPage ? 'border-r-4' : 'border-r-2'} border-l-4`}>
                                {
                                    row.cells.map(cell => {
                                        if(cell.column.Header === 'No'){
                                            return <td {...cell.getCellProps()} className={`pl-4 py-3 text-xs md:text-sm font-medium`}>{pageIndex * 10 + i+1}</td>        
                                        }
                                        else if(cell.column.Header === 'Update'){
                                            return <td {...cell.getCellProps()} className={`pl-4 py-3`} style={styles2.container(mediaQuery2)}>{cell.render('Cell')}</td>    
                                        }
                                        else{
                                            return <td {...cell.getCellProps()} className='pl-4 py-3 text-xs md:text-sm font-medium' style={{textTransform: 'capitalize'}}>{cell.render('Cell')}</td>
                                        }
                                    })
                                }
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={`pagination ${isLandingPage ? 'mt-2' : 'mt-3'}`}>
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="font-semibold text-sm rounded-l-md bg-gray-400 px-2 text-blue-800 h-6">
                    {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-6">
                    {'<'}
                    </button>
                    <span className="bg-gray-100 text-xs px-4 h-6 inline-block font-semibold">
                        {pageIndex + 1} dari {pageOptions.length}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-6">
                    {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="font-semibold text-sm rounded-r-md bg-gray-400 px-2 text-blue-800 h-6">
                    {'>>'}
                    </button>

                    <span className="text-xs font-semibold mx-4 lg:mx-2">
                    Ke halaman:{' '}
                    <input
                        className="inline-block h-6 text-center font-semibold bg-gray-400 ml-2"
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                        }}
                        style={{ width: '32px' }}
                    />
                    </span>{' '}

                </div>
            </div>
        </div>
    )
}

const styles = {
    container: mediaQuery => ({
        margin: mediaQuery && '0',
        display: mediaQuery ? 'inline-block' : 'inline',
        width: mediaQuery ? '100%' : '10%'
    })
};

const styles2 = {
    container: mediaQuery => ({
        paddingLeft: mediaQuery && '0'
    })
};

export default Table

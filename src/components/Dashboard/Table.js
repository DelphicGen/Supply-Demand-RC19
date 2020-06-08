import React, {useEffect} from 'react'
import { useTable, usePagination } from 'react-table'
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
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex},
    } = useTable({
          columns,
          data,
        },usePagination)


    useEffect(() => {
        let page = Math.floor(pageToGo / 10) || 0
        gotoPage(page)
    }, [gotoPage, pageToGo])

    return (
        <div className="flex-auto">
            <div className={`${!isLandingPage ? 'w-full' : 'w-10/12 md:w-8/12 lg:w-7/12'} overflow-y-hidden h-full ${isLandingPage && 'mx-auto'}`}>
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
                                                <th {...column.getHeaderProps()} className={`${donasi ? 'w-1/12 px-2 md:pl-4 pr-0' : 'px-3 pl-4'} text-left text-xs md:text-sm font-medium md:font-semibold py-4`}>{column.render('Header')}</th>
                                            )
                                        }
                                        else{
                                            return (
                                                <th {...column.getHeaderProps()} className={`${donasi ? 'w-1/12 px-2 md:pl-4 pr-0' : 'px-3 pl-4'} text-left text-xs md:text-sm font-medium md:font-semibold`}>{column.render('Header')}</th>
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
                            <tr {...row.getRowProps()} className={`border-b-2 ${donasi ? 'border-r-2' : 'border-r-4'} border-l-4`}>
                                {
                                    row.cells.map(cell => {
                                        if(cell.column.Header === 'No'){
                                            return <td {...cell.getCellProps()} className={`pl-4 px-2 py-3 text-xs md:text-sm font-medium`}>{pageIndex * 10 + i+1}</td>        
                                        }
                                        else{
                                            return <td {...cell.getCellProps()} className='pl-4 px-2 py-3 text-xs md:text-sm font-medium' style={{textTransform: 'capitalize'}}>{cell.render('Cell')}</td>
                                        }
                                    })
                                }
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <div className={`pagination text-right mt-2 ${donasi ? 'w-full md:w-11/12' : 'w-full'}`}>
                    <button onClick={() => previousPage()} disabled={!canPreviousPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-6">
                    {'<'}
                    </button>
                    <span className="bg-gray-100 text-xs px-4 h-6 inline-block font-semibold">
                        {pageIndex + 1} dari {pageOptions.length}
                    </span>
                    <button onClick={() => nextPage()} disabled={!canNextPage} className="font-semibold text-sm bg-gray-400 px-2 text-blue-800 h-6">
                    {'>'}
                    </button>{' '}

                    <span className="text-xs font-semibold ml-2 md:ml-4">
                    Ke halaman:{' '}
                    <input
                        className="inline-block h-6 text-center font-semibold bg-gray-400 ml-2 rounded-md"
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

export default Table

import React from 'react'
import { useTable, usePagination } from 'react-table'

const Table = ({ columns, data }) => {
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
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({
          columns,
          data,
          initialState: { pageIndex: 0 }
        },usePagination)

    return (
        <React.Fragment>
            <table {...getTableProps()} className="w-3/4">
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="border-b bg-blue-800 text-white">
                        {
                            headerGroup.headers.map(column => {
                                if(column.Header === 'No'){
                                    return (
                                        <th {...column.getHeaderProps()} className="w-1/12 text-left pl-3 py-4">{column.render('Header')}</th>
                                    )
                                }
                                else{
                                    return (
                                        <th {...column.getHeaderProps()} className="w-1/2 text-left pl-3">{column.render('Header')}</th>
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
                    <tr {...row.getRowProps()} className="border-b-2">
                        {
                            row.cells.map(cell => {
                                return <td {...cell.getCellProps()} className='pl-4 py-4'>{cell.render('Cell')}</td>
                            })
                        }
                    </tr>
                    )
                })}
                </tbody>
            </table>

            <div className="pagination mt-4">
                <span className="text-xl">
                    Baris per halaman
                    <select
                    className="px-4 mx-4 bg-gray-400 text-blue-800"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                        {pageSize}
                        </option>
                    ))}
                    </select>
                </span>

                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="font-semibold text-xl rounded-l-md bg-gray-400 px-2 text-blue-800 h-8">
                {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="font-semibold text-xl bg-gray-400 px-2 text-blue-800 h-8">
                {'<'}
                </button>
                <span className="bg-white text-xl px-8 h-8 inline-block">
                    {pageIndex + 1} dari {pageOptions.length}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage} className="font-semibold text-xl bg-gray-400 px-2 text-blue-800 h-8">
                {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="font-semibold text-xl rounded-r-md bg-gray-400 px-2 text-blue-800 h-8">
                {'>>'}
                </button>

                <span className="text-xl mx-4">
                Go to page:{' '}
                <input
                    className="inline-block h-8 pl-2"
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>{' '}

            </div>
        </React.Fragment>
    )
}

export default Table

import React from 'react'
import './style.css'

function Table({ repositories ,handlePreviousPage,currentPage,handleNextPage ,totalPages}) {
    return (
        <div className="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Sl.No</th>
                        <th>Repositary Name</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                {repositories.map((repo, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{repo.name}</td>
                            <td><a href={repo.html_url} target="_blank"> <i className="fa-solid fa-arrow-up-right-from-square"></i> </a></td>
                        </tr>
                ))
            }
            </tbody>
            </table>
            <div className='paginationBtn'>
                {currentPage > 1 && (
                    <button onClick={handlePreviousPage}>Previous</button>
                )}
                {currentPage < totalPages && (
                    <button onClick={handleNextPage}>Next</button>
                )}
            </div>
        </div>
    )
}

export default Table
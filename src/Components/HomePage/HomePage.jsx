import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import Table from '../Table/Table';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = async () => {
        fetchRepositories();
        setCurrentPage(1);
    };
    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            console.log("database")
            fetchRepositories();
            setCurrentPage(1);
        }
    };

    const fetchRepositories = async () => {
        try {
            if (searchTerm !== '') {
                const response = await axios.get(
                    `https://api.github.com/search/repositories?q=${searchTerm}&page=${currentPage}&per_page=10`
                );
                setRepositories(response.data.items);
                console.log(Math.ceil(response.data.total_count / 10), "Total page")
                setTotalPages(Math.ceil(response.data.total_count / 10));
            }
        } catch (error) {
            console.error(error);
            alert("Error in fetching data from API , Try Again" + error);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, [currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    return (
        <div className='container'>
            <div className="searchArea">
                <h1 className='searchBarTitle'>Uncover the GitHub repository you are searching for...</h1>
                <div className="searchBox">
                    <input className='searchBoxInput' type="text" value={searchTerm} onChange={handleInputChange} onKeyDown={handleKeyPress} />
                    <button className='searchBtn' onClick={handleSearch} > <i className="fa-solid fa-magnifying-glass fa-lg"></i></button>
                </div>
            </div>
            {repositories.length > 0 && <Table
                repositories={repositories}
                handlePreviousPage={handlePreviousPage}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                totalPages={totalPages} />}
        </div>
    )
}

export default HomePage
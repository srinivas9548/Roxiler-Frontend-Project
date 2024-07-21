import { useState, useEffect } from 'react'
import axios from 'axios'

import Statistics from '../Statistics'
import BarChartComponent from '../BarChartComponent'

import './index.css'

const months = [
    {
        name: "January"
    },
    {
        name: "February"
    },
    {
        name: "March"
    },
    {
        name: "April"
    },
    {
        name: "May"
    },
    {
        name: "June"
    },
    {
        name: "July"
    },
    {
        name: "August"
    },
    {
        name: "September"
    },
    {
        name: "October"
    },
    {
        name: "November"
    },
    {
        name: "December"
    }
]

const Transactions = () => {
    const [transactionList, setTransactionList] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [selectedMonth, setSelectedMonth] = useState(months[2].name)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const getTransactions = async () => {
            const list = await axios.get(`https://roxiler-backend-srinivas-project.vercel.app/transactions?month=${selectedMonth}&page=${page}&search=${searchInput}&perPage=10`)
            if (list) {
                // console.log(list)
                setTransactionList(list.data.transactions)
            }
        }
        getTransactions()
    }, [page, searchInput, selectedMonth])

    // console.log(selectedMonth);

    return (
        <>
            <div className="transactions-container">
                <div className="round-card-bg-container">
                    <h1 className="transaction-title">Transaction Dashboard</h1>
                </div>
                <div className="search-dropdown-container">
                    <input
                        type="search"
                        className="search-input"
                        placeholder="Search transaction"
                        onChange={(event) => setSearchInput(event.target.value)}
                        value={searchInput}
                    />
                    <select value={selectedMonth} onChange={(event) => setSelectedMonth(event.target.value)} className="dropdown-list">
                        {months.map((each) => (
                            <option key={each.name} value={each.name} className="option-element">{each.name}</option>
                        ))}
                    </select>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Sold</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionList.map((transaction) => {
                            const { id, title, description, price, category, sold, image } = transaction
                            return (
                                <tr key={transaction.id}>
                                    <td>{id}</td>
                                    <td>{title}</td>
                                    <td>{description}</td>
                                    <td>{price}</td>
                                    <td>{category}</td>
                                    <td>{sold}</td>
                                    <td><img src={image} alt={title} height={'100px'} className='product-image' /></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <div className='pagination-container'>
                    <p>Page No: {page}</p>
                    <p>
                        <span onClick={() => setPage(prevValue => prevValue + 1)} className='next-button'>Next</span> -
                        <span onClick={() => setPage(prevValue => prevValue > 1 ? prevValue - 1 : prevValue)} className='previous-button'> Previous</span>
                    </p>
                    <p>Per Page: 10</p>
                </div>
            </div>

            <Statistics selectedMonth={selectedMonth} />
            <BarChartComponent selectedMonth={selectedMonth} />
        </>
    )
}

export default Transactions
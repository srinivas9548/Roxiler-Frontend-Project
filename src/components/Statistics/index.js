import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const Statistics = (props) => {
    const [statistics, setStatistics] = useState({})
    const { selectedMonth } = props
    // console.log(selectedMonth);

    useEffect(() => {
        const getStatistics = async () => {
            const response = await axios.get(`https://roxiler-backend-srinivas-project.vercel.app/statistics/?month=${selectedMonth}`)
            // console.log(response);
            setStatistics(response.data)
            
        }

        getStatistics();
    }, [selectedMonth]);
    // console.log(statistics);

    return (
        <div className="statistics-main-container">
            <h1 className='statistics-title'>Statistics - {selectedMonth}</h1>
            <div className="statistics-container">
                <div className="statistics-element">
                    <span>Total sale</span>
                    <span>{statistics.totalSaleAmount}</span>
                </div>
                <div className="statistics-element">
                    <span>Total sold item</span>
                    <span>{statistics.totalSoldItems}</span>
                </div>
                <div className="statistics-element">
                    <span>Total not sold item</span>
                    <span>{statistics.totalNotSoldItems}</span>
                </div>
            </div>
        </div>
    )
}

export default Statistics
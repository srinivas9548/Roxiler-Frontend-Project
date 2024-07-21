import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

import './index.css'
import axios from 'axios';

const BarChartComponent = (props) => {
    const [barChartData, setBarChartData] = useState([]);
    const { selectedMonth } = props
    // console.log(selectedMonth)

    useEffect(() => {
        const getBarChartData = async () => {
            try {
                const response = await axios.get(`https://roxiler-backend-srinivas-project.vercel.app/bar-chart?month=${selectedMonth}`);
                // console.log(response);
                setBarChartData(response.data);
            } catch (error) {
                console.log('Error Fetching bar chart data: ', error);
            }
        }

        getBarChartData();
    }, [selectedMonth]);
    // console.log(barChartData);

    const DataFormatter = (number) => {
        if (number > 1000) {
            return `${(number / 1000).toString()}k`;
        }
        return number.toString();
    };

    return (
        <div className="bar-chart-container">
            <h1 className='bar-chart-title'>Bar Chart Stats - {selectedMonth}</h1>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priceRange" tick={{ stroke: 'grey', strokeWidth: 1 }} />
                    <YAxis tickFormatter={DataFormatter} tick={{ stroke: 'grey', strokeWidth: 1 }} />
                    <Legend wrapperStyle={{ padding: 30 }} />
                    <Bar dataKey="itemCount" name="Number of Items" fill='#40ded9' barSize={40} radius={[3, 3, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartComponent
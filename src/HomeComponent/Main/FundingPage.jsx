import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'; // Import StripeCheckout
import Pagination from './Pagination/pagination';

const FundingPage = () => {
    const [funds, setFunds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fundsPerPage] = useState(10); // Adjust as needed
    const [totalFunds, setTotalFunds] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFunds();
    }, []);

    const fetchFunds = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://assignment-12-server-omega-six.vercel.app/create-payment-intent');
            const data = await response.json();
            setFunds(data);
            setTotalFunds(data.reduce((acc, fund) => acc + fund.fundAmount, 0));
        } catch (error) {
            console.error('Error fetching funds:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStripeToken = async (token, amount) => {
        try {
            const response = await fetch('https://assignment-12-server-omega-six.vercel.app/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, amount }),
            });
            const data = await response.json();
            if (data.success) {
                alert('Payment successful');
                fetchFunds();  // Refresh funds after successful payment
            } else {
                alert('Payment failed');
            }
        } catch (error) {
            console.error('Payment error:', error);
        }
    };

    const indexOfLastFund = currentPage * fundsPerPage;
    const indexOfFirstFund = indexOfLastFund - fundsPerPage;
    const currentFunds = funds.slice(indexOfFirstFund, indexOfLastFund);

    return (
        <div className="p-5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-5 text-center">Funding Page</h1>

            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">Total Funds: ${totalFunds.toFixed(2)}</h2>
                <StripeCheckout
                    stripeKey="pk_test_51Ql97wGO7GW7FlCpB79p4823F5pXhPtM6VLIurU0DFPYYpwL9qPUbErUB6HH2Zger5Q86jYcNZXxViNMKlysfRcH00u65cJTFi"
                    token={(token) => handleStripeToken(token, 5000)} // Adjust the amount (5000 = $50)
                    name="Give Fund"
                    description="Support our organization"
                    amount={5000} // Amount in cents (i.e., $50)
                    currency="USD"
                >
                    <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
                        Give Fund
                    </button>
                </StripeCheckout>
            </div>

            {/* Loading indicator */}
            {loading && <p className="text-center text-gray-600 dark:text-gray-300">Loading funds...</p>}

            {/* Table for displaying funds */}
            <div className="overflow-x-auto mt-5">
                <table className="table-auto w-full border-collapse border border-gray-200 dark:border-gray-700">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Fund Amount</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Funding Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFunds.map((fund) => (
                            <tr key={fund._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="border border-gray-300 px-4 py-2">{fund.userName}</td>
                                <td className="border border-gray-300 px-4 py-2">{fund.userEmail}</td>
                                <td className="border border-gray-300 px-4 py-2">${fund.fundAmount.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{fund.fundingDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <Pagination
                itemsPerPage={fundsPerPage}
                totalItems={funds.length}
                paginate={(pageNumber) => setCurrentPage(pageNumber)}
            />
        </div>
    );
};

export default FundingPage;

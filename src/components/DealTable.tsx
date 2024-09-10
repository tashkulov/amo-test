import React, { useEffect, useState } from 'react';
import { fetchDeals } from '../api/amoCRM';
import { Deal } from '../types/Deal';
import DealRow from './DealRow';

const DealTable: React.FC = () => {
    const [deals, setDeals] = useState<Deal[]>([]);

    useEffect(() => {
        const loadDeals = async () => {
            try {
                const fetchedDeals = await fetchDeals();
                setDeals(fetchedDeals);
            } catch (error) {
                console.error('Error loading deals:', error);
            }
        };

        loadDeals();
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Budget</th>
            </tr>
            </thead>
            <tbody>
            {deals.map((deal) => (
                <DealRow key={deal.id} deal={deal} />
            ))}
            </tbody>
        </table>
    );
};

export default DealTable;

import React, { useState } from 'react';
import { fetchDealDetails } from '../api/amoCRM';
import { Deal } from '../types/Deal';

interface DealRowProps {
    deal: Deal;
}

const DealRow: React.FC<DealRowProps> = ({ deal }) => {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<Deal | null>(null);

    const handleClick = async () => {
        if (details) {
            setDetails(null); // Закрываем открытую карточку
            return;
        }

        setLoading(true);
        try {
            const fetchedDetails = await fetchDealDetails(deal.id);
            setDetails(fetchedDetails);
        } catch (error) {
            console.error('Error fetching deal details:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <tr onClick={handleClick}>
                <td>{deal.id}</td>
                <td>{deal.name}</td>
                <td>{deal.price}</td>
            </tr>
            {details && (
                <tr>
                    <td colSpan={3}>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <p>Название: {details.name}</p>
                                <p>ID: {details.id}</p>
                                <p>Дата: {new Date(details.tasks[0].complete_till_at).toLocaleDateString()}</p>
                                <svg width="20" height="20">
                                    <circle
                                        cx="10"
                                        cy="10"
                                        r="8"
                                        fill={
                                            details.tasks[0].complete_till_at === 'Сегодня'
                                                ? 'green'
                                                : details.tasks[0].complete_till_at === 'Завтра'
                                                    ? 'yellow'
                                                    : 'red'
                                        }
                                    />
                                </svg>
                            </div>
                        )}
                    </td>
                </tr>
            )}
        </>
    );
};

export default DealRow;

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface MostSellableItemCardProps {
    isLoading: boolean;
    itemData: {
        item: {
            name: string;
            categoryName: string;
        };
        quantity: number;
    } | undefined;
    onClick: () => void;
}

const MostSellableItemCard: React.FC<MostSellableItemCardProps> = ({
    isLoading,
    itemData,
    onClick,
}) => {
    return (
        <div
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg shadow-md p-6 border border-emerald-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Most Sellable Item</h2>
                <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center">
                    <span className="text-emerald-700 text-2xl">🌟</span>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center py-4">
                    <CircularProgress size={30} />
                </div>
            ) : itemData ? (
                <>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{itemData.item.name}</p>
                    <p className="text-sm text-gray-600 mb-2">{itemData.item.categoryName}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-semibold text-lg">{itemData.quantity}</span>
                        <span className="text-gray-600 text-sm">units sold</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Click to view details</p>
                </>
            ) : (
                <p className="text-gray-600">No data available</p>
            )}
        </div>
    );
};

export default MostSellableItemCard;

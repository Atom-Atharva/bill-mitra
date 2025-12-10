import ItemCard from "./ItemCard";

interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    bgColor: string;
    categoryName: string;
}

interface ItemsGridProps {
    items: Item[];
    onInfo: (item: Item) => void;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
}

const ItemsGrid = ({ items, onInfo, onEdit, onDelete }: ItemsGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                    onInfo={onInfo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ItemsGrid;

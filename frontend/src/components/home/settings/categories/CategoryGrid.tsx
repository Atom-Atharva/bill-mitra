import CategoryCard from "./CategoryCard";

interface Category {
    id: number;
    name: string;
    description: string;
    imgUrl: string;
    bgColor: string;
}

interface CategoryGridProps {
    categories: Category[];
    onInfo: (category: Category) => void;
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

const CategoryGrid = ({ categories, onInfo, onEdit, onDelete }: CategoryGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    category={category}
                    onInfo={onInfo}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default CategoryGrid;

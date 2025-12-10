import Inventory2Icon from "@mui/icons-material/Inventory2";

interface EmptyStateProps {
    type: "no-categories" | "no-items" | "loading";
    message?: string;
    subMessage?: string;
}

const EmptyState = ({ type, message, subMessage }: EmptyStateProps) => {
    if (type === "loading") {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">{message || "Loading items..."}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Inventory2Icon style={{ fontSize: 64 }} className="mb-4" />
            <p className="text-lg">{message || "No items found"}</p>
            {subMessage && <p className="text-sm">{subMessage}</p>}
        </div>
    );
};

export default EmptyState;

import { useMutation } from "@tanstack/react-query";
import {
    placeOrder,
    type OrderRequest,
    type OrderResponse,
} from "@/apis/placeOrder";

interface UseOrderPlacementProps {
    onSuccess: (data: OrderResponse) => void;
    onError: () => void;
}

export const useOrderPlacement = ({
    onSuccess,
    onError,
}: UseOrderPlacementProps) => {
    const placeOrderMutation = useMutation({
        mutationFn: placeOrder,
        onSuccess,
        onError: (error: any) => {
            console.error("Order placement failed:", error);
            onError();
        },
    });

    const placeNewOrder = (orderRequest: OrderRequest) => {
        placeOrderMutation.mutate(orderRequest);
    };

    return {
        placeNewOrder,
        isProcessing: placeOrderMutation.isPending,
    };
};

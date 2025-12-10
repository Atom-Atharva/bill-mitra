import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PrintIcon from "@mui/icons-material/Print";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface PaymentStatusDialogProps {
    open: boolean;
    onClose: () => void;
    isProcessing: boolean;
    transactionStatus: "PENDING" | "SUCCESS" | "CANCEL" | null;
    orderId: number | null;
    paymentMethod: "CASH" | "UPI" | null;
    onPrintReceipt: () => void;
}

const PaymentStatusDialog = ({
    open,
    onClose,
    isProcessing,
    transactionStatus,
    orderId,
    paymentMethod,
    onPrintReceipt,
}: PaymentStatusDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }
            }}
        >
            {isProcessing ? (
                <>
                    <DialogTitle className="text-center pt-8 pb-4">
                        <div className="flex flex-col items-center gap-4">
                            <CircularProgress size={56} thickness={4} sx={{ color: '#9333ea' }} />
                            <h3 className="text-xl font-bold text-gray-800">Processing Payment</h3>
                        </div>
                    </DialogTitle>
                    <DialogContent className="text-center pb-6">
                        <p className="text-gray-600">Please wait while we process your payment...</p>
                    </DialogContent>
                </>
            ) : transactionStatus === "SUCCESS" ? (
                <>
                    <DialogTitle className="text-center pt-8 pb-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                                <div className="relative bg-green-50 p-4 rounded-full">
                                    <CheckCircleIcon
                                        sx={{ fontSize: 64, color: '#22c55e' }}
                                    />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Payment Successful!</h3>
                        </div>
                    </DialogTitle>
                    <DialogContent className="px-6 pb-2">
                        <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 mb-4">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <CheckCircleOutlineIcon className="text-green-600" fontSize="small" />
                                <p className="text-green-800 font-semibold">Order placed successfully!</p>
                            </div>
                            <div className="space-y-3">
                                {orderId && (
                                    <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm">
                                        <span className="text-sm font-medium text-gray-600">Order ID</span>
                                        <span className="text-base font-bold text-gray-900">#{orderId}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm">
                                    <span className="text-sm font-medium text-gray-600">Payment Method</span>
                                    <span className="text-base font-bold text-purple-600">{paymentMethod}</span>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className="px-6 pb-6 pt-2 gap-3">
                        <Button
                            onClick={onPrintReceipt}
                            variant="outlined"
                            size="large"
                            fullWidth
                            startIcon={<PrintIcon />}
                            sx={{
                                borderColor: '#9333ea',
                                color: '#9333ea',
                                borderWidth: 2,
                                fontWeight: 600,
                                '&:hover': {
                                    borderColor: '#7e22ce',
                                    backgroundColor: '#f3e8ff',
                                    borderWidth: 2,
                                }
                            }}
                        >
                            Print Receipt
                        </Button>
                        <Button
                            onClick={onClose}
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
                                fontWeight: 600,
                                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)',
                                    boxShadow: '0 6px 16px rgba(147, 51, 234, 0.4)',
                                }
                            }}
                        >
                            Done
                        </Button>
                    </DialogActions>
                </>
            ) : (
                <>
                    <DialogTitle className="text-center pt-8 pb-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="bg-red-50 p-4 rounded-full">
                                <ErrorIcon
                                    sx={{ fontSize: 64, color: '#ef4444' }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Payment Failed</h3>
                        </div>
                    </DialogTitle>
                    <DialogContent className="px-6 pb-2">
                        <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200 text-center">
                            <p className="text-red-800 font-medium">There was an error processing your payment.</p>
                            <p className="text-red-600 text-sm mt-2">Please try again or contact support if the issue persists.</p>
                        </div>
                    </DialogContent>
                    <DialogActions className="px-6 pb-6 pt-4">
                        <Button
                            onClick={onClose}
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{
                                background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)',
                                fontWeight: 600,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #7e22ce 0%, #6b21a8 100%)',
                                }
                            }}
                        >
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default PaymentStatusDialog;

import ErrorNotification from "./ErrorNotification";
import WarningNotification from './WarningNotification';
import SuccessNotification from './SuccessNotification';
import StartOptimizationNotification from "./StartOptimizationNotification";

export const notification = {
    error: ErrorNotification,
    warning: WarningNotification,
    success: SuccessNotification,
    start: StartOptimizationNotification,
};
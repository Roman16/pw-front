import ErrorNotification from "./ErrorNotification";
import WarningNotification from './WarningNotification';
import SuccessNotification from './SuccessNotification';
import StartOptimizationNotification from "./StartOptimizationNotification";
import SomeProblemNotification from "./SomeProblemNotification";

export const notification = {
    error: ErrorNotification,
    warning: WarningNotification,
    success: SuccessNotification,
    start: StartOptimizationNotification,
    problem: SomeProblemNotification,
};
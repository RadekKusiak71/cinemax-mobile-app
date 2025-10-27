import { useState } from 'react';

export type ErrorState = Record<string, string | string[]>;

export interface UseErrorsReturn {
    errors: ErrorState;
    setErrors: React.Dispatch<React.SetStateAction<ErrorState>>;
    parseAndSetErrors: (err: any) => void;
    clearErrors: () => void;
}

export const useErrors = (): UseErrorsReturn => {
    const [errors, setErrors] = useState<ErrorState>({});

    const clearErrors = () => {
        setErrors({});
    };

    const parseAndSetErrors = (err: any) => {
        const isGlobalError = (
            (err.request && !err.response) ||
            err.response?.status === 401 ||
            err.response?.status === 403 ||
            err.response?.status === 404 ||
            err.response?.status >= 500
        );

        if (isGlobalError) {
            return;
        }

        const data = err.response?.data;

        if (data) {
            const formattedErrors: ErrorState = {};

            for (const key in data) {
                // API is designed to do not return detail or non_field_errors for those casese (Keep it just in case)
                if (key == 'non_field_errors' || key == 'detail') {
                    continue;
                };

                formattedErrors[key] = data[key];
            }

            setErrors(formattedErrors);

        } else if (err.response) {
            setErrors({ form: `Error: ${err.response.statusText || 'Bad Request'}` });
        } else {
            setErrors({ form: err.message || "An unknown error occurred." });
        }
    };

    return {
        errors,
        setErrors,
        parseAndSetErrors,
        clearErrors,
    };
};

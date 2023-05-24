import { useState } from 'react';

interface ValidationErrors {
    [key: string]: string;
}

interface FieldValidation {
    required?: boolean;
    validation?: (value: string) => boolean;
    errorMessage?: string;
}

type FieldValidations = {
    [key: string]: FieldValidation;
};

type ValidationResult = [ValidationErrors, (fieldName: string, value: string) => void];

export const useValidation = (validations: FieldValidations): ValidationResult => {
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateField = (fieldName: string, value: string) => {
        const fieldValidation = validations[fieldName];

        if (fieldValidation) {
            const { required, validation, errorMessage } = fieldValidation;

            let error = '';

            if (required && value.trim() === '') {
                error = 'Campo obligatorio';
                } else if (validation && !validation(value)) {
                error = errorMessage || 'Campo inválido';
            }

            setErrors((prevErrors) => ({
                ...prevErrors,
                [fieldName]: error,
            }));
        }
    };

    return [errors, validateField];
};

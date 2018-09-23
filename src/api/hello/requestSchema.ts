import { string, object, ValidationOptions } from 'joi';

export const requestSchema = object().keys({
    // itemId: string().required()
});

export const defaultValidationOptions: ValidationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: { objects: true }
};
import { errors } from '../../store/store.js';
import { validationRules } from '$lib/validation/validationRules.js';

export function validateField(formData, validationRules) {
    const errorObject = {};
    for (const key in validationRules) {
        if (key.includes(".*.")) {
            const parts = key.split(".");
            const arrayPath = parts[0];
            const partsKey = parts[parts.length - 1]
            if (formData[arrayPath] && Array.isArray(formData[arrayPath])) {
                formData[arrayPath].forEach((item, index) => {
                    const subErrorObject = {};
                    Object.entries(validationRules).forEach(([subKey, rule]) => {
                        if (subKey.includes(".*.") && subKey.includes(`${arrayPath}`) && formData[arrayPath][index].hasOwnProperty(partsKey)) {
                            const subParts = subKey.split(".");
                            const nestedKey = subParts.filter(item => item !== '*');
                            nestedKey.forEach((key) => {
                                if ((!item.hasOwnProperty(key) || (rule.pattern && !rule.pattern?.test(item[key])) || !item[key] && rule.required) && formData[arrayPath][index].hasOwnProperty(key) && arrayPath !== key) {
                                    subErrorObject[key] = rule.message;
                                }
                            })
                        }
                    });
                    if (Object.keys(subErrorObject).length > 0) {
                        if (!errorObject[arrayPath]) {
                            errorObject[arrayPath] = [];
                        }
                        errorObject[arrayPath][index] = subErrorObject;
                    }
                });
            }
        } else if (key.includes(".")) {
            const parts = key.split(".");
            const keyPath = parts[0];
            const partsKey = parts[parts.length - 1]
            if (formData.hasOwnProperty(keyPath) && formData[keyPath]) {
                const subErrorObject = {};
                const value = formData[keyPath];
                Object.entries(validationRules).forEach(([subKey, rule]) => {
                    if (subKey.includes(".") && subKey.includes(`${keyPath}`) && formData[keyPath].hasOwnProperty(partsKey)) {
                        const subParts = subKey.split(".");
                        const nestedKey = subParts.pop();
                        if (((rule.pattern && !rule.pattern?.test(value[nestedKey])) || !value[nestedKey] && rule.required) && formData[keyPath].hasOwnProperty(nestedKey)) {
                            subErrorObject[nestedKey] = rule.message;
                        }
                    }
                });
                if (Object.keys(subErrorObject).length > 0) {
                    errorObject[keyPath] = subErrorObject;
                }
            }
        } else {
            if (formData.hasOwnProperty(key)) {
                const value = formData[key];
                if ((validationRules[key].pattern && !validationRules[key].pattern?.test(value)) || !value && validationRules[key].required) {
                    errorObject[key] = validationRules[key].message;
                }
            }
        }
    }

    return errorObject;
}
export function validateForm(field, value, parentKey = '', type = 'object', index = 0) {
    // console.log('parentKey', parentKey);
    let formData;
    if (type === 'object') {
        formData = {
            [field]: value
        }
    } else if (type === 'nested') {
        formData = {
            [parentKey]: {
                [field]: value
            }
        }
    } else if (type === 'array') {
        formData = {
            [parentKey]: []
        }
        // Update the object at the specified index or push a new object if the index is out of bounds
        formData[parentKey][index] = { [field]: value }
    }
    let fieldError = validateField(formData, validationRules);
    // console.log('fieldError', fieldError);
    errors.update((data) => {
        if (Object.keys(fieldError).length === 0) {
            // If fieldError is an empty object, remove the corresponding field from errors
            const updatedErrors = { ...data };
            if (type === 'nested') {
                // Handle nested objects
                if (updatedErrors[parentKey] && updatedErrors[parentKey][field]) {
                    delete updatedErrors[parentKey][field];
                    if (Object.keys(updatedErrors[parentKey]).length === 0) {
                        delete updatedErrors[parentKey];
                    }
                }
            } else if (type === 'array') {
                console.log('inside-array')
                if (updatedErrors[parentKey]?.[index] && updatedErrors[parentKey]?.[index]?.[field]) {
                    delete updatedErrors[parentKey][index][field];
                    // Check if the child array is empty after deleting the field
                    if (Object.keys(updatedErrors[parentKey][index]).length === 0) {
                        delete updatedErrors[parentKey][index];
                        // Check if the parentKey array is empty after deleting the child
                        if (Object.keys(updatedErrors[parentKey]).length === 0) {
                            delete updatedErrors[parentKey];
                        }
                    }
                }
            }
            else {
                // Handle non-nested objects
                delete updatedErrors[field];
            }
            console.log('updatedErrors', updatedErrors)
            return updatedErrors;
        } else if (type === 'nested' && data[parentKey]) {
            const updatedErrors = { ...data };
            updatedErrors[parentKey] = { ...data[parentKey], ...fieldError[parentKey] }
            return updatedErrors
        } else if (type === 'array' && data[parentKey]) {
            const updatedErrors = { ...data };
            updatedErrors[parentKey][index] = { ...updatedErrors[parentKey][index], ...fieldError[parentKey][index] };
            return updatedErrors;
        }
        else {
            console.log('data', data, 'fieldError', fieldError)
            let x = { ...data, ...fieldError };
            console.log('x', x);
            return x;
        }
    });
};

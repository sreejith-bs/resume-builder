import { errors } from '../../store/store.js';
import { validationRules } from '$lib/validation/validationRules.js';

export function validateField(formData, validationRules) {
    const errorObject = {};
    console.log('formData', formData)
    for (const key in validationRules) {
        if (key.includes(".*.")) {
            const parts = key.split(".");
            const arrayPath = parts[0];
            if (formData[arrayPath] && Array.isArray(formData[arrayPath])) {
                formData[arrayPath].forEach((item, index) => {
                    const subErrorObject = {};
                    Object.entries(validationRules).forEach(([subKey, rule]) => {
                        if (subKey.includes(".*.") && subKey.startsWith(`${arrayPath}`)) {
                            const subParts = subKey.split(".");
                            const nestedKey = subParts.filter(item => item !== '*');
                            nestedKey.forEach((key) => {
                                if ((!item.hasOwnProperty(key) || (rule.pattern && !rule.pattern?.test(item[key])) || !item[key] && rule.required) && arrayPath !== key) {
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

// export function validateForm(field, value, parentKey = '', type = 'object') {
//     let formData;
//     if (type === 'object') {
//         formData = {
//             [field]: value
//         }
//     } else if (type === 'nested') {
//         formData = {
//             [parentKey]: {
//                 [field]: value
//             }
//         }
//     }
//     let fieldError = validateField(formData, validationRules);
//     // console.log('fieldError', fieldError)
//     errors.update((data) => {
//         if (Object.keys(fieldError).length === 0) {
//             console.log('fieldError.length is 0')
//             const updatedErrors = { ...data };
//             delete updatedErrors[field];
//             return updatedErrors;
//         } else if (type === 'nested' && data[parentKey]) {
//             console.log('fieldError', fieldError)
//             console.log('data', data)
//             let x = { ...data };
//             x[parentKey] = { ...data[parentKey], ...fieldError[parentKey] }
//             console.log('nested', x)
//             return x
//         }
//         else {
//             return { ...data, ...fieldError };
//         }
//     });
// };
export function validateForm(field, value, parentKey = '', type = 'object') {
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
    }
    let fieldError = validateField(formData, validationRules);
    errors.update((data) => {
        if (Object.keys(fieldError).length === 0) {
            // If fieldError is an empty object, remove the corresponding field from errors
            const updatedErrors = { ...data };
            if (parentKey) {
                // Handle nested objects
                if (updatedErrors[parentKey] && updatedErrors[parentKey][field]) {
                    delete updatedErrors[parentKey][field];
                    if (Object.keys(updatedErrors[parentKey]).length === 0) {
                        delete updatedErrors[parentKey];
                    }
                }
            } else {
                // Handle non-nested objects
                delete updatedErrors[field];
            }
            return updatedErrors;
        } else if (type === 'nested' && data[parentKey]) {
            const updatedErrors = { ...data };
            updatedErrors[parentKey] = { ...data[parentKey], ...fieldError[parentKey] }
            return updatedErrors
        }
        else {
            return { ...data, ...fieldError };
        }
    });
};

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
                                // if(key.includes('_date') && arrayPath === 'experience'){
                                //     console.log('key_**', key, 'formData[arrayPath]', formData[arrayPath]);
                                //     console.log('hasOwnProperty', item.hasOwnProperty(key));
                                //     console.log('nestedKey', nestedKey);
                                // }
                                // if(arrayPath === 'experience' && formData[arrayPath][index].hasOwnProperty(key)) {
                                //     console.log('item.hasOwnProperty(key)', item.hasOwnProperty(key), 'rule.pattern', rule.pattern, 'item[key]', item[key], 'formData[arrayPath][index].hasOwnProperty(key)', formData[arrayPath][index].hasOwnProperty(key), 'arrayPath', arrayPath, 'key', key);
                                // }
                                if ((!item.hasOwnProperty(key) || (rule.pattern && !rule.pattern?.test(item[key])) || !item[key] && rule.required) && formData[arrayPath][index].hasOwnProperty(key) && arrayPath !== key) {
                                    console.log('rule.message', rule.message);
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
        console.log(field, value);
        formData[parentKey][index] = { [field]: value }
    }
    let fieldError = validateField(formData, validationRules);
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
            return { ...data, ...fieldError };
        }
    });
};

export const customValidation = {
    rules: {
        required: {
            validate: function (input) {
                return input.value.trim() !== ''
            },
            message: 'Required'
        },
        email: {
            validate: function (input) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(input.value)
            },
            message: 'Please enter a valid email address'
        },
        phone: {
            validate: function (input) {
                const phoneRegrex = /^\d{10}$/
                return phoneRegrex.test(input.value)
            },
            message: 'Please enter a valid mobile number'
        },
        date: {
            validate: function (input) {
                const dateRegrex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/
                return dateRegrex.test(input.value)
            },
            message: "Please enter date in DD-MM-YYYY format"
        },
        compare: {
            validate: function (input, date) {
                const startDate = input.value
                const endDate = date
                const [startDay, startMonth, startYear] = startDate.split('-').map(Number);
                const [endDay, endMonth, endYear] = endDate.split('-').map(Number);
                const startDateObj = new Date(startYear, startMonth - 1, startDay);
                const endDateObj = new Date(endYear, endMonth - 1, endDay);
                return startDateObj > endDateObj;
            },
            message: "End date could not less than start date"
        },
        url: {
            validate: function (input) {
                const urlRegrex = /^(http|https):\/\/[^ "]+$/
                return urlRegrex.test(input.value)
            },
            message: "Please enter a valid URL"
        }
    },
    validate: function (input, rules, date = '') {
        const isValid = rules.every(rule => {
            if (rule !== 'compare' && !this.rules[rule].validate(input)) {
                this.showError(input, this.rules[rule].message)
                return false
            } else if (rule === 'compare' && !this.rules[rule].validate(input, date)) {
                this.showError(input, this.rules[rule].message)
                return false
            }
            return true
        })
        if (isValid) {
            this.clearError(input)
        }
        return isValid
    },
    showError: function (input, message) {
        const errorElementId = input.dataset.error
        const errorElement = document.getElementById(errorElementId)
        if (errorElement) {
            errorElement.textContent = message
            input.classList.add('error', 'border-red-600')
        }
    },
    clearError: function (input) {
        const errorElementId = input.dataset.error
        const errorElement = document.getElementById(errorElementId)
        if (errorElement) {
            errorElement.textContent = ''
            input.classList.remove('error', 'border-red-600')
        }
    }

}

// export {customValidation}
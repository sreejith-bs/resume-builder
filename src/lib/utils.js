import { navigate } from 'svelte-routing';

function navigateTo(url) {
    console.log('url', url);
    navigate(url); // Update the browser's URL
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
}

export {navigateTo, formatDate}
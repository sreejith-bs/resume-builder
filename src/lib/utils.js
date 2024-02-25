import { navigate } from 'svelte-routing';

function navigateTo(url) {
    console.log('url', url);
    navigate(url); // Update the browser's URL
}

export {navigateTo}
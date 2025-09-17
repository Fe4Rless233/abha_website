// Clear all admin data for fresh testing
console.log('Clearing all admin data...');

// Clear both old and new localStorage keys
localStorage.removeItem('abha_events');
localStorage.removeItem('abha_photos');
localStorage.removeItem('abha_admin_events');
localStorage.removeItem('abha_admin_photos');

console.log('All admin data cleared. Refresh the page to see sample events created.');

// Trigger storage event to update displays
window.dispatchEvent(new Event('storage'));

alert('All admin data cleared! Refresh the page to see the sample events.');

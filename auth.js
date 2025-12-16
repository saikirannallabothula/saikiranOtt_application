const authButtons = document.getElementById('auth-buttons');
const USERS_KEY = 'streamflix_users';
const CURRENT_USER_KEY = 'streamflix_current_user';

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
}

function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
}

function registerUser(name, email, password) {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'User already exists' };
    }
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        wishlist: []
    };
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    return { success: true };
}

function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.reload();
}

function checkAuthState() {
    const user = getCurrentUser();
    if (user) {
        // User is logged in
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="profile.html" class="btn btn-primary">Profile</a>
                <button onclick="logoutUser()" class="btn btn-secondary">Logout</button>
            `;
        }
    } else {
        // User is not logged in
        if (authButtons) {
            authButtons.innerHTML = `
                <a href="login.html" class="btn btn-primary">Sign In</a>
            `;
        }
    }
}



function addToWishlist(movie) {
    const user = getCurrentUser();
    if (!user) {
        alert("Please login to add to wishlist!");
        return false;
    }
    // Check if already exists
    if (user.wishlist.some(m => m.id === movie.id)) {
        alert("Already in your wishlist!");
        return false;
    }
    user.wishlist.push(movie);

    // Update in local storage arrays
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        saveUsers(users);
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    alert("Added to wishlist!");
    return true;
}

function removeFromWishlist(movieId) {
    const user = getCurrentUser();
    if (!user) return;

    user.wishlist = user.wishlist.filter(m => m.id !== movieId);

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        users[userIndex] = user;
        saveUsers(users);
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Global exposure
window.logoutUser = logoutUser;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;

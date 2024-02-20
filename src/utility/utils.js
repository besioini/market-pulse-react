
const getAuthHeaders = () => {
    const token = localStorage.getItem('authToken');
    return { Authorization: `Bearer ${token}` };
};

//  100% of this function is copied and pasted
const getUserId = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        console.log(payload.userId);
        return payload.userId;
    }
    return null;
};

const getUserType = () => {
    return localStorage.getItem('userType');
};

export default { getAuthHeaders, getUserId, getUserType }

const isValid = (user) => {
    return Boolean(user.username && user.password && user.department && typeof user.password === "string");
}
    
module.exports = {
    isValid,
};
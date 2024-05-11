/**
 * Handles toggling users.
 * @param {Array} selectedUsers - The currently selected users.
 * @param {Function} setSelectedUsers - Function to set the selected users.
 * @param {Function} setInputValue - Function to set the input value.
 * @param {string} username - The username of the user to toggle.
 * @param {string} image - The image of the user to toggle.
 * @module UserFunctions
 */
export const handleToggleUser = (selectedUsers, setSelectedUsers, setInputValue, username, image) => {
    const isUserSelected = selectedUsers.some(user => user.username === username);
    if (isUserSelected) {
        // User is already selected, remove them
        const updatedUsers = selectedUsers.filter(user => user.username !== username);
        setSelectedUsers(updatedUsers);
        setInputValue(prevInputValue => {
            // Filter out the username from the input value
            const usernames = prevInputValue.split(',').map(name => name.trim());
            const updatedUsernames = usernames.filter(name => name !== username);
            return updatedUsernames.join(', ');
        });
    } else {
        // User is not selected, add them
        setSelectedUsers([...selectedUsers, { image, username }]);
        setInputValue(prevInputValue => prevInputValue ? `${prevInputValue}, ${username}` : username);
    }
};

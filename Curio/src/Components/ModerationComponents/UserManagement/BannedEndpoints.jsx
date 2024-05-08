import { FetchSubredditName } from "../../Post/PostEndPoints";

const VITE_SERVER_HOST = import.meta.env.VITE_SERVER_HOST;


const getBannedUserDetails = async () => {
    const subredditName = FetchSubredditName;
    const url = `${VITE_SERVER_HOST}/api/r/${subredditName}/about/banned`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const responseData = await response.json();

    // Extracting banned user details
    const bannedUsers = responseData.bannedUsers.map(bannedUser => ({
        banDetails: bannedUser.banDetails.map(banDetail => ({
            id: banDetail._id,
            bannedUsername: banDetail.bannedUsername,
            linkedSubreddit: banDetail.linkedSubreddit,
            violation: banDetail.violation,
            modNote: banDetail.modNote,
            userMessage: banDetail.userMessage,
            bannedBy: banDetail.bannedBy,
            __v: banDetail.__v
        })),
        userDetails: {
            id: bannedUser.userDetails._id,
            username: bannedUser.userDetails.username,
            email: bannedUser.userDetails.email,
            gender: bannedUser.userDetails.gender,
            karma: bannedUser.userDetails.karma,
            cakeDay: bannedUser.userDetails.cakeDay,
            socialLinks: bannedUser.userDetails.socialLinks,
        }
    }));


    return bannedUsers;
};


export { getBannedUserDetails };
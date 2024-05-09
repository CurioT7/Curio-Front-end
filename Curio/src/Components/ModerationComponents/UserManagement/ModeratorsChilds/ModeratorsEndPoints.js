import axios from 'axios';

const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function fetchModerators(subreddit) {
    try{
        const request = await axios.get(`${serverHost}/api/about/moderators/${subreddit}`,{
            params: {
                Subreddit: subreddit
            }
        });
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
        
    }
}

export async function fetchModeratorSettings(){
    try{

        const request = await axios.get(`${serverHost}/api/mine/moderator`,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}
export async function SendModeratorInvites(subreddit,modSettings){
    try{
        const request = await axios.post(`${serverHost}/api/moderationInvite/${subreddit}`,{
            role: modSettings.role,
            moderationName: modSettings.name,
            manageUsers: modSettings.manageUsers,
            createLiveChats: modSettings.createLiveChats,
            manageSettings: modSettings.manageSettings,
            managePostsAndComments: modSettings.managePostsAndComments,
            everything: modSettings.everything
        },{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
        console.log('Error fetching data from backend:', error);
    }
}

export async function RemoveModerator(subreddit,modSettings){
    try{
        const request = await axios.get(`${serverHost}/api/removemoderator/${subreddit}`,{
            role: modSettings.role,
            moderationName: modSettings.name,
        },{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

export async function LeaveModeration(subreddit){
    try{
        const request = await axios.get(`${serverHost}/api/leaveModerator/${subreddit}`,{
            params: {
                Subreddit: subreddit
            },
            }
        ,{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

export async function editModeratorAuth(subreddit,modSettings){
    try{
        const request = await axios.post(`${serverHost}/api/moderator/editPermissions/${subreddit}`,{
            
            moderationName: modSettings.name,
            manageUsers: modSettings.manageUsers,
            createLiveChats: modSettings.createLiveChats,
            manageSettings: modSettings.manageSettings,
            managePostsAndComments: modSettings.managePostsAndComments,
            everything: modSettings.everything
        },{
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return request.data;
    }catch(error){
        console.error('Error fetching data from backend:', error);
    }
}

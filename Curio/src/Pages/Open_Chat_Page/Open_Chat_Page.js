import axios from "axios";
const serverHost = import.meta.env.VITE_SERVER_HOST;

export async function CheckUsernaemExist(username) {
    try {
        const responseCheckUsername= await axios.get(`${serverHost}/api/auth/username_available/${username}`);
        return (responseCheckUsername.data.success)
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.error('Username already exists');
        } else if (error.request && error.request.status === 500) {
            console.error('Internal Server error');
        } else {
            console.error('Error', error.message);
        }
    }
}



export async function createChatRequest(recipient, message) {
    console.log(recipient)
    try {
        const response= await axios.post(`${serverHost}/api/chat/create`,{
            message: message,
            recipient: recipient
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return (response)
    } catch (error) {
        if (error.response && error.response.status === 400) {
            console.error('Chat already exists');
        } else if (error.request && error.request.status === 500) {
            console.error('Internal Server error');
        } else {
            console.error('Error', error.message);
        }
    }
}

export async function chatsOverview() {
    console.log(recipient)
    try {
        const response= await axios.get(`${serverHost}/api/chat/overview/all`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return (response)
    } catch (error) {
            console.error('Error', error.message);
    }
}

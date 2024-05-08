export function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifferenceInMs = currentTime - notificationTime;

    // Convert milliseconds to seconds
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMs / 1000);

    if (timeDifferenceInSeconds < 60) {
        return `${timeDifferenceInSeconds}s`;
    } else if (timeDifferenceInSeconds < 3600) {
        return `${Math.floor(timeDifferenceInSeconds / 60)}m`;
    } else if (timeDifferenceInSeconds < 86400) {
        return `${Math.floor(timeDifferenceInSeconds / 3600)}h`;
    } else {
        return `${Math.floor(timeDifferenceInSeconds / 86400)}d`;
    }
}

export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
    return formattedTime;
}

export function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
};

export function formatDatewithDays(dateString) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}
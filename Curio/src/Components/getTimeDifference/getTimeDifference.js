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

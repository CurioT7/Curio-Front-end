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


export function getPollTimeDifference(timestamp, voteLength){
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const timeDifferenceInMs = currentTime - notificationTime;

    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMs / 1000);

    const remainingTimeInSeconds = timeDifferenceInSeconds - (voteLength * 24 * 60 * 60);

    if (remainingTimeInSeconds < 60) {
        return `${remainingTimeInSeconds} seconds`;
    } else if (remainingTimeInSeconds < 3600) {
        return `${Math.floor(remainingTimeInSeconds / 60)} minutes`;
    } else if (remainingTimeInSeconds < 86400) {
        return `${Math.floor(remainingTimeInSeconds / 3600)} hours`;
    } else {
        return `${Math.floor(remainingTimeInSeconds / 86400)} days`;
    }
}


export function getDaysCountdown(daysAgo) {
    let remainingSeconds = daysAgo * 24 * 60 * 60; 

    const timer = () => setInterval(() => {
        remainingSeconds--;
        if (remainingSeconds <= 0) {
            clearInterval(timer);
        }
    }, 1000);

    const getRemainingTime = () => {
        const days = Math.floor(remainingSeconds / (24 * 60 * 60));
        const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
        const seconds = remainingSeconds % 60;

        if (days > 0) {
            return `${days} days`;
        } else if (hours > 0) {
            return `${hours} hours`;
        } else if (minutes > 0) {
            return `${minutes} minutes`;
        } else {
            return `${seconds} seconds`;
        }
    };

    return {
        start: timer,
        getRemainingTime: getRemainingTime
    };
}

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

export function getDaysDifferenceFromToday(inputDate) {
    const cameraModels = {
        0: "70D",
    };

    const currentDate = new Date();
    const targetDate = new Date(inputDate);
    const timeDifference = Math.abs(currentDate - targetDate);
    const differenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return cameraModels[differenceInDays % Object.keys(cameraModels).length];
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






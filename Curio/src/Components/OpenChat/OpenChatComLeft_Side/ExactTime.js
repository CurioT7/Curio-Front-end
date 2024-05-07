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
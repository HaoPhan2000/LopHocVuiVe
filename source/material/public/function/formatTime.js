export function formatDate(dateInput) {
    const date = new Date(dateInput);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
    return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
}

export function formatDatetime(dateTimeInput) {
    const dateTime = new Date(dateTimeInput);
    const day = dateTime.getDate();
    const month = dateTime.getMonth() + 1; // Month is zero-based
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year +' '+ (hours < 10 ? '0' : '') + hours +':'+ (minutes < 10 ? '0' : '') + minutes;
}

export function formatTime(timeInput) {
    const time = new Date(timeInput);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (hours < 10 ? '0' : '') + hours +':'+ (minutes < 10 ? '0' : '') + minutes;
}

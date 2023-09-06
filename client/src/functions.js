// Cuts off text at max length and add ellipsis at end
const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
};

// Turns createdAt time into a string
const timeCreated = time => {
    let date = new Date(time);
    let hour = date.getHours();
    let min = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let total = hour + ":" + min + " " + day + "/" + month + "/" + year;
    console.log(total);
    return total;
}

export { truncateText, timeCreated };
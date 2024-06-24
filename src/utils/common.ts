function timeAgo(date: Date): string {
    const now = new Date();
    const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (secondsPast < 60) {
      return `${secondsPast} second${secondsPast > 1 ? "s" : ""} ago`;
    }
    const minutesPast = Math.floor(secondsPast / 60);
    if (minutesPast < 60) {
      return `${minutesPast} minute${minutesPast > 1 ? "s" : ""} ago`;
    }
    const hoursPast = Math.floor(minutesPast / 60);
    if (hoursPast < 24) {
      return `${hoursPast} hour${hoursPast > 1 ? "s" : ""} ago`;
    }
    const daysPast = Math.floor(hoursPast / 24);
    if (daysPast < 30) {
      return `${daysPast} day${daysPast > 1 ? "s" : ""} ago`;
    }
    const monthsPast = Math.floor(daysPast / 30);
    if (monthsPast < 12) {
      return `${monthsPast} month${monthsPast > 1 ? "s" : ""} ago`;
    }
    const yearsPast = Math.floor(monthsPast / 12);
    return `${yearsPast} year${yearsPast > 1 ? "s" : ""} ago`;
  }

  export { timeAgo };
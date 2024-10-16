export function formatDate(date, includeWeekday = false) {
  console.log(date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  if (includeWeekday) {
    return new Intl.DateTimeFormat("en", {
      ...options,
      weekday: "long",
    }).format(new Date(date));
  }
  return new Intl.DateTimeFormat("en", { ...options }).format(new Date(date));
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((c) => 127397 + c.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

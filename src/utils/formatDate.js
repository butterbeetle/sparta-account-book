export default function formatDate(date) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const [month, day, year] = new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .split("/");

  return `${year}-${month}-${day}`;
}

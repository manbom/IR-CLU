const jalaliFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatJalali(isoDate: string) {
  return jalaliFormatter.format(new Date(isoDate));
}

const gregorianFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatGregorian(isoDate: string) {
  return gregorianFormatter.format(new Date(isoDate));
}

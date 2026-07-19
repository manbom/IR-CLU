const jalaliFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatJalali(isoDate: string) {
  return jalaliFormatter.format(new Date(isoDate));
}

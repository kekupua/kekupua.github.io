import tzLookup from "tz-lookup";
const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
// Deliberately conservative: complex OSM rules (holidays, seasons, solar times,
// comments, exceptions) remain unknown instead of suggesting incorrect hours.
export function openingStatus(
  hours: string | undefined,
  lat: number,
  lon: number,
  now = new Date(),
): "open" | "closed" | "unknown" {
  if (!hours) return "unknown";
  if (hours === "24/7") return "open";
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: tzLookup(lat, lon),
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);
    const weekday = parts.find((p) => p.type === "weekday")?.value.slice(0, 2);
    const day = days.indexOf(weekday);
    const minute =
      Number(parts.find((p) => p.type === "hour")?.value) * 60 +
      Number(parts.find((p) => p.type === "minute")?.value);
    let open = false;
    for (const rule of hours.split(";")) {
      const match = rule
        .trim()
        .match(
          /^(?:(Mo|Tu|We|Th|Fr|Sa|Su)(?:-(Mo|Tu|We|Th|Fr|Sa|Su))?(?:,(?:Mo|Tu|We|Th|Fr|Sa|Su)(?:-(?:Mo|Tu|We|Th|Fr|Sa|Su))?)*\s+)?((?:\d{2}:\d{2}-\d{2}:\d{2})(?:,\s*\d{2}:\d{2}-\d{2}:\d{2})*)$/,
        );
      if (!match) return "unknown";
      const timeText = match[3];
      const dayText = rule
        .trim()
        .slice(0, rule.trim().indexOf(timeText))
        .trim();
      const activeDays: number[] = [];
      if (!dayText) activeDays.push(0, 1, 2, 3, 4, 5, 6);
      else
        for (const range of dayText.split(",")) {
          const [a, b = a] = range.split("-").map((d) => days.indexOf(d));
          for (let d = a; ; d = (d + 1) % 7) {
            activeDays.push(d);
            if (d === b) break;
          }
        }
      for (const interval of timeText.split(",")) {
        const [start, end] = interval
          .trim()
          .split("-")
          .map((t) => {
            const [h, m] = t.split(":").map(Number);
            if (h > 24 || m > 59 || (h === 24 && m !== 0))
              throw new Error("Invalid time");
            return h * 60 + m;
          });
        if (start === end || start === 1440) return "unknown";
        if (start < end)
          open ||= activeDays.includes(day) && minute >= start && minute < end;
        else
          open ||=
            (activeDays.includes(day) && minute >= start) ||
            (activeDays.includes((day + 6) % 7) && minute < end);
      }
    }
    return open ? "open" : "closed";
  } catch {
    return "unknown";
  }
}

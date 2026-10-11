// "2006-10-11" → "11 October 2006"
export function formatDate(value) {
  if (!value) return "-";

  const date = new Date(value);
  if (isNaN(date)) return value; // e.g. old dates typed by hand like "03/10/2006"

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Blockchain timestamp (seconds) → "11 Oct 2026, 9:32 pm"
export function formatTimestamp(seconds) {
  if (!seconds) return "-";

  return new Date(seconds * 1000).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// "QmeufFxQ4U1NL6eevu6mEyPK2k16HLNBNhXbCnARQQTDqe" → "QmeufFxQ…QTDqe"
export function shortenHash(hash) {
  if (!hash || hash.length <= 16) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}
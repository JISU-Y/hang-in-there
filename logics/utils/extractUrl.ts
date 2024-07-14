export function extractUrl(htmlText: string): string {
  const regex = /href="(http[s]?:\/\/[^\s]+)"/;
  const match = htmlText.match(regex);

  return match ? match[1] : '';
}

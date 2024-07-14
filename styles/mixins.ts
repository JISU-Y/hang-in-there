export function getOpacityColor(hexColor: string, opacity: number): string {
  // HEX 색상에서 R, G, B 값을 추출
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);

  // RGBA 형식으로 변환
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

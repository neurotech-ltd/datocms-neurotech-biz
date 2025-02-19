export class ColorUtils {
  static hexToRgb(hex: string): [number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  static calculateLuminance([r, g, b]: [number, number, number]): number {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  static calculateContrast(rgb1: [number, number, number], rgb2: [number, number, number]): number {
    const lum1 = this.calculateLuminance(rgb1);
    const lum2 = this.calculateLuminance(rgb2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
  }

  static adjustColorForContrast(hexColor: string, isLight: boolean): string {
    let [r, g, b] = this.hexToRgb(hexColor);
    let factor = isLight ? 1.2 : 0.8;
    r = Math.min(255, Math.max(0, r * factor));
    g = Math.min(255, Math.max(0, g * factor));
    b = Math.min(255, Math.max(0, b * factor));
    return `rgb(${r},${g},${b})`;
  }

  static getAccessibleTextColor(hexColor: string): string {
    const rgbBackground = this.hexToRgb(hexColor);
    const lightText: [number, number, number] = [255, 255, 255]; // white
    const darkText: [number, number, number] = [0, 0, 0]; // black
    const lightContrast = this.calculateContrast(rgbBackground, lightText);
    const darkContrast = this.calculateContrast(rgbBackground, darkText);
    const isLightBackground =
      lightContrast > darkContrast ? darkContrast < 4.5 : lightContrast < 4.5;
    return this.adjustColorForContrast(hexColor, isLightBackground);
  }

  static getContrastTheme(hexColor: string) {
    const rgb = this.hexToRgb(hexColor);
    const luminance = this.calculateLuminance(rgb);
    return luminance > 0.5 ? 'dark' : 'light';
  }
}

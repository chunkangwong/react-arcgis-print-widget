export type ILayout =
  | "a3-landscape"
  | "a3-portrait"
  | "a4-landscape"
  | "a4-portrait"
  | "letter-ansi-a-landscape"
  | "letter-ansi-a-portrait"
  | "tabloid-ansi-b-landscape"
  | "tabloid-ansi-b-portrait";

export type IFormat =
  | "pdf"
  | "png32"
  | "png8"
  | "jpg"
  | "gif"
  | "eps"
  | "svg"
  | "svgz";

export const pageSetupOptions: {
  label: string;
  value: ILayout;
}[] = [
  {
    label: "A3 Landscape",
    value: "a3-landscape",
  },

  {
    label: "A3 Portrait",
    value: "a3-portrait",
  },
  {
    label: "A4 Landscape",
    value: "a4-landscape",
  },
  {
    label: "A4 Portrait",
    value: "a4-portrait",
  },
  {
    label: "Letter ANSI A landscape",
    value: "letter-ansi-a-landscape",
  },
  {
    label: "Letter ANSI A Portrait",
    value: "letter-ansi-a-portrait",
  },
  {
    label: "Tabloid ANSI B Landscape",
    value: "tabloid-ansi-b-landscape",
  },
  {
    label: "Tabloid ANSI B Portrait",
    value: "tabloid-ansi-b-portrait",
  },
];

export const outputFormatOptions: {
  label: string;
  value: IFormat;
}[] = [
  {
    label: "PDF",
    value: "pdf",
  },
  {
    label: "PNG 32",
    value: "png32",
  },
  {
    label: "PNG 8",
    value: "png8",
  },
  {
    label: "JPG",
    value: "jpg",
  },
  {
    label: "GIF",
    value: "gif",
  },
  {
    label: "EPS",
    value: "eps",
  },
  {
    label: "SVG",
    value: "svg",
  },
  {
    label: "SVGZ",
    value: "svgz",
  },
];

export const scaleOptions = [
  250000, 100000, 30000, 20000, 10000, 5000, 2500, 1500, 1000, 500, 250,
];

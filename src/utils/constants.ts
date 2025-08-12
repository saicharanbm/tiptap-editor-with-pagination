export const headings: { label: string; value: number; fontSize: string }[] = [
  { label: "P", value: 0, fontSize: "16px" },
  { label: "H1", value: 1, fontSize: "32px" },
  { label: "H2", value: 2, fontSize: "24px" },
  { label: "H3", value: 3, fontSize: "20px" },
  { label: "H4", value: 4, fontSize: "18px" },
  { label: "H5", value: 5, fontSize: "16px" },
  { label: "H6", value: 6, fontSize: "14px" },
];

export const fonts: { label: string; value: string }[] = [
  { label: "Arial", value: "Arial" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
  { label: "Georgia", value: "Georgia" },
  { label: "Verdana", value: "Verdana" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Garamond", value: "Garamond" },
];

export const previewOptions: {
  label: string;
  value: "thumbnail" | "index" | "search";
}[] = [
  { label: "Thumbnail", value: "thumbnail" },
  { label: "Index", value: "index" },
  { label: "Search", value: "search" },
];

export const markers = Array.from({ length: 91 }, (_, i) => i);

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

export const demoFeatures = [
  {
    title: "Smart Page Breaks",
    description: `Create clean page divisions with our intelligent page break
              feature. Simply position your cursor where you want the break,
              then click the page break button to automatically move all
              subsequent content to a new page.`,
    src: "https://res.cloudinary.com/dlbweacrx/video/upload/v1755016655/vettam/page-break_rluwoq.mov",
  },
  {
    title: "Page Reordering",
    description: `Effortlessly reorganize your content by dragging and dropping
              pages to their desired positions. This intuitive interface makes
              it simple to restructure your document's flow and maintain logical
              content organization. `,
    src: "https://res.cloudinary.com/dlbweacrx/video/upload/v1755016606/vettam/re-order_gljnag.mov",
  },
  {
    title: "Ruler & Margin Control",
    description: `Precisely control your document layout by dragging the margin
              markers on the ruler. Set left and right margins, adjust
              indentation, and fine-tune spacing for professional formatting.`,
    src: "https://res.cloudinary.com/dlbweacrx/video/upload/v1755016630/vettam/ruler_vlgvya.mov",
  },
  {
    title: "Header & Footer Management",
    description: `Take full control of your document layout with flexible header and
              footer settings. Show or hide these sections instantly to create
              clean, professional documents tailored to your needs.`,
    src: "https://res.cloudinary.com/dlbweacrx/video/upload/v1755016626/vettam/header_uuudwo.mov",
  },
  {
    title: "Add & Remove Pages",
    description: `Take full control of your document structure with powerful page
              insertion and deletion tools. Add pages anywhere in your document
              or remove them instantly to create the perfect layout for your
              content.`,
    src: "https://res.cloudinary.com/dlbweacrx/video/upload/v1755016611/vettam/insert_and_delete_xpr2j0.mov",
  },
];

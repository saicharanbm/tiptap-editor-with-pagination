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

export const editorContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Tiptap Pagination",
        },
      ],
    },

    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Start typing our content here...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "All working fine",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Lorem Ipsum",
        },
        {
          type: "text",
          text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Why do we use it?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "hardBreak",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Where does it come from?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Tiptap Pagination",
        },
      ],
    },

    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Start typing our content here...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "All working fine",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Lorem Ipsum",
        },
        {
          type: "text",
          text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Why do we use it?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "hardBreak",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Where does it come from?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Tiptap Pagination",
        },
      ],
    },

    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "Start typing our content here...",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "All working fine",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "Lorem Ipsum",
        },
        {
          type: "text",
          text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Why do we use it?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "hardBreak",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Where does it come from?",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        },
      ],
    },
  ],
};

export const defaultEditorConfig = {
  pageHeight: 1280,
  pageGap: 25,
  pageBackground: "#F2F2F7",
  contentMargin: 25,
  headerAndFooterHeight: 25,
  headerRightContent: "Header Right",
  headerLeftContent: "Header Left",
  footerRightContent: "Made with ❤️ by Sai",
  footerLeftContent: "Page {page}",
};

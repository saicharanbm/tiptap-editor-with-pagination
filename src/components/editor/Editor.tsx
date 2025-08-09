import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle, FontFamily, Color } from "@tiptap/extension-text-style";
import { useEditorStore } from "@/store/useEditorStore";
import { FontStyleExtension } from "@/extensions/font-size";
import { LineHeightExtention } from "@/extensions/line-height";
import { PageBreak } from "@/extensions/page-break";
import { useEffect } from "react";
import CharacterCount from "@tiptap/extension-character-count";

// import Image from "@tiptap/extension-image";
function Editor() {
  const setEditor = useEditorStore((s) => s.setEditor);
  const pageData = useEditorStore((s) => s.pageData);
  const currentPage = useEditorStore((s) => s.currentPage);
  const setPageData = useEditorStore((s) => s.setPageData);
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const addNewPage = useEditorStore((s) => s.addNewPage);

  console.log("pageData", pageData);
  console.log("currentPage", currentPage);
  // const setCurrentPage = useEditorStore((s) => s.setCurrentPage);

  const handlePageBreak = () => {
    if (!editor) return;

    const currentContent = editor.getHTML();
    const pageBreakHTML =
      '<div data-type="page-break" class="page-break-marker"></div>';

    // Find if there's a page break in the content
    const pageBreakIndex = currentContent.indexOf(pageBreakHTML);

    if (pageBreakIndex !== -1) {
      // Split content at page break
      const beforeBreak = currentContent.substring(0, pageBreakIndex);
      const afterBreak = currentContent.substring(
        pageBreakIndex + pageBreakHTML.length
      );

      console.log("beforeBreak", beforeBreak);
      console.log("afterBreak", afterBreak);

      // Update current page with content before break
      setPageData({ content: beforeBreak }, currentPage);

      // Create new page with content after break (if any)
      if (afterBreak.trim()) {
        const newPageId = currentPage + 1;
        if (pageData.length > newPageId) {
          //todo :add the data at the specific position
          addNewPage(newPageId, { content: afterBreak });
        } else setPageData({ content: afterBreak }, newPageId);
        // Switch to the new page
        setCurrentPage(newPageId);
      }
    }
  };

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
      // Check if a page break was just inserted
      const content = editor.getHTML();
      // Check if a page break was just inserted
      if (content.includes('<div data-type="page-break"')) {
        // Delay the handling to ensure the content is properly set
        setTimeout(() => {
          handlePageBreak();
        }, 100);
      } else {
        // Normal content update
        setPageData({ content }, currentPage);
      }
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },

    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    content: pageData[currentPage].content,

    editorProps: {
      attributes: {
        style:
          "padding-left:34px; padding-right:34px; padding-top:34px; padding-bottom:34px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-full min-w-[280px] lg:max-w-[900px] mx-auto cursor-text prose prose-sm sm:prose lg:prose-lg xl:prose-2xl",
      },
    },
    extensions: [
      StarterKit,
      TaskItem.configure({
        nested: true,
      }),
      TaskList,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ImageResize,
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = [
              "example-phishing.com",
              "malicious-site.net",
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = [
              "example-no-autolink.com",
              "another-no-autolink.com",
            ];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      FontStyleExtension,
      LineHeightExtention,
      PageBreak,
      CharacterCount.configure({
        limit: null,
      }),
    ],
  });

  // After editor is initialized
  useEffect(() => {
    if (editor && pageData[currentPage]) {
      const currentContent = editor.getHTML();
      const newContent = pageData[currentPage].content;

      if (currentContent !== newContent) {
        editor.commands.setContent(newContent);
      }
    }
  }, [currentPage, pageData, editor]);
  return <EditorContent editor={editor} className="w-full flex-1 " />;
}

export default Editor;

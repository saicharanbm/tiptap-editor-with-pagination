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
import { useEffect, useRef } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import { type Editor as EditorType } from "@tiptap/react";

// import Image from "@tiptap/extension-image";
function Editor() {
  const setEditor = useEditorStore((s) => s.setEditor);
  const pageData = useEditorStore((s) => s.pageData);
  const currentPage = useEditorStore((s) => s.currentPage);
  const setPageData = useEditorStore((s) => s.setPageData);
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const addNewPage = useEditorStore((s) => s.addNewPage);
  const decrementPage = useEditorStore((s) => s.decrementPage);

  const editorRef = useRef(null);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Add this function outside your component or in a utils file
  const handleContentOverflow = (
    editor: EditorType | null,
    currentPage: number,
    pageData: { content: string }[],
    setPageData: (data: { content: string }, index: number) => void
  ) => {
    if (!editor) return;

    const editorElement = editor.view.dom;
    const maxHeight = 1054; // Your fixed page height

    // Check if content is overflowing
    if (editorElement.scrollHeight <= maxHeight) {
      return; // No overflow, nothing to do
    }

    console.log(
      "Content overflow detected:",
      editorElement.scrollHeight,
      "vs max:",
      maxHeight
    );

    // Create a temporary container to measure content
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.visibility = "hidden";
    tempContainer.style.width = `${editorElement.clientWidth}px`;
    tempContainer.className = editorElement.className;
    tempContainer.style.height = "auto";
    tempContainer.style.maxHeight = "none";
    document.body.appendChild(tempContainer);

    const currentContent = editor.getHTML();

    // Parse the content into nodes
    const parser = new DOMParser();
    const doc = parser.parseFromString(currentContent, "text/html");
    const allNodes = Array.from(doc.body.childNodes);

    let fittingContent = "";
    let overflowContent = "";
    let overflowStartIndex = -1;

    // Find where the overflow starts
    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      const nodeHTML =
        node.nodeType === Node.TEXT_NODE
          ? node.textContent
          : (node as Element).outerHTML;

      // Test adding this node
      const testContent = fittingContent + nodeHTML;
      tempContainer.innerHTML = testContent;

      if (tempContainer.scrollHeight > maxHeight) {
        // This node causes overflow
        overflowStartIndex = i;
        break;
      }

      fittingContent += nodeHTML;
    }

    // Get overflow content
    if (overflowStartIndex !== -1) {
      overflowContent = allNodes
        .slice(overflowStartIndex)
        .map((node) =>
          node.nodeType === Node.TEXT_NODE
            ? node.textContent
            : (node as Element).outerHTML
        )
        .join("");
    }

    document.body.removeChild(tempContainer);

    if (overflowContent.trim()) {
      console.log("Moving overflow content to next page");

      // Update current page with fitting content only
      setPageData({ content: fittingContent }, currentPage);

      // Handle next page
      const nextPageId = currentPage + 1;

      if (pageData.length > nextPageId && pageData[nextPageId]) {
        // Next page exists, prepend overflow content
        const existingContent = pageData[nextPageId].content || "";
        const newContent = overflowContent + existingContent;
        setPageData({ content: newContent }, nextPageId);
      } else {
        // Create new page with overflow content
        setPageData({ content: overflowContent }, nextPageId);
      }

      // Set the editor content to fitting content only
      // Use setTimeout to avoid infinite update loop
      setTimeout(() => {
        if (editor.getHTML() !== fittingContent) {
          editor.commands.setContent(fittingContent);
        }
      }, 0);
    }
  };

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
      // Check for overflow after editor is created with initial content
      setTimeout(() => {
        handleContentOverflow(editor, currentPage, pageData, setPageData);
      }, 100);
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
        // Then check for overflow and handle it
      } else {
        // Normal content update
        setPageData({ content }, currentPage);
        setTimeout(() => {
          handleContentOverflow(editor, currentPage, pageData, setPageData);
        }, 50);
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
        // style:
        //   "padding-left:34px; padding-right:34px; padding-top:34px; padding-bottom:34px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col h-[1054px] w-full min-w-[280px] lg:max-w-[900px] mx-auto cursor-text prose prose-sm sm:prose lg:prose-lg xl:prose-2xl",
      },
      handleKeyDown: (view, event) => {
        const pos = view.state.selection.from;
        const coords = view.coordsAtPos(pos);
        console.log(coords);
        const rect = editor.view.dom.getBoundingClientRect();
        console.log(rect);
        const relativeX = coords.left - rect.left;
        const relativeY = coords.top - rect.top;
        console.log(relativeX, relativeY);

        if (
          event.key === "Backspace" &&
          currentPage > 0 &&
          view.state.selection.from === 1
        ) {
          event.preventDefault();
          // Switch to the previous page
          decrementPage();
          // Optionally move cursor to end of previous page
          setTimeout(() => {
            const prevContentLength = editor?.getHTML().length || 0;
            editor?.commands.focus(prevContentLength);
          }, 0);
          return;
        }
        if (event.key === "Enter" && event.shiftKey) {
          setTimeout(() => {
            editor.chain().focus().insertPageBreak().run();
          }, 0);
        }
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

  // Enhanced useEffect to handle page switching AND overflow check
  useEffect(() => {
    if (editor && pageData[currentPage]) {
      const currentContent = editor.getHTML();
      const newContent = pageData[currentPage].content;

      if (currentContent !== newContent) {
        editor.commands.setContent(newContent);

        // Check for overflow after content is set
        setTimeout(() => {
          handleContentOverflow(editor, currentPage, pageData, setPageData);
        }, 100);
      }
    }
  }, [currentPage, pageData, editor, setCurrentPage, setPageData]);

  // Handle window resize events
  useEffect(() => {
    const handleWindowResize = () => {
      if (!editor) return;

      // Debounce resize handling to avoid excessive calls
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        console.log("Window resized, checking for overflow");
        handleContentOverflow(editor, currentPage, pageData, setPageData);
      }, 300); // 300ms debounce
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [editor, currentPage, pageData, setPageData]);

  return (
    <EditorContent
      editor={editor}
      className="w-full flex-1 h-[1054px]"
      ref={editorRef}
    />
  );
}

export default Editor;

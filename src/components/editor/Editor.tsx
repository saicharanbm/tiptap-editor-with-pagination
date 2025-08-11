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
  const decrementPage = useEditorStore((s) => s.decrementPage);

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

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
      // Check for overflow after editor is created with initial content
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
      handlePaste: (view, event) => {
        event.preventDefault();

        const html = event.clipboardData?.getData("text/html") || "";
        if (!html) return true;

        // Get current editor content and cursor position
        const currentContent = editor.getHTML();
        const cursorPos = view.state.selection.from;

        // Create a test container with the same styling to measure if content fits
        const testContainer = document.createElement("div");
        testContainer.style.position = "absolute";
        testContainer.style.visibility = "hidden";
        testContainer.style.width = `${view.dom.clientWidth}px`;
        testContainer.className = view.dom.className;
        testContainer.style.height = "auto"; // Let it expand naturally
        testContainer.style.maxHeight = "none";
        document.body.appendChild(testContainer);

        // Insert current content + pasted content to test if it all fits
        const beforeCursor = currentContent.substring(0, cursorPos);
        const afterCursor = currentContent.substring(cursorPos);
        const testContent = beforeCursor + html + afterCursor;

        testContainer.innerHTML = testContent;
        const totalHeight = testContainer.scrollHeight;

        // Get the actual editor height (your fixed height of 1054px)
        const editorHeight = view.dom.clientHeight; // Should be 1054px based on your CSS

        document.body.removeChild(testContainer);

        console.log("Current content height:", view.dom.scrollHeight);
        console.log("Test content height:", totalHeight);
        console.log("Editor max height:", editorHeight);
        console.log("Content fits:", totalHeight <= editorHeight);

        if (totalHeight <= editorHeight) {
          // Content fits entirely on current page
          console.log("All content fits, inserting normally");
          editor.commands.insertContent(html);
          return true;
        }

        // Content doesn't fit, need to split it
        console.log("Content doesn't fit, splitting...");

        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.visibility = "hidden";
        tempContainer.style.width = `${view.dom.clientWidth}px`;
        tempContainer.className = view.dom.className;
        tempContainer.style.height = "auto";
        tempContainer.style.maxHeight = "none";
        document.body.appendChild(tempContainer);

        // Start with current content up to cursor
        tempContainer.innerHTML = beforeCursor;
        const baseHeight = tempContainer.scrollHeight;

        const parser = new DOMParser().parseFromString(html, "text/html");
        const allNodes = Array.from(parser.body.childNodes);

        let fittingHTML = "";
        let overflowHTML = "";
        let overflowStartIndex = -1;

        for (let i = 0; i < allNodes.length; i++) {
          const node = allNodes[i];
          const nodeHTML =
            (node as Element).outerHTML || node.textContent || "";

          // Test adding this node
          const testHTML = beforeCursor + fittingHTML + nodeHTML + afterCursor;
          tempContainer.innerHTML = testHTML;

          if (
            tempContainer.scrollHeight > editorHeight &&
            overflowStartIndex === -1
          ) {
            // This node would cause overflow
            overflowStartIndex = i;
            break;
          }

          fittingHTML += nodeHTML;
        }

        // Get overflow content from the overflow start index
        if (overflowStartIndex !== -1) {
          overflowHTML = allNodes
            .slice(overflowStartIndex)
            .map((n) => (n as Element).outerHTML || n.textContent || "")
            .join("");
        } else {
          // All nodes fit, but there might be afterCursor content causing overflow
          // This means we need to move some existing content to next page
          const currentWithPasted = beforeCursor + fittingHTML;
          tempContainer.innerHTML = currentWithPasted;

          if (afterCursor.trim() && tempContainer.scrollHeight < editorHeight) {
            // Try to fit some of the after cursor content
            tempContainer.innerHTML = currentWithPasted + afterCursor;
            if (tempContainer.scrollHeight > editorHeight) {
              // afterCursor needs to go to next page
              overflowHTML = afterCursor;
            }
          }
        }

        document.body.removeChild(tempContainer);

        console.log("Fitting HTML:", fittingHTML.substring(0, 100) + "...");
        console.log("Overflow HTML:", overflowHTML.substring(0, 100) + "...");

        // Insert fitting content on current page
        if (fittingHTML.trim()) {
          editor.commands.insertContent(fittingHTML);
        }

        if (overflowHTML.trim()) {
          // Save current state and create new page
          const updatedContent = editor.getHTML();
          setPageData({ content: updatedContent }, currentPage);

          const nextPageId = currentPage + 1;
          if (pageData.length > nextPageId) {
            const existingContent = pageData[nextPageId].content || "";
            setPageData(
              { content: overflowHTML + existingContent },
              nextPageId
            );
          } else {
            setPageData({ content: overflowHTML }, nextPageId);
          }

          setCurrentPage(nextPageId);
        }

        return true;
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
      }
    }
  }, [currentPage, pageData, editor, setCurrentPage, setPageData]);
  return <EditorContent editor={editor} className="w-full flex-1 " />;
}

export default Editor;

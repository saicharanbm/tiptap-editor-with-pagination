import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle, FontFamily, Color } from "@tiptap/extension-text-style";

import { FontStyleExtension } from "@/extensions/fontSize";
import { LineHeightExtention } from "@/extensions/lineHeight";
import { useEffect, useRef } from "react";
import CharacterCount from "@tiptap/extension-character-count";
import { PaginationPlus } from "@/extensions/paginationPlus";
import { editorContent, defaultEditorConfig } from "@/utils/constants";
import { useEditorStore } from "@/store/useEditorStore";

function Editor() {
  const editorRef = useRef(null);
  const margin = useEditorStore((s) => s.margin);
  const currentPage = useEditorStore((s) => s.currentPage);
  const setCurrentPage = useEditorStore((s) => s.setCurrentPage);
  const setEditor = useEditorStore((s) => s.setEditor);
  const showHeaderAndFooter = useEditorStore((s) => s.showHeaderAndFooter);

  const {
    pageHeight,
    pageGap,
    pageBackground,
    footerRightContent,
    footerLeftContent,
    headerLeftContent,
    headerRightContent,
    contentMargin,
    headerAndFooterHeight,
  } = defaultEditorConfig;

  const editor = useEditor({
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
      CharacterCount.configure({
        limit: null,
      }),
      PaginationPlus.configure({
        pageHeight: pageHeight,
        pageGap: pageGap,
        pageBreakBackground: pageBackground,
        pageHeaderHeight: showHeaderAndFooter ? headerAndFooterHeight : 0,
        pageFooterHeight: showHeaderAndFooter ? headerAndFooterHeight : 0,
        pageGapBorderSize: pageGap,
        footerRight: footerRightContent,
        footerLeft: footerLeftContent,
        headerLeft: headerLeftContent,
        headerRight: headerRightContent,
        marginTop: margin.top,
        marginBottom: margin.bottom,
        marginLeft: margin.left,
        marginRight: margin.right,
        contentMarginTop: showHeaderAndFooter ? contentMargin : 0,
        contentMarginBottom: showHeaderAndFooter ? contentMargin : 0,
      }),
    ],
    content: editorContent,
    autofocus: "start",
    editorProps: {
      attributes: {
        class:
          "focus:outline-none bg-white w-full  min-w-[280px] lg:max-w-[900px] mx-auto cursor-text ",
      },
    },
    onCreate({ editor }) {
      setEditor(editor);
    },
    onUpdate: ({ editor }) => {
      console.log(editor.view.dom);
    },
    onTransaction: ({ editor }) => {
      console.log(editor.getJSON());
      const { selection } = editor.state;
      const view = editor.view;

      const coords = view.coordsAtPos(selection.head);
      const editorRect = view.dom.getBoundingClientRect();

      // Position relative to editor content
      const relativeY = coords.top - editorRect.top + view.dom.scrollTop;
      const activePage = Math.ceil(relativeY / (pageHeight + pageGap));

      if (activePage !== currentPage) {
        setCurrentPage(activePage);
      }

      setEditor(editor);
    },
  });

  // Update pagination when margin changes
  useEffect(() => {
    if (!editor) return;

    // Use the proper command to update page margins
    editor.commands.updatePageMargins({
      left: margin.left,
      right: margin.right,
      top: margin.top,
      bottom: margin.bottom,
    });
  }, [margin, editor]);

  // Update pagination when header/footer visibility changes
  useEffect(() => {
    if (!editor) return;

    // Use the proper command to update header/footer visibility
    editor.commands.updateHeaderFooter({
      headerHeight: showHeaderAndFooter ? headerAndFooterHeight : 0,
      footerHeight: showHeaderAndFooter ? headerAndFooterHeight : 0,
      contentMarginTop: showHeaderAndFooter ? contentMargin : 0,
      contentMarginBottom: showHeaderAndFooter ? contentMargin : 0,
    });
    console.log("Updated header/footer visibility");
    editor.commands.focus();
  }, [showHeaderAndFooter, editor, contentMargin, headerAndFooterHeight]);

  if (!editor) {
    return null;
  }

  return (
    <EditorContent
      editor={editor}
      className=" flex-1   overflow-y-hidden"
      ref={editorRef}
    />
  );
}

export default Editor;

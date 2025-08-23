import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import { TextStyle, FontFamily, Color } from "@tiptap/extension-text-style";
import { useEditorStore } from "@/store/useEditorStore";
import { FontStyleExtension } from "@/extensions/fontSize";
import { LineHeightExtention } from "@/extensions/lineHeight";
import CharacterCount from "@tiptap/extension-character-count";

// import Image from "@tiptap/extension-image";
function Editor() {
  const setEditor = useEditorStore((s) => s.setEditor);

  const padding = useEditorStore((s) => s.padding);
  const showMargin = useEditorStore((s) => s.showMargin);
  const showHeaderAndFooter = useEditorStore((s) => s.showHeaderAndFooter);

  const editor = useEditor({
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },

    content: "<p></p>",

    editorProps: {
      attributes: {
        style: `
        ${
          !showHeaderAndFooter
            ? `padding-top:20px;
  padding-bottom:20px;`
            : ""
        }
  ${
    showMargin
      ? `padding-left:${padding.left}px; padding-right:${padding.right}px;`
      : ""
  }
`,
        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col h-[1054px] oberflow-y-hidden w-full min-w-[280px] lg:max-w-[900px] mx-auto cursor-text ",
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
      CharacterCount.configure({
        limit: null,
      }),
    ],
  });

  return (
    <EditorContent
      editor={editor}
      className="w-full flex-1 h-[1054px] overflow-y-hidden"
    />
  );
}

export default Editor;

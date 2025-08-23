import { Extension } from "@tiptap/core";
import { EditorState, Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet, EditorView } from "@tiptap/pm/view";

interface PaginationPlusOptions {
  pageHeight: number;
  pageGap: number;
  pageBreakBackground: string;
  pageHeaderHeight: number;
  pageFooterHeight: number;
  pageGapBorderSize: number;
  footerRight: string;
  footerLeft: string;
  headerRight: string;
  headerLeft: string;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  contentMarginTop: number;
  contentMarginBottom: number;
}

const page_count_meta_key = "PAGE_COUNT_META_KEY";
const options_update_meta_key = "OPTIONS_UPDATE_META_KEY";

// Helper functions
export const getExistingPageCount = (view: EditorView): number => {
  const editorDom = view.dom;
  const paginationElement = editorDom.querySelector("[data-rm-pagination]");
  if (paginationElement) {
    return paginationElement.children.length;
  }
  return 0;
};

const calculatePageCount = (
  view: EditorView,
  pageOptions: PaginationPlusOptions
): number => {
  const editorDom = view.dom;
  const _pageHeaderHeight =
    pageOptions.pageHeaderHeight +
    pageOptions.contentMarginTop +
    pageOptions.marginTop;
  const _pageFooterHeight =
    pageOptions.pageFooterHeight +
    pageOptions.contentMarginBottom +
    pageOptions.marginBottom;
  const pageContentAreaHeight =
    pageOptions.pageHeight - _pageHeaderHeight - _pageFooterHeight;
  const paginationElement = editorDom.querySelector("[data-rm-pagination]");
  const currentPageCount = getExistingPageCount(view);

  if (paginationElement) {
    const lastElementOfEditor = editorDom.lastElementChild;
    const lastPageBreak =
      paginationElement.lastElementChild?.querySelector(".breaker");

    if (lastElementOfEditor && lastPageBreak) {
      const lastPageGap =
        lastElementOfEditor.getBoundingClientRect().bottom -
        lastPageBreak.getBoundingClientRect().bottom;

      if (lastPageGap > 0) {
        const addPage = Math.ceil(lastPageGap / pageContentAreaHeight);
        return currentPageCount + addPage;
      } else {
        const lpFrom = -10;
        const lpTo = -(pageOptions.pageHeight - 10);

        if (lastPageGap > lpTo && lastPageGap < lpFrom) {
          return currentPageCount;
        } else if (lastPageGap < lpTo) {
          const pageHeightOnRemove =
            pageOptions.pageHeight + pageOptions.pageGap;
          const removePage = Math.floor(lastPageGap / pageHeightOnRemove);
          return currentPageCount + removePage;
        } else {
          return currentPageCount;
        }
      }
    }
    return 1;
  } else {
    const editorHeight = editorDom.scrollHeight;
    const pageCount = Math.ceil(editorHeight / pageContentAreaHeight);
    return pageCount <= 0 ? 1 : pageCount;
  }
};

// Style management functions
const updateEditorPadding = (
  view: EditorView,
  options: PaginationPlusOptions
) => {
  const targetNode = view.dom;
  targetNode.style.paddingLeft = options.marginLeft + "px";
  targetNode.style.paddingRight = options.marginRight + "px";
};

const updateStyles = (options: PaginationPlusOptions) => {
  let existingStyle = document.querySelector(
    "[data-rm-pagination-style]"
  ) as HTMLStyleElement;

  if (!existingStyle) {
    existingStyle = document.createElement("style");
    existingStyle.dataset.rmPaginationStyle = "";
    document.head.appendChild(existingStyle);
  }

  const headerFooterHeight =
    options.pageHeaderHeight + options.pageFooterHeight;
  const _pageHeight = options.pageHeight - headerFooterHeight;

  existingStyle.textContent = `
    .rm-with-pagination {
      counter-reset: page-number;
    }
    .rm-with-pagination .rm-page-footer {
      counter-increment: page-number;
      margin-bottom: ${options.marginBottom}px;
      word-break: break-all;
    }
    .rm-with-pagination .rm-page-break:last-child .rm-pagination-gap {
      display: none;
    }
    .rm-with-pagination .rm-page-break:last-child .rm-page-header {
      display: none;
    }
    
    .rm-with-pagination table tr td,
    .rm-with-pagination table tr th {
      word-break: break-all;
    }
    .rm-with-pagination table > tr {
      display: grid;
      min-width: 100%;
    }
    .rm-with-pagination table {
      border-collapse: collapse;
      width: 100%;
      display: contents;
    }
    .rm-with-pagination table tbody{
      display: table;
      max-height: 300px;
      overflow-y: auto;
    }
    .rm-with-pagination table tbody > tr{
      display: table-row !important;
    }
    .rm-with-pagination p:has(br.ProseMirror-trailingBreak:only-child) {
      display: table;
      width: 100%;
    }
    .rm-with-pagination .table-row-group {
      max-height: ${_pageHeight}px;
      overflow-y: auto;
      width: 100%;
    }
    .rm-with-pagination .rm-page-footer-left,
    .rm-with-pagination .rm-page-footer-right,
    .rm-with-pagination .rm-page-header-left,
    .rm-with-pagination .rm-page-header-right {
      display: inline-block;
    }
    
    .rm-with-pagination .rm-page-header-left,
    .rm-with-pagination .rm-page-footer-left{
      float: left;
      margin-left: ${options.marginLeft}px;
    }
    .rm-with-pagination .rm-page-header-right,
    .rm-with-pagination .rm-page-footer-right{
      float: right;
      margin-right: ${options.marginRight}px;
    }
    .rm-with-pagination .rm-page-number::before {
      content: counter(page-number);
    }
    .rm-with-pagination .rm-first-page-header{
      display: inline-flex;
      justify-content: space-between;
      width: 100%;
    }
    .rm-with-pagination .rm-page-header,
    .rm-with-pagination .rm-first-page-header{
      margin-bottom: ${options.contentMarginTop}px !important;
      margin-top: ${options.marginTop}px !important;
    }
    .rm-with-pagination .rm-page-footer{
      margin-top: ${options.contentMarginBottom}px !important;
      margin-bottom: ${options.marginBottom}px !important;
    }
  `;
};

function createDecoration(
  _: EditorState,
  pageOptions: PaginationPlusOptions,
  isInitial: boolean = false
): Decoration[] {
  const pageWidget = Decoration.widget(
    0,
    (view: EditorView) => {
      const _pageGap = pageOptions.pageGap;
      const _pageHeaderHeight =
        pageOptions.pageHeaderHeight +
        pageOptions.contentMarginTop +
        pageOptions.marginTop;
      const _pageFooterHeight =
        pageOptions.pageFooterHeight +
        pageOptions.contentMarginBottom +
        pageOptions.marginBottom;
      const _pageHeight =
        pageOptions.pageHeight - _pageHeaderHeight - _pageFooterHeight;
      const _pageBreakBackground = pageOptions.pageBreakBackground;

      const el = document.createElement("div");
      el.dataset.rmPagination = "true";

      const pageBreakDefinition = ({
        firstPage = false,
      }: {
        firstPage: boolean;
      }) => {
        const pageContainer = document.createElement("div");
        pageContainer.classList.add("rm-page-break");

        const page = document.createElement("div");
        page.classList.add("page");
        page.style.position = "relative";
        page.style.float = "left";
        page.style.clear = "both";
        page.style.marginTop = firstPage
          ? `calc(${_pageHeaderHeight}px + ${_pageHeight}px)`
          : _pageHeight + "px";

        const pageBreak = document.createElement("div");
        pageBreak.classList.add("breaker");
        pageBreak.style.width = `calc(100% + ${pageOptions.marginLeft}px + ${pageOptions.marginRight}px)`;
        pageBreak.style.marginLeft = `-${pageOptions.marginLeft}px`;
        pageBreak.style.marginRight = `-${pageOptions.marginRight}px`;
        pageBreak.style.position = "relative";
        pageBreak.style.float = "left";
        pageBreak.style.clear = "both";
        pageBreak.style.left = `0px`;
        pageBreak.style.right = `0px`;
        pageBreak.style.zIndex = "2";

        const pageFooter = document.createElement("div");
        pageFooter.classList.add("rm-page-footer");
        pageFooter.style.height = pageOptions.pageFooterHeight + "px";
        pageFooter.style.overflow = "hidden";

        const footerRight = pageOptions.footerRight.replace(
          "{page}",
          `<span class="rm-page-number"></span>`
        );
        const footerLeft = pageOptions.footerLeft.replace(
          "{page}",
          `<span class="rm-page-number"></span>`
        );

        const pageFooterLeft = document.createElement("div");
        pageFooterLeft.classList.add("rm-page-footer-left");
        pageFooterLeft.innerHTML = footerLeft;

        const pageFooterRight = document.createElement("div");
        pageFooterRight.classList.add("rm-page-footer-right");
        pageFooterRight.innerHTML = footerRight;

        pageFooter.append(pageFooterLeft);
        pageFooter.append(pageFooterRight);

        const pageSpace = document.createElement("div");
        pageSpace.classList.add("rm-pagination-gap");
        pageSpace.style.height = _pageGap + "px";

        pageSpace.style.position = "relative";
        pageSpace.style.setProperty("width", "calc(100% + 2px)", "important");
        pageSpace.style.left = "-1px";
        pageSpace.style.backgroundColor = _pageBreakBackground;

        const pageHeader = document.createElement("div");
        pageHeader.classList.add("rm-page-header");
        pageHeader.style.height = pageOptions.pageHeaderHeight + "px";
        pageHeader.style.overflow = "hidden";

        const pageHeaderLeft = document.createElement("div");
        pageHeaderLeft.classList.add("rm-page-header-left");
        pageHeaderLeft.innerHTML = pageOptions.headerLeft;

        const pageHeaderRight = document.createElement("div");
        pageHeaderRight.classList.add("rm-page-header-right");
        pageHeaderRight.innerHTML = pageOptions.headerRight;

        pageHeader.append(pageHeaderLeft, pageHeaderRight);
        pageBreak.append(pageFooter, pageSpace, pageHeader);
        pageContainer.append(page, pageBreak);

        return pageContainer;
      };

      const page = pageBreakDefinition({ firstPage: false });
      const firstPage = pageBreakDefinition({ firstPage: true });
      const fragment = document.createDocumentFragment();

      const pageCount = calculatePageCount(view, pageOptions);

      for (let i = 0; i < pageCount; i++) {
        if (i === 0) {
          fragment.appendChild(firstPage.cloneNode(true));
        } else {
          fragment.appendChild(page.cloneNode(true));
        }
      }
      el.append(fragment);
      el.id = "pages";

      return el;
    },
    { side: -1 }
  );

  const firstHeaderWidget = Decoration.widget(
    0,
    () => {
      const el = document.createElement("div");
      el.style.position = "relative";
      el.classList.add("rm-first-page-header");

      const pageHeaderLeft = document.createElement("div");
      pageHeaderLeft.classList.add("rm-first-page-header-left");
      pageHeaderLeft.innerHTML = pageOptions.headerLeft;
      el.append(pageHeaderLeft);

      const pageHeaderRight = document.createElement("div");
      pageHeaderRight.classList.add("rm-first-page-header-right");
      pageHeaderRight.innerHTML = pageOptions.headerRight;
      el.append(pageHeaderRight);

      el.style.height = `${pageOptions.pageHeaderHeight}px`;
      el.style.overflow = "hidden";
      return el;
    },
    { side: -1 }
  );

  return !isInitial ? [pageWidget, firstHeaderWidget] : [pageWidget];
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    paginationPlus: {
      updatePaginationOptions: (
        newOptions: Partial<PaginationPlusOptions>
      ) => ReturnType;
      refreshPagination: () => ReturnType;
      updatePageMargins: (margins: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
      }) => ReturnType;
      updateHeaderFooter: (content: {
        headerHeight: number;
        footerHeight: number;
        contentMarginTop: number;
        contentMarginBottom: number;
        headerLeft?: string;
        headerRight?: string;
        footerLeft?: string;
        footerRight?: string;
      }) => ReturnType;
    };
  }
}

export const PaginationPlus = Extension.create<PaginationPlusOptions>({
  name: "PaginationPlus",

  addOptions() {
    return {
      pageHeight: 800,
      pageGap: 50,
      pageGapBorderSize: 1,
      pageBreakBackground: "#ffffff",
      pageHeaderHeight: 30,
      pageFooterHeight: 30,
      footerRight: "{page}",
      footerLeft: "",
      headerRight: "",
      headerLeft: "",
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 50,
      marginRight: 50,
      contentMarginTop: 10,
      contentMarginBottom: 10,
    };
  },

  addCommands() {
    return {
      updatePaginationOptions:
        (newOptions: Partial<PaginationPlusOptions>) =>
        ({ tr, dispatch, editor }) => {
          // Update the extension options
          Object.assign(this.options, newOptions);

          // Update styles and editor padding
          updateStyles(this.options);
          updateEditorPadding(editor.view, this.options);

          // Trigger decoration update with new options
          if (dispatch) {
            const transaction = tr
              .setMeta(page_count_meta_key, Date.now())
              .setMeta("updated_options", { ...this.options });
            dispatch(transaction);
          }
          return true;
        },

      refreshPagination:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            const transaction = tr
              .setMeta(page_count_meta_key, Date.now())
              .setMeta("updated_options", { ...this.options });
            dispatch(transaction);
          }
          return true;
        },

      updatePageMargins:
        (margins: {
          left?: number;
          right?: number;
          top?: number;
          bottom?: number;
        }) =>
        ({ tr, dispatch, editor }) => {
          if (margins.left !== undefined)
            this.options.marginLeft = margins.left;
          if (margins.right !== undefined)
            this.options.marginRight = margins.right;
          if (margins.top !== undefined) this.options.marginTop = margins.top;
          if (margins.bottom !== undefined)
            this.options.marginBottom = margins.bottom;

          updateStyles(this.options);
          updateEditorPadding(editor.view, this.options);

          if (dispatch) {
            const transaction = tr
              .setMeta(options_update_meta_key, Date.now())
              .setMeta("updated_options", { ...this.options });
            dispatch(transaction);
          }
          return true;
        },

      updateHeaderFooter:
        (content: {
          headerHeight: number;
          footerHeight: number;
          contentMarginTop: number;
          contentMarginBottom: number;
          headerLeft?: string;
          headerRight?: string;
          footerLeft?: string;
          footerRight?: string;
        }) =>
        ({ tr, dispatch, editor }) => {
          this.options.pageHeaderHeight = content.headerHeight;
          this.options.pageFooterHeight = content.footerHeight;
          this.options.contentMarginTop = content.contentMarginTop;
          this.options.contentMarginBottom = content.contentMarginBottom;
          // Update only if values are provided
          if (content.headerLeft !== undefined)
            this.options.headerLeft = content.headerLeft;
          if (content.headerRight !== undefined)
            this.options.headerRight = content.headerRight;
          if (content.footerLeft !== undefined)
            this.options.footerLeft = content.footerLeft;
          if (content.footerRight !== undefined)
            this.options.footerRight = content.footerRight;
          updateStyles(this.options);
          updateEditorPadding(editor.view, this.options);

          if (dispatch) {
            const transaction = tr
              .setMeta(options_update_meta_key, Date.now())
              .setMeta("updated_options", { ...this.options });
            dispatch(transaction);
          }

          return true;
        },
    };
  },

  onCreate() {
    const targetNode = this.editor.view.dom;
    targetNode.classList.add("rm-with-pagination");

    // Initial setup
    updateEditorPadding(this.editor.view, this.options);
    updateStyles(this.options);

    const config = { attributes: true };

    const refreshPage = (targetNode: HTMLElement) => {
      const paginationElement = targetNode.querySelector(
        "[data-rm-pagination]"
      );
      if (paginationElement) {
        const lastPageBreak = paginationElement.lastElementChild?.querySelector(
          ".breaker"
        ) as HTMLElement;
        if (lastPageBreak) {
          const minHeight =
            lastPageBreak.offsetTop + lastPageBreak.offsetHeight;
          targetNode.style.minHeight = `${minHeight}px`;
        }
      }
    };

    const callback = (mutationList: MutationRecord[]) => {
      if (mutationList.length > 0 && mutationList[0].target) {
        const _target = mutationList[0].target as HTMLElement;
        if (_target.classList.contains("rm-with-pagination")) {
          const currentPageCount = getExistingPageCount(this.editor.view);
          const pageCount = calculatePageCount(this.editor.view, this.options);
          if (currentPageCount !== pageCount) {
            const tr = this.editor.view.state.tr.setMeta(
              page_count_meta_key,
              Date.now()
            );
            this.editor.view.dispatch(tr);
          }
          refreshPage(_target);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    refreshPage(targetNode);
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    const initialOptions = { ...this.options }; // Create a copy

    return [
      new Plugin({
        key: new PluginKey("pagination"),

        state: {
          init(_, state) {
            const widgetList = createDecoration(state, initialOptions);
            return {
              decorations: DecorationSet.create(state.doc, widgetList),
              options: initialOptions,
            };
          },
          apply(tr, oldState, _, newState) {
            // Check for options update
            const optionsUpdated = tr.getMeta(options_update_meta_key);
            const pageCountUpdated = tr.getMeta(page_count_meta_key);

            // Get current options from meta or use existing
            const currentOptions = optionsUpdated
              ? tr.getMeta("updated_options") || oldState.options
              : oldState.options;

            const pageCount = calculatePageCount(editor.view, currentOptions);
            const currentPageCount = getExistingPageCount(editor.view);

            // Update decorations if page count changed or options were updated
            if (
              (pageCount > 1 ? pageCount : 1) !== currentPageCount ||
              optionsUpdated ||
              pageCountUpdated
            ) {
              const widgetList = createDecoration(newState, currentOptions);
              return {
                decorations: DecorationSet.create(newState.doc, [
                  ...widgetList,
                ]),
                options: currentOptions,
              };
            }

            return {
              decorations: oldState.decorations,
              options: currentOptions,
            };
          },
        },

        props: {
          decorations(state: EditorState) {
            const pluginState = this.getState(state);
            return pluginState?.decorations || DecorationSet.empty;
          },
        },
      }),
    ];
  },
});

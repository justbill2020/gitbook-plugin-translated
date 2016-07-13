declare namespace Gitbook {
  interface Page {
    /** Parser named */
    type: string
    /** File Path relative to book root */
    path: string
    /** Absolute file path */
    rawpath: string
    /** Title of the page in the SUMMARY */
    title: string
    /**
     * Content of the page
     * Markdown/Asciidoc in "page:before"，HTML in "page"。
    */
    content: string
  }
  interface Gitbook {
    events
    keyboard
    navigation
    page
    sidebar
    state
    storage
    toolbar
  }
}

declare function require(modules: string[], module: (gitbook: Gitbook.Gitbook, $) => void)
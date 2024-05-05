interface ReaderTheme {
  /** key to register theme for a book rendition */
  key: string, 
  content: object 
}

export const defaultReaderTheme: ReaderTheme = {
  key: 'default',
  content: {
    '*': {
      'margin': '0 auto',
      'line-height': '1.75rem',
      'box-sizing': 'border-box',
      'font-family': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important',
    },
    'body': {
      'padding': '2rem !important',
    },
    'a': {
      'color': '#80c8ff',
    },
    'img': {
      'border-radius': '4px',
    }
  }
}

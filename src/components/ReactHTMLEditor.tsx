import React, { useEffect, useState } from 'react'
import Editor from 'react-simple-wysiwyg'
import sanitizeHtml from 'sanitize-html'

function sanitize (html: string) {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'img',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'a',
      'ul',
      'ol',
      'li',
      'blockquote',
      'code',
      'pre',
      'figure',
      'figcaption',
      'div',
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'name', 'target'],
      img: ['src', 'alt'],
    },
    allowedIframeHostnames: ['www.youtube.com', 'lh3.googleusercontent.com'],
  })
}

export default function ReactHTMLEditor () {
  const [html, setHtml] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  // Handler for the textarea field
  function onTextFieldChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
    setHtml(sanitize(e.target.value))
  }

  // Handler for the WYSIWYG editor
  function onWysiwygChange (e: any) {
    setHtml(sanitize(e.target.value))
  }

  function handleClipboardCopy () {
    navigator.clipboard.writeText(sanitize(html))
    setIsCopied(true)
  }

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 1000)

      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  return (
    <section className='flex flex-col gap-5'>
      <Editor
        className='border-2 border-black dark:border-white min-h-32'
        value={html}
        onChange={onWysiwygChange}
      />

      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label className='font-bold'>Resultado (HTML):</label>
          <span className='text-sm text-gray-600 dark:text-gray-300'>
            Pega aquí HTML para editarlo, o cópialo para usarlo en tu proyecto.
          </span>
        </div>
        <textarea
          className='p-2 border-2 border-black dark:border-white'
          rows={5}
          value={html}
          onChange={onTextFieldChange}
        />

        <button
          disabled={isCopied || !html}
          onClick={handleClipboardCopy}
          className='p-2 text-white bg-blue-700 disabled:opacity-50'
        >
          {isCopied ? '¡Copiado!' : 'Copiar HTML'}
        </button>
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

export default function MarkdownTypingEffect({ markdown }: { markdown: string }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + markdown[i])
      i++
      if (i >= markdown.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, 20)
    return () => clearInterval(interval)
  }, [markdown])

  return (
    <div className="prose max-w-none dark:prose-invert">
      {done ? (
        <ReactMarkdown>{markdown}</ReactMarkdown>
      ) : (
        <pre className="whitespace-pre-wrap">{displayed}</pre>
      )}
    </div>
  )
}

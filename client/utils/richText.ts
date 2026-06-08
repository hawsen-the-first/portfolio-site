export interface RichTextChild {
  type?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  children?: RichTextChild[]
}

export interface RichTextBlock {
  type: 'paragraph' | 'heading' | 'list' | string
  level?: number
  format?: 'ordered' | 'unordered'
  children: RichTextChild[]
}

function parseSoftBreaks(text: string | undefined): string {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>')
    .replace(/\[br\]/g, '<br>')
}

function applyStyles(child: RichTextChild, inner: string): string {
  let out = inner
  if (child.code) out = `<code>${out}</code>`
  if (child.strikethrough) out = `<s>${out}</s>`
  if (child.underline) out = `<u>${out}</u>`
  if (child.bold) out = `<strong>${out}</strong>`
  if (child.italic) out = `<em>${out}</em>`
  return out
}

function renderChild(child: RichTextChild): string {
  if (child.url) return ''
  const text = parseSoftBreaks(child.text) ?? ''
  return applyStyles(child, text)
}

function renderParagraph(block: RichTextBlock): string {
  const inner = (block.children ?? []).map(renderChild).join('')
  return `<p>${inner}</p>`
}

function renderHeading(block: RichTextBlock): string {
  const text = parseSoftBreaks(block.children?.[0]?.text) ?? ''
  const styled = applyStyles(block.children?.[0] ?? {}, text)
  const tag = `h${block.level ?? 1}`
  return `<${tag}>${styled}</${tag}>`
}

function renderList(block: RichTextBlock): string {
  const items = (block.children ?? []).map((item) => {
    const text = item.children?.[0]?.text ?? ''
    return `<li>${applyStyles(item.children?.[0] ?? {}, text)}</li>`
  })
  const tag = block.format === 'ordered' ? 'ol' : 'ul'
  return `<${tag}>${items.join('')}</${tag}>`
}

export function buildRichText(blocks: RichTextBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'heading': return renderHeading(block)
        case 'list': return renderList(block)
        default: return renderParagraph(block)
      }
    })
    .join('')
}

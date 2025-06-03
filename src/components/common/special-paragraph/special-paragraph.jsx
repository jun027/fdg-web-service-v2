import { memo, useMemo } from 'react'

function SpecialParagraph({ type = 'dot', prefix = '', text = '' }) {
  // type might be 'dot' or 'number'
  const prefixElement = useMemo(() => {
    if (type === 'dot') {
      return <p className="ml-1 mr-2">•</p>
    }
    if (type === 'number') {
      return <p className="ml-1 mr-1">{prefix}</p>
    }
    return
  }, [type, prefix])

  return (
    <div className="flex flex-row items-start">
      {prefixElement}
      <p dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  )
}

export default memo(SpecialParagraph)

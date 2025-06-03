'use client'

import { memo, useRef, useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

function QAList({
  list = [
    {
      id: 1,
      question: '問題1',
      answer: '答案1',
    },
  ],
}) {
  const [expandedItems, setExpandedItems] = useState({})
  const contentReferences = useRef({})

  const toggleQA = id => {
    setExpandedItems(previous => ({
      [id]: !previous[id] && true,
    }))
  }

  return (
    <div className="flex flex-col gap-y-6">
      {list.map(item => {
        return (
          <div
            key={item.id}
            className="pb-3 border-b-[1px] border-white xl:pb-6"
          >
            <div
              role="button"
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleQA(item.id)}
            >
              <p className="text-white desktop-jf-h3 xl:desktop-jf-h1">
                {item.question}
              </p>
              <span>
                {expandedItems[item.id] ? (
                  <FiMinus className="text-2xl text-white" />
                ) : (
                  <FiPlus className="text-2xl text-white" />
                )}
              </span>
            </div>
            <div
              id={`qa-${item.id}`}
              ref={element => (contentReferences.current[item.id] = element)}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: expandedItems[item.id]
                  ? `${contentReferences.current[item.id]?.scrollHeight}px`
                  : '0',
              }}
            >
              <div className="text-white mobile-jf-h5 pt-3 xl:desktop-jf-h3 xl:pt-6">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default memo(QAList)

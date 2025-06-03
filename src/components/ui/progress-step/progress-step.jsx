import clsx from 'clsx'
import React from 'react'

function ProgressStep({ steps = [{ id: '1', label: '' }], currentStepId }) {
  return (
    <div className="flex justify-between items-center sm:gap-x-12">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center gap-y-4">
            <div
              className={clsx(
                'flex justify-center items-center rounded-full border-[1px] border-primary-main text-primary-main w-9 h-9 desktop-jf-h3',
                step.id === currentStepId && 'bg-primary-main text-white',
              )}
            >
              {index + 1}
            </div>
            <p className="desktop-jf-h3 text-primary-main">{step.label}</p>
          </div>
          {index !== steps.length - 1 && (
            <div className="border-t-[1px] border-dashed border-primary-main flex-1" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ProgressStep

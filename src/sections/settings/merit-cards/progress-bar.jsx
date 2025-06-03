function ProgressBar({ progress, currentAmount }) {
  return (
    <div className="relative w-full h-full">
      {/* Bar Background */}
      <div className="relative w-full overflow-hidden rounded-full h-[3px] bg-white sm:h-3">
        <div
          style={{ transform: `translateX(${progress}%)` }}
          className="absolute w-full h-full top-0 left-0"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-primary-main -translate-x-full" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div
        className="absolute w-full top-0 h-full pointer-events-none"
        style={{ transform: `translateX(${progress}%)` }}
      >
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-main">
          {/* Amount Label */}
          <div className="absolute top-[-46px] left-1/2 -translate-x-1/2">
            <div className="bg-primary-main rounded-sm py-2 px-3">
              <p className="desktop-jf-h4 text-white">${currentAmount}</p>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary-main rotate-z-45" />
          </div>

          {/* Center Point */}
          <div className="absolute w-[6px] h-[6px] bg-secondary-notion top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar

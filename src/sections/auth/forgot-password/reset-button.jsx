import useCountdown from '@bradgarropy/use-countdown'
import clsx from 'clsx'
import { useCallback } from 'react'
import { TbRefresh } from 'react-icons/tb'

function ResetButton({ onClick = () => {} }) {
  const countdown = useCountdown({
    minutes: 0,
    seconds: 5,
    format: 'mm:ss',
    autoStart: false,
  })

  const handleOnClick = useCallback(() => {
    if (countdown.isRunning) return

    countdown.reset()
    countdown.start()
    onClick()
  }, [countdown, onClick])

  return (
    <div className="flex items-center gap-x-1 text-primary-main">
      <button
        type="button"
        className={clsx(
          !countdown.isRunning && 'cursor-pointer',
          countdown.isRunning && 'text-gray-600/40 cursor-not-allowed',
          'desktop-jf-h3 flex items-center gap-x-1',
        )}
        onClick={handleOnClick}
      >
        <TbRefresh className="text-xl" />
        重新發送
      </button>
      {countdown.isRunning && (
        <p className="desktop-jf-h3 text-gray-600/40">{countdown.seconds}s</p>
      )}
    </div>
  )
}

export default ResetButton

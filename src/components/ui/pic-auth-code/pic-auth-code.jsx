/* eslint-disable react/display-name */
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

const PicAuthCode = forwardRef((props, _ref) => {
  // 預先決定驗證碼區塊的設定
  const config = {
    contentWidth: 160, // 驗證碼區域的寬
    contentHeight: 44, // 驗證碼區域的高
    backgroundColorMin: 180, // 背景色的 rgb 最小值
    backgroundColorMax: 240, // 背景色的 rgb 最大值

    fontSizeMin: 20,
    fontSizeMax: 24,
    colorMin: 50, // 文字顏色的 rgb 最小值
    colorMax: 160, // 文字顏色的 rgb 最大值
    // 選擇 50-160 是為了凸顯文字而選擇較深的顏色

    lineColorMin: 40, // 干擾線的顏色 rgb 最小值
    lineColorMax: 180, // 干擾線的顏色 rgb 最大值
    dotColorMin: 0, // 干擾點的顏色 rgb 最小值
    dotColorMax: 255, // 干擾點的顏色 rgb 最大值
  }

  // 透過 useState 去控制驗證碼 (identifyCode) 的 state
  const [identifyCode, setIdentifyCode] = useState('')

  // 透過 useRef 去控制 canvas 的內容，可以直接操作 DOM element
  const canvasRef = useRef()

  // 隨機生成數字
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  // 隨機生成 rgba 色碼
  const randomColor = (min, max) => {
    let r = randomNumber(min, max)
    let g = randomNumber(min, max)
    let b = randomNumber(min, max)
    return `rgba(${r},${g}, ${b}, 1)`
  }

  // 生成字體的顏色、大小和位置
  const drawText = (context, txt, index) => {
    // 隨機生成字體顏色
    context.fillStyle = randomColor(config.colorMin, config.colorMax)

    // 隨機生成字體大小
    context.font =
      randomNumber(config.fontSizeMin, config.fontSizeMax) + 'px Arial'

    // 設定位置，(i + 1) 會讓文字逐漸向右
    let x = (index + 1) * (config.contentWidth / (identifyCode.length + 1))
    let y = randomNumber(config.fontSizeMax, config.contentHeight - 12)

    // 設定文字本身旋轉度數的範圍
    let deg = randomNumber(-20, 20)

    // 設置 canvas 畫布原點和旋轉角度
    context.translate(x, y) // translate(x,y) = 移動網格上的畫布
    context.rotate((deg * Math.PI) / 180) // Math.PI = 圓周率
    context.fillText(txt, 0, 0) // fillText(canvas 繪製內容，x 方向偏移，y 方向偏移)

    // 校正座標原點和旋轉角度
    context.rotate((-deg * Math.PI) / 180)
    context.translate(-x, -y)
  }

  // 繪製干擾線
  const drawLine = context => {
    for (let index = 0; index < 3; index++) {
      // strokeStyle = 框線的顏色
      context.strokeStyle = randomColor(
        config.lineColorMin,
        config.lineColorMax,
      )
      context.beginPath() // 開啟繪圖
      context.moveTo(
        // 移動畫筆
        randomNumber(0, config.contentWidth),
        randomNumber(0, config.contentHeight),
      )
      context.lineTo(
        // 畫出線條
        randomNumber(0, config.contentWidth),
        randomNumber(0, config.contentHeight),
      )
      //ctx.closePath(); // 結束路徑，連接起點與終點，但因為是畫線條，所以不需要
      context.stroke() // 畫出邊框
    }
  }

  // 繪製干擾點
  const drawDot = context => {
    for (let index = 0; index < 10; index++) {
      context.fillStyle = randomColor(0, 255)
      context.beginPath() // 開啟繪圖

      // 繪製弧形 arc(x, y, radius, startAngle, endAngle, anticlockwise)，單位 π
      context.arc(
        randomNumber(0, config.contentWidth),
        randomNumber(0, config.contentHeight),
        1,
        0,
        2 * Math.PI, // 2π = circle
        // 因為是畫整個 dot (circle) 所以不需要設定順時鐘或逆時鐘
      )
      context.fill() // 把路徑的內部區域填充顏色，生成實心的圖形
    }
  }

  // 刷新 auth Code
  const refresh = () => {
    setIdentifyCode(props.code())
  }

  // 繪製整個驗證碼圖
  const drawPic = () => {
    let canvas = canvasRef.current

    let context = canvas.getContext('2d') // 2D繪圖

    // 設定背景的顏色
    context.fillStyle = randomColor(
      config.backgroundColorMin,
      config.backgroundColorMax,
    )

    // 畫出驗證碼區域的背景
    context.fillRect(0, 0, config.contentWidth, config.contentHeight)

    for (const [index, element] of [...identifyCode].entries()) {
      drawText(context, element, index)
    }

    drawLine(context)
    drawDot(context)
  }

  useImperativeHandle(_ref, () => ({
    onRefresh: refresh,
  }))

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // dependency = empty array，代表只有在 initial render 時執行

  useEffect(() => {
    identifyCode && drawPic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identifyCode]) // 當 identifyCode 改變，干擾點(線)、文字顏色和背景才會改變

  return (
    <canvas
      ref={canvasRef} // 透過 useRef 去直接操作 HTML DOM 元素
      width={config.contentWidth}
      height={config.contentHeight}
      //   onClick={refresh} // 每次 click 就會刷新驗證碼
      style={{ borderRadius: '5px' }}
      // 透過 cursor: "pointer" 提示 user 可以透過 click 去改變驗證碼
    />
  )
})

export default PicAuthCode

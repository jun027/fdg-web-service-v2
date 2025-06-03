import { useRef, useState } from 'react'

export default function usePicValidateCode() {
  const [authCode, setAuthCode] = useState('')
  const picAuthCodeRef = useRef(null)

  const codeHandler = () => {
    const words = 'QWERTYUIPASDFGHJKLZXCVBNM123456789'
    let code = ''

    // 驗證碼為四碼
    for (let index = 0; index < 4; index++) {
      code += words[Math.floor(Math.random() * 34)]
    }
    setAuthCode(code)
    return code
  }

  return { picAuthCodeRef, authCode, codeHandler }
}

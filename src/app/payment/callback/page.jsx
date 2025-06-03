'use client'

import { useMutation } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback, useEffect } from 'react'

import { payResultAPI } from '@/apis/hook/use-order'
import { useRouter } from '@/routes/hooks'
import { PATHS } from '@/routes/path'

function PaymentCallbackContent() {
  const searchParams = useSearchParams()
  const sendType = searchParams.get('Send_Type')
  const result = searchParams.get('result')
  const orderId = searchParams.get('OrderID')
  const eventOrderNo = searchParams.get('e_orderno')
  const returnValueMessage = searchParams.get('ret_msg')
  const avCode = searchParams.get('AvCode')
  const invoiceNo = searchParams.get('Invoice_No')
  const stringCheck = searchParams.get('str_check')

  console.log('sendType:', sendType)
  console.log('result:', result)
  console.log('orderId:', orderId)
  console.log('eventOrderNo:', eventOrderNo)
  console.log('returnValueMessage:', returnValueMessage)
  console.log('avCode:', avCode)
  console.log('invoiceNo:', invoiceNo)
  console.log('stringCheck:', stringCheck)

  const router = useRouter()
  const { mutateAsync } = useMutation({
    mutationKey: ['order-payResult'],
    mutationFn: payload => payResultAPI(payload),
    onSuccess: () => {
      router.push(PATHS.Projects.child.DonateComplete.path)
    },
  })

  const handlePayResult = useCallback(async () => {
    const payload = {
      Send_Type: sendType,
      result,
      OrderID: orderId,
      e_orderno: eventOrderNo,
      ret_msg: returnValueMessage,
      AvCode: avCode,
      Invoice_No: invoiceNo,
      str_check: stringCheck,
    }

    console.log('[handlePayResult] payload:', payload)

    await mutateAsync(payload)
  }, [
    mutateAsync,
    sendType,
    result,
    orderId,
    eventOrderNo,
    returnValueMessage,
    avCode,
    invoiceNo,
    stringCheck,
  ])

  useEffect(() => {
    handlePayResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div>Waiting...</div>
}

export default function PaymentCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCallbackContent />
    </Suspense>
  )
}

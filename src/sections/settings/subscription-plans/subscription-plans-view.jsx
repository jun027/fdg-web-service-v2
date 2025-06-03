/* eslint-disable unicorn/no-null */
'use client'

import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IoClose } from 'react-icons/io5'

import { subRecordsAPI } from '@/apis/hook/use-member'
import { DataTablePro } from '@/components/common/dataTablePro'

function SubscriptionPlansView() {
  const [dataList, setDataList] = useState([])

  const { mutateAsync } = useMutation({
    mutationKey: ['member-subRecords'],
    mutationFn: payload => subRecordsAPI(payload),
    onSuccess: data => {
      const {
        data: { list },
      } = data

      setDataList(list)
    },
  })

  const handleCancelSubscription = useCallback(id => {
    console.log(id)
  }, [])

  const columns = useMemo(
    () => [
      {
        header: '日期時間',
        accessorKey: 'order_date',
        id: 'order_date',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              {row.original.order_date}
              <br />
              {row.original.order_datetime}
            </p>
          )
        },
      },
      {
        header: '方案名稱',
        accessorKey: 'item_name',
        id: 'item_name',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              {row.original.item_name}
            </p>
          )
        },
      },
      {
        header: '方案類型',
        accessorKey: 'pay_type_name',
        id: 'pay_type_name',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              {row.original.pay_type_name}
            </p>
          )
        },
      },
      {
        header: '金額',
        accessorKey: 'amount',
        id: 'amount',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              ${row.original.amount}
            </p>
          )
        },
      },
      {
        header: '扣款日期',
        accessorKey: 'paied_date',
        id: 'paied_date',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              {row.original.paied_date}
            </p>
          )
        },
      },
      {
        header: '取消訂閱',
        accessorKey: 'cancel_subscription',
        id: 'cancel_subscription',
        width: 15,
        align: 'left',
        // eslint-disable-next-line no-unused-vars
        cell: ({ row }) => {
          return (
            <div>
              <button
                className="cursor-pointer w-6 h-6 flex items-center justify-center"
                onClick={() => handleCancelSubscription('id')}
              >
                <IoClose className="text-base text-primary-main" />
              </button>
            </div>
          )
        },
      },
    ],
    [handleCancelSubscription],
  )

  const fetchData = useCallback(async () => {
    const payload = {
      page: null,
      limit: null,
    }
    await mutateAsync(payload)
  }, [mutateAsync])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="pb-6">
      <DataTablePro
        loading={false}
        headerRowSx={{
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          backgroundColor: '#5d4037',
          color: '#fff',
        }}
        tableMinWidth={800}
        tbodyHeight={600}
        data={dataList}
        columns={columns}
        pageSizeList={[10, 30, 50, 100]}
        defaultSortBy={[{ id: 'date', desc: true }]}
      />
    </div>
  )
}

export default SubscriptionPlansView

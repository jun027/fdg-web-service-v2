/* eslint-disable unicorn/no-null */
'use client'

import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaFileDownload } from 'react-icons/fa'

import { historyAPI } from '@/apis/hook/use-member'
import { DataTablePro } from '@/components/common/dataTablePro'

function BlessingRecordsView() {
  const [dataList, setDataList] = useState([])

  const { mutateAsync } = useMutation({
    mutationKey: ['member-history'],
    mutationFn: payload => historyAPI(payload),
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
        header: '日期/時間',
        accessorKey: 'date',
        id: 'date',
        width: 15,
        align: 'left',
        // eslint-disable-next-line no-unused-vars
        cell: ({ row }) => {
          const { order_date, order_datetime } = row.original
          return (
            <p className="text-primary-main desktop-jf-h4">
              {order_date} {order_datetime}
            </p>
          )
        },
      },
      {
        header: '祈福項目',
        accessorKey: 'item_name',
        id: 'name',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          const { item_name } = row.original
          return <p className="text-primary-main desktop-jf-h4">{item_name}</p>
        },
      },
      {
        header: '捐款金額',
        accessorKey: 'amount',
        id: 'amount',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              $ {row.original.amount}
            </p>
          )
        },
      },
      {
        header: '處理狀態',
        accessorKey: 'process_state',
        id: 'process_state',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <p className="text-primary-main desktop-jf-h4">
              {row.original.process_state}
            </p>
          )
        },
      },
      {
        header: '收據下載',
        accessorKey: 'receiptUrl',
        id: 'receiptUrl',
        width: 15,
        align: 'left',
        cell: ({ row }) => {
          return (
            <div>
              {row.original.receiptUrl && (
                <button
                  className="cursor-pointer w-6 h-6 flex items-center justify-center"
                  onClick={() => handleCancelSubscription('id')}
                >
                  <FaFileDownload className="text-base text-primary-main" />
                </button>
              )}
            </div>
          )
        },
      },
      {
        header: '備註',
        accessorKey: 'date',
        id: 'note',
        width: 15,
        align: 'left',
        // eslint-disable-next-line no-unused-vars
        cell: ({ row }) => {
          return ''
          // <div>
          //   <p className="text-primary-main desktop-jf-h4 underline underline-offset-1">
          //     點我付款
          //   </p>
          // </div>
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

export default BlessingRecordsView

import { useMemo } from 'react'

import { NewsBlocks, NewsCarousel, NewsContainer } from '.'

function NewsView() {
  const dataList = useMemo(
    () => [
      {
        id: 1,
        type: 1,
        title: '補財庫1',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 2,
        type: 2,
        title: '補財庫2',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 3,
        type: 3,
        title: '補財庫3',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 4,
        type: 1,
        title: '補財庫4',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 5,
        type: 2,
        title: '補財庫5',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 6,
        type: 3,
        title: '補財庫6',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 7,
        type: 1,
        title: '補財庫7',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 8,
        type: 2,
        title: '補財庫8',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 9,
        type: 3,
        title: '補財庫9',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 10,
        type: 1,
        title: '補財庫10',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 11,
        type: 2,
        title: '補財庫11',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 12,
        type: 3,
        title: '補財庫12',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 13,
        type: 1,
        title: '補財庫13',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 14,
        type: 1,
        title: '補財庫14',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 15,
        type: 1,
        title: '補財庫15',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 16,
        type: 1,
        title: '補財庫16',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 17,
        type: 1,
        title: '補財庫17',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 18,
        type: 1,
        title: '補財庫18',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 19,
        type: 1,
        title: '補財庫19',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 20,
        type: 1,
        title: '補財庫20',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
      {
        id: 21,
        type: 1,
        title: '補財庫21',
        previewContent:
          '財運不順？收入停滯？感覺錢財來得快卻留不住？福德宮補財庫儀式，幫助幫助您向天神敬獻誠信，補足個人或企業的財庫能量，讓財運暢通、正財偏財俱旺、財源滾滾',
        previewImage: 'https://picsum.photos/400/200',
        date: '2025/05/15',
      },
    ],
    [],
  )

  return (
    <div>
      <div className="main-background">
        <NewsCarousel />

        <div className="pt-[52px] px-4 mx-auto max-w-[650px] lg:max-w-none">
          <div className="mb-12 lg:[100px]">
            <NewsBlocks id="new-blocks" list={dataList} />
          </div>
          <div className="lg:max-w-[1280px] lg:mx-auto">
            <NewsContainer list={dataList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsView

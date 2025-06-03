function BenefitsCard({
  level = 0,
  name = '福德善信',
  spendingThreshold = '無',
  discount = '無',
  description = '無',
}) {
  return (
    <div className="relative">
      <div className="p-4 bg-white border rounded-lg border-primary-main flex flex-col gap-y-4 text-primary-main">
        <div className="flex items-center gap-x-4">
          <h2 className="desktop-jf-h2">等級 {level}</h2>
          <p className="desktop-jf-h4 rounded-full bg-primary-main text-white py-1 px-2">
            {name}
          </p>
        </div>

        <div>
          <h3 className="desktop-jf-h3">累積消費門檻：</h3>
          <p className="mobile-jf-h5">{spendingThreshold}</p>
        </div>

        <div>
          <h3 className="desktop-jf-h3">消費折扣：</h3>
          <p className="mobile-jf-h5">{discount}</p>
        </div>

        <div>
          <h3 className="desktop-jf-h3">名稱解析：</h3>
          <p className="mobile-jf-h5">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default BenefitsCard

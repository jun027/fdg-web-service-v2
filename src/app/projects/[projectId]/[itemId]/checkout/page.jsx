import { getCountryTown, getPayType } from '@/apis/services/game-services'
import { PROJECTS } from '@/constants/projects'
import { CheckoutView } from '@/sections/projects/project/checkout'

async function CheckoutPage({ params }) {
  const { projectId, itemId } = await params

  console.log('[CheckoutPage] / projectId:', projectId, '/ itemId:', itemId)

  let countryTownData = await getCountryTown()
  const countryOptions = countryTownData.country_list.map(country => ({
    label: country.country_name,
    value: country.country_code,
  }))
  const areaMap = countryTownData.town_list

  const payTypeData = await getPayType()

  const allChildProjects = PROJECTS.reduce((accumulator, project) => {
    project.fundraise_plan_list.forEach(plan => {
      accumulator.push({ ...plan })
    })
    return accumulator
  }, [])

  const itemData = allChildProjects.find(item => item.id === Number(itemId))

  const payTypeList = payTypeData.filter(payType =>
    payType.include_types.some(type => itemData.type.includes(type)),
  )

  return (
    <CheckoutView
      projectId={projectId}
      countryOptions={countryOptions}
      areaMap={areaMap}
      payType={payTypeList}
      itemData={itemData}
      id={itemId}
    />
  )
}

export default CheckoutPage

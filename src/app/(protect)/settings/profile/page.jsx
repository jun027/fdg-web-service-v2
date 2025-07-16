import { getCountryTown } from '@/apis/services/game-services'
import { ProfileView } from '@/sections/settings/profile'

export default async function ProfilePage() {
  let countryTownData = await getCountryTown()
  const countryOptions = Array.isArray(countryTownData?.country_list)
    ? countryTownData.country_list.map(country => ({
        label: country.country_name,
        value: country.country_code,
      }))
    : []

  const areaMap = countryTownData?.town_list || []

  return <ProfileView countryOptions={countryOptions} areaMap={areaMap} />
}

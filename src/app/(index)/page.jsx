import { getProjects } from '@/apis/services/game-services'
import {
  MONTHLY_DONATION_TYPE,
  PROJECTS,
  SINGLE_DONATION_TYPE,
} from '@/constants/projects'
import MainLayout from '@/layouts/main'
import { HomeView } from '@/sections/home'

export default async function Home() {
  const rawProjects = await getProjects()

  // 檢查是否成功拿到 array，否則設空陣列
  const projects = Array.isArray(rawProjects)
    ? rawProjects
    : rawProjects?.data && Array.isArray(rawProjects.data)
      ? rawProjects.data
      : []

  const allChildProjects = PROJECTS.reduce((accumulator, project) => {
    project.fundraise_plan_list.forEach(plan => {
      accumulator.push({ ...plan })
    })
    return accumulator
  }, [])

  const formattedProjects = projects.map(project => {
    const fundraisePlanList = Array.isArray(project.fundraise_plan_list)
      ? project.fundraise_plan_list.map(plan => {
          const planData = allChildProjects.find(p => p.id === plan.id)
          return { ...plan, ...planData }
        })
      : []

    return {
      ...project,
      fundraise_plan_list: fundraisePlanList,
      buttonTextType: fundraisePlanList.some(plan => plan.type === '2')
        ? MONTHLY_DONATION_TYPE
        : SINGLE_DONATION_TYPE,
    }
  })

  return (
    <MainLayout>
      <HomeView projects={formattedProjects} />
    </MainLayout>
  )
}

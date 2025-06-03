import { getProjects } from '@/apis/services/game-services'
import {
  MONTHLY_DONATION_TYPE,
  PROJECTS,
  SINGLE_DONATION_TYPE,
} from '@/constants/projects'
import { ProjectsView } from '@/sections/projects'

async function ProjectsPage() {
  const projects = await getProjects()

  const allChildProjects = PROJECTS.reduce((accumulator, project) => {
    project.fundraise_plan_list.forEach(plan => {
      accumulator.push({ ...plan })
    })
    return accumulator
  }, [])

  const formattedProjects = projects.map(project => {
    const fundraisePlanList = project.fundraise_plan_list.map(plan => {
      const planData = allChildProjects.find(p => p.id === plan.id)
      return { ...plan, ...planData }
    })

    return {
      ...project,
      fundraise_plan_list: fundraisePlanList,
      buttonTextType: fundraisePlanList.some(plan => plan.type === '2')
        ? MONTHLY_DONATION_TYPE
        : SINGLE_DONATION_TYPE,
    }
  })

  return <ProjectsView projects={formattedProjects} />
}

export default ProjectsPage

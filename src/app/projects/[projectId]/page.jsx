import { getProjects } from '@/apis/services/game-services'
import {
  MONTHLY_DONATION_TYPE,
  PROJECTS,
  SINGLE_DONATION_TYPE,
} from '@/constants/projects'
import { ProjectView } from '@/sections/projects/project'

async function ProjectPage({ params }) {
  const { projectId } = await params

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

    const projectData = PROJECTS.find(p => p.id === project.id)

    return {
      ...project,
      description: projectData.description,
      question_list: projectData.question_list,
      fundraise_plan_list: fundraisePlanList,
      note: projectData.note,
      buttonTextType: fundraisePlanList.some(plan => plan.type === '2')
        ? MONTHLY_DONATION_TYPE
        : SINGLE_DONATION_TYPE,
    }
  })

  const project = formattedProjects.find(
    project => `${project.id}` === projectId,
  )

  return <ProjectView project={project} />
}

export default ProjectPage

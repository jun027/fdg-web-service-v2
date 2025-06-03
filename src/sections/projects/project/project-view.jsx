import { format } from 'date-fns'
import Image from 'next/image'

import { QAList } from '@/components/common/qa-list'
import { SpecialParagraph } from '@/components/common/special-paragraph'
import { DonatePlanCard } from '@/components/ui/donate-plan-card'
import {
  MONTHLY_DONATION_TEXT,
  MONTHLY_DONATION_TYPE,
  SINGLE_DONATION_TEXT,
} from '@/constants/projects'
import { PATHS } from '@/routes/path'

import { SwiperContainer } from '..'

function ProjectView({ project }) {
  return (
    <main className="secondary-background">
      <div className="max-w-[1280px] mx-auto pt-24 pb-4 flex flex-col gap-y-4 xl:pt-32 xl:px-4 xl:gap-y-16 xl:pb-16">
        {/* 專案介紹 */}
        <div className="flex flex-col items-center gap-y-12 xl:flex-row xl:gap-y-0 xl:gap-x-12 xl:items-start">
          <div className="px-4 flex flex-col gap-y-8 xl:px-0">
            <div className="relative w-full aspect-[343/193] rounded-2xl overflow-hidden">
              <Image
                src={`/images/projects/thumbnail/${project.id}.webp`}
                alt={project.name}
                fill
                className="image"
              />
            </div>

            <h1 className="text-white mobile-fz-h1 relative sm:desktop-fz-h1">
              <span className="absolute top-[-10px] left-[-4px] z-0 inline-block w-[57px] aspect-[57/67] rotate-z-[350deg] sm:w-20 sm:top-[-16px] sm:left-[-24px]">
                <Image
                  src="/images/icons/rock-icon-01.png"
                  alt="logo"
                  fill
                  placeholder="empty"
                  className="image scale-75"
                />
              </span>
              <span className="relative inline-block ml-4 z-10">
                {project.name}
              </span>
            </h1>

            <p
              className="text-white desktop-jf-h3"
              dangerouslySetInnerHTML={{
                __html: project.description,
              }}
            />

            {project.note && (
              <div className="text-white desktop-jf-h3">
                注意事項：
                {project.note.map((note, index) => (
                  <SpecialParagraph
                    key={index}
                    prefix={`${index + 1}.`}
                    type="number"
                    text={note}
                  />
                ))}
                因為您的善意，世界可以多一份溫暖。
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-4 w-full flex flex-col gap-y-4 max-w-md mx-auto xl:min-w-[495px]">
            <h3 className="text-primary-main desktop-jf-h1 pb-3 border-b-[1px] border-primary-main flex flex-row items-center gap-x-2">
              <div className="relative w-5 aspect-[44/51]">
                <Image
                  src="/images/icons/sword-02.png"
                  alt="logo"
                  fill
                  placeholder="empty"
                  className="image scale-75"
                />
              </div>
              <span>捐款專案</span>
            </h3>

            <p className="text-primary-main desktop-jf-h3 flex items-center gap-x-6">
              <span>捐款進度</span>
              <span>
                NT ${project.total_amount} / ${project.limit_amount}
              </span>
            </p>

            <p className="text-primary-main desktop-jf-h3 flex items-center gap-x-6">
              <span>捐款日期</span>
              <span>
                {project.start_time &&
                  format(new Date(project.start_time), 'yyyy-MM-dd')}
                {` ~ `}
                {project.end_time &&
                  format(new Date(project.end_time), 'yyyy-MM-dd')}
              </span>
            </p>

            <p className="text-primary-main desktop-jf-h3 flex items-center gap-x-6">
              <span>捐款人數</span>
              <span>{project.sub_peoples} 人</span>
            </p>

            {project.fundraise_plan_list.map(plan => (
              <DonatePlanCard
                key={plan.id}
                name={
                  plan.type === MONTHLY_DONATION_TYPE
                    ? MONTHLY_DONATION_TEXT
                    : SINGLE_DONATION_TEXT
                }
                donateType={plan.type}
                price={plan.amount}
                description={plan.description}
                rewards={plan.reward_list}
                href={`${PATHS.Projects.child.Checkout.path.replace(':projectId', project.id).replace(':itemId', plan.id)}`}
              />
            ))}
          </div>
        </div>

        {/* 常見問題 */}
        <div className="px-4 py-16 flex flex-col gap-y-6 xl:px-0">
          <h3 className="text-white desktop-fz-h2 flex flex-row items-center gap-x-2 xl:desktop-fz-h1">
            <div className="relative w-6 aspect-[44/51] xl:w-14">
              <Image
                src="/images/icons/sword-03.png"
                alt="logo"
                fill
                placeholder="empty"
                className="image scale-75"
              />
            </div>
            <span>常見問題</span>
          </h3>
          <QAList list={project.question_list} />
        </div>

        {/* 其他專案 */}
        <div className="flex flex-col gap-y-6 xl:px-0">
          <h3 className="text-white desktop-fz-h2 px-4 flex flex-row items-center gap-x-2 xl:desktop-fz-h1">
            <div className="relative w-6 aspect-[44/51] xl:w-14">
              <Image
                src="/images/icons/sword-03.png"
                alt="logo"
                fill
                placeholder="empty"
                className="image scale-75"
              />
            </div>
            <span>其他專案</span>
          </h3>
          <SwiperContainer id="project-other-section" type="secondary" />
        </div>
      </div>
    </main>
  )
}

export default ProjectView

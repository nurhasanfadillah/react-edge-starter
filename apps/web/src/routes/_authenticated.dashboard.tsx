import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/components/site-header'
import { SectionCards } from '@/components/section-cards'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { DataTable } from '@/components/data-table'
import { PageContent } from '@/components/page-content'
import data from '../app/dashboard/data.json'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <PageContent>
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={data} />
      </PageContent>
    </>
  )
}

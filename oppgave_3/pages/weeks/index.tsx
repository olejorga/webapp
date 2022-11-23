import WeekList from '../../components/weekList'

export default function WeekDetailPage() {
  return <WeekList weeks={[]}></WeekList>
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
}

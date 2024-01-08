import { GetMangaUpdates } from "@/api/catalog"
import { MangaPreviewCard } from "@/components/mangaPreviewCard"
import { MangaPreviewResponse } from "@/dto/catalog"

export async function getServerSideProps() {
  const manga = await GetMangaUpdates()
  return {
    props: {manga}
  }
}

export default function Home(props: {manga: MangaPreviewResponse[]}) {
  return (
    <main className="flex flex-col items-center justify-between p-24">
        <h1>Last updates</h1>
        <div className="overflow-auto whitespace-nowrap w-full">
            {props.manga.map(m => <div className="inline-block">{MangaPreviewCard(m)}</div>)}
        </div>
    </main>
  )
}

import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { id } = context.query;
    const host =  process.env["SERVER_ADDR"]
    const res = await fetch(host + "/api/catalog/" + id);
    const mangaPreview = await res.json();
    return { props: { mangaPreview } };
}
export default function MangaPreview() {
    const router = useRouter()
    const mangaId = router.query.id
    if (!mangaId) {
        throw "error"
    }

}
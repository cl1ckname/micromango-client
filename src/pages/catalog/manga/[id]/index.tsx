import {GetServerSidePropsContext} from "next";
import { MangaResponse} from "@/dto/catalog";
import {HOST} from "@/app/globals";


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {id} = context.query;
    const res = await fetch(HOST + "/api/catalog/" + id);
    console.log(res.status)
    if (res.status == 404) {
        return {notFound: true}
    }
    if (!res.ok) {
        console.error(await res.json())
        return
    }
    const mangaPreview = await res.json() as MangaResponse;
    return {props: mangaPreview};
}

export default function MangaPreview(props: MangaResponse) {
    const chapters = props.content.chapters || []

    return <div className="my-4 max-w-screen-md border px-4 shadow-xl sm:mx-4 sm:rounded-xl sm:px-4 sm:py-4 md:mx-auto">
        <a href="/catalog">To catalog</a>
        <h1 className="text-3xl font-bold leading-9 sm:text-4xl sm:leading-tight">{props.title}</h1>
        <h3 className="">{props.createdAt}</h3>
        <img src={props.cover} alt={props.cover} width="480" height="480"/>
        <p className="mt-6 text-base md:max-w-xs">{props.description}</p>
        <h2>There is {chapters.length} chapters already!</h2>
        <a href={`/catalog/manga/${props.mangaId}/edit`}>Edit</a>


        <section className="py-1 bg-blueGray-50">
            <div className="w-full mb-12 xl:mb-0 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">Chapters</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <a href={`/catalog/manga/${props.mangaId}/read?chapter=1&page=1`}><button
                                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                >Read first
                                </button></a>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Chapter number
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Title
                                </th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Published
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {chapters.sort((a, b) => b.number - a.number).map(c =>
                                <tr>

                                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-1 text-left text-blueGray-700 ">
                                        {c.number}
                                    </th>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-1 ">
                                        <a href={`/catalog/manga/${props.mangaId}/read?chapter=${c.number}`}>
                                            {c.title}
                                        </a>
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xm whitespace-nowrap p-1 ">
                                        {c.createdAt}
                                    </td>
                                </tr>
                            )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </section>

    </div>
}
import {GetServerSidePropsContext} from "next";
import {ProfileEncoded} from "@/dto/user";
import {useRouter} from "next/router";
import {GetProfile} from "@/api/profile";
import ImageDefault from "@/components/imageDefault";
import { DEFAULT_PROFILE_PIC, HOST } from "@/app/globals";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const userId  = context.query.userId as string | undefined
    if (!userId) {
        return {notFound: true}
    }
    const res = await GetProfile(userId)
    if (!res) {
        return {notFound: true}
    }
    return {
        props: res
    }
}

function OptionalCover(props: { cover: string }) {
    if (!props.cover) return <></>
    return <div style={{background: `url("${props.cover}")`}} className={"bg-cover box-border pt-[30%]"}></div>;
}

export default function ProfilePage(props: ProfileEncoded) {
    const router = useRouter()

    return <div className="container mx-auto my-5 p-5">
        <OptionalCover cover={props.cover}/>
        <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-3/12 md:mx-2">
                <div className="bg-white p-3 hover:shadow">
                    <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                        <span className="text-green-500">
                            <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </span>
                        <span>{props.username}</span>
                    </div>
                    <ImageDefault src={HOST + props.picture} default={DEFAULT_PROFILE_PIC}/>
                </div>
                <div className="bg-white p-3 border-t-4 border-green-400">
                    <h1 className="text-gray-900 font-bold text-semibold leading-8 my-1">{props.bio.status}</h1>
                    <h3 className="text-gray-900 font-lg text-semibold leading-6">{props.bio.gender}</h3>
                    <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{props.bio.description}</p>
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto"><span
                                className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Member since</span>
                            <span className="ml-auto">{props.createdAt}</span>
                        </li>
                    </ul>
                </div>
                <div className="my-4"></div>
            </div>
            <div className="w-full md:w-9/12 mx-2 h-64">
                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">First Name</div>
                                <div className="px-4 py-2">Jane</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                <div className="px-4 py-2">Doe</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Gender</div>
                                <div className="px-4 py-2">{props.bio.gender}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                <div className="px-4 py-2">+11 998001001</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Current Address</div>
                                <div className="px-4 py-2">Beech Creek, PA, Pennsylvania</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Permanant Address</div>
                                <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Email.</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="mailto:jane@example.com">jane@example.com</a>
                                </div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                <div className="px-4 py-2">Feb 06, 1998</div>
                            </div>
                        </div>
                    </div>
                    <button
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                        onClick={_ => router.push(`/profile/${props.userId}/edit`)}
                    >Edit profile
                    </button>
                    <button
                        className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                        onClick={_ => router.push(`/profile/${props.userId}/list`)}
                    >Manga list
                    </button>
                </div>
                <div className="my-4"></div>
            </div>
        </div>
    </div>
}


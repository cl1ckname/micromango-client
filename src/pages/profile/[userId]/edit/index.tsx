import {GetServerSidePropsContext} from "next";
import {fetchFormData, fetchOr404} from "@/common/fetch";
import {Profile, ProfileEncoded} from "@/dto/user";
import {HOST} from "@/app/globals";
import {ChangeEvent, useState, MouseEvent} from "react";
import {useRouter} from "next/router";

const inputClasses = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const userId  = context.query.userId as string | undefined
    if (!userId) {
        return {notFound: true}
    }
    const res = await fetchOr404<Profile>(`${HOST}/api/profile/${userId}`)
    if (!res) {
        return {notFound: true}
    }

    let profile: ProfileEncoded | null
    try {
        profile = {...res, bio:  JSON.parse(res.bio)}
    }
    catch (e) {
        console.warn(e)
        profile = {...res, bio: {gender: "Other", status: "", description: ""}}
    }
    return {
        props: profile
    }
}
export default function EditProfile(props: ProfileEncoded) {
    const [username, setUsername] = useState(props.username)
    const [bio, setBio] = useState(props.bio)
    const [pic, setPic] = useState<File | null>(null)
    const router = useRouter()

    function back() {
        return router.push(`/profile/${props.userId}`)
    }
    function handleUsername(e: ChangeEvent<HTMLInputElement>) {
        setUsername(e.target.value)
    }
    function handleDescription(e: ChangeEvent<HTMLTextAreaElement>) {
        setBio({...bio, description: e.target.value})
    }

    function handleGender(e : ChangeEvent<HTMLSelectElement>) {
        setBio({...bio, gender: e.target.value})
    }
    function handleStatus(e: ChangeEvent<HTMLInputElement>) {
        setBio({...bio, status: e.target.value})
    }
    function handlePic(f: File) {
        setPic(f)
    }

    async function updateProfile(e: MouseEvent) {
        e.preventDefault()
        const fd = new FormData()
        fd.append("username", username)
        fd.append("bio", JSON.stringify(bio))
        if (pic)
            fd.set("picture", pic, pic.name)
        await fetchFormData(`${HOST}/api/profile/${props.userId}`, "PUT", fd)
        await back()
    }

    return <div id="updateProductModal" className="overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
        <div className="p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Profile
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form>
                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input type="text" name="name" id="name" value={username} className={inputClasses} placeholder="input your username" onChange={handleUsername}/>
                        </div>
                        <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                            <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={bio.gender} onChange={handleGender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <input type="text" name="name" id="name" value={bio.status} className={inputClasses} placeholder="how its going?" onChange={handleStatus}/>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                            <textarea
                                rows={5}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Write about you..."
                                value={bio.description}
                                onChange={handleDescription}/>
                        </div>

                    </div>
                   <UploadImageWithPreview pic={props.picture} setFile={handlePic} file={pic}/>
                    <div className="flex items-center space-x-4 mt-2.5">
                        <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={updateProfile}>
                            Update profile
                        </button>
                        <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={back}>
                            <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            Discard
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}

function UploadImageWithPreview(props: {
    pic: string
    setFile: (f: File) => any
    file: File | null
}) {
    function handlePic(e: ChangeEvent<HTMLInputElement>) {
        const f = e.target?.files
        if (!f) return
        props.setFile(f[0])
    }

    let src: string = `${HOST}/static/${props.pic}`
    if (props.file) {
        src = URL.createObjectURL(props.file)
    }

    return  <div className="flex justify-center mt-8">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
            <div className="m-4">
                <label className="inline-block mb-2 text-gray-500">Upload profile pic</label>
                {(props.pic) ? <img src={src} alt=""/> : <>
                    <div className="flex items-center justify-center w-full">
                        <label
                            className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                            <div className="flex flex-col items-center justify-center pt-7">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                    Attach a file</p>
                            </div>
                        </label>
                    </div>
                </>}
                <input type="file" className="" onChange={handlePic}/>
            </div>
        </div>
    </div>
}
import {ReactNode, useState} from "react";

export function Tabs(props: {
    description: ReactNode,
    chapter: ReactNode
}) {
    const [first, setFirst] = useState(true)
    const active = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-gray-500"
    const disabled = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
    return <>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="me-2" onClick={_ => setFirst(true)} key="description">
                <a href="#" aria-current="page" className={(first) ? active : disabled}>Description</a>
            </li>
            <li className="me-2" onClick={_ => setFirst(false)} key="chapters">
                <a href="#" className={(first) ? disabled : active}>Chapters</a>
            </li>
        </ul>
        {(first) ? props.description : props.chapter}
    </>
}
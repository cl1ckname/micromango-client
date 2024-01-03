import {useRouter} from "next/router";
import {ReactNode, useState} from "react";

const orders = ["rate", "title", "likes"]
export default function OrderSelect() {
    const router = useRouter()
    let {order} = router.query
    if (!order || order === "" || typeof order != "string") {
        order = "rate"
    }
    let {asc} = router.query
    const askB = asc === "true"

    function handleChange(v: string) {
        return () => {
            const {order, ...other } = router.query
            if (v === "rate") {
                return router.replace({
                    pathname: router.pathname,
                    query: other
                })
            }
            return router.replace({
                pathname: router.pathname,
                query: {order: v, ...other}
            })
        }
    }

    function handleAskChange() {
        const {asc, ...other} = router.query
        const ascB = asc !== "true"
        if (ascB) {
            return router.replace({
                pathname: router.pathname,
                query: {asc: "true", ...other}
            })
        }
        return router.replace({
            pathname: router.pathname,
            query: other
        })
    }

    return <Dropdown title={order}>
        <form className="flex flex-col">
            {orders.map(e => <label key={e}>
                <input type="radio" value={e} checked={order === e} onChange={handleChange(e)} className="mr-2"/>
                {e}
            </label>)}
        </form>
        <hr/>
        <form className="flex flex-col">
            <label>
                <input type="radio" value="asc" checked={askB} onChange={handleAskChange} className="mr-2"/>
                Asc
            </label>
            <label>
                <input type="radio" value="desk" checked={!askB} onChange={handleAskChange} className="mr-2"/>
                Desc
            </label>
        </form>
    </Dropdown>
}

function Dropdown(props: {
    title: string
    children: ReactNode
}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-[10em] p-2.5" onClick={handleOpen}>
            <button>{props.title}</button>
            {open ? <div className="absolute z-10 bg-white min-w-[10em] bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg">
                {props.children}
            </div> : null}
        </div>
    );
}
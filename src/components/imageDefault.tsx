
export default function ImageDefault(props: {src?: string, default: string}) {
    const src = (props.src) ? props.src : props.default

    return <img src={src} onError={e => {
        e.preventDefault()
        e.currentTarget.src = props.default
    }} alt={props.default}/>
}
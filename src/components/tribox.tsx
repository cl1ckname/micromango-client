// Thx https://dirask.com/posts/React-three-state-checkbox-with-indeterminate-property-1yNvvD

import {RefObject, useEffect, useRef} from "react";

const updateInput = (ref: RefObject<HTMLInputElement>, checked: null | boolean) => {
    const input = ref.current;
    if (input) {
        input.checked = checked || false;
        input.indeterminate = checked == null;
    }
};

export default function Tribox(props: {
    onChange?: (v: boolean | null) => any
    checked?: boolean | null

}) {
    const cRef = useRef<HTMLInputElement>(null);
    const checkedRef = useRef<boolean | null>(props.checked || null)
    const handleClick = () => {
        switch (checkedRef.current) {
            case true:
                checkedRef.current = false;
                break;
            case false:
                checkedRef.current = null;
                break;
            default: // null
                checkedRef.current = true;
                break;
        }
        updateInput(cRef, checkedRef.current);
        if (props.onChange) {
            props.onChange(checkedRef.current);
        }
    };
    useEffect(() => {
        if (cRef.current)
            cRef.current.indeterminate = true;
    }, [cRef]);

    return <input
        type="checkbox"
        onClick={handleClick}
        ref={cRef}
    />
}
import {useState} from "react";

export default function StarRating(props: {
    value: number
    onChange: (rate: number) => any
}) {
    const [hover, setHover] = useState(0);

    function handleClick(value: number) {
        return function () {
            props.onChange(value)
        }
    }

    return (
        <div className="star-rating">
            {[...Array(10)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className="star text-2xl ml-2"
                        onClick={handleClick(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(props.value)}
                    >
                        <span
                            style={{color: index <= (hover || props.value) ? "gold" : "black"}}>&#9733;</span>
                    </button>
                );
            })}
            ({props.value})
        </div>
    );
};

interface ReadingNavbarProps {
    page: number
    chapter: number
    mangaId: string
    onNextPage: () => any
    onPreviousPage: () => any
}
export default function ReadingLayout(props: ReadingNavbarProps) {
    return <nav
        className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4">
        <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-target="#navbarSupportedContent5"
            aria-controls="navbarSupportedContent5"
            aria-expanded="false"
            aria-label="Toggle navigation">
        </button>


        <div className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent5">

            <ul className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row">

                <li className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1">
                    <a className="active disabled:text-black/30 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                       aria-current="page"
                       href={`/catalog/manga/${props.mangaId}`}
                    >
                        Back
                    </a>
                </li>

                <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                    <a
                        className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        href="#"
                        onClick={props.onPreviousPage}
                    >
                        {"<"}
                    </a>
                </li>

                <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                    <a
                        className="flex items-center text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        href="#"
                        type="button"
                        id="dropdownMenuButton2"
                        aria-expanded="false">
                        chapter - {props.chapter}, page - {props.page}
                        <span className="ml-1 w-2">
            </span>
                    </a>
                    <ul
                        className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenuButton2">
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                                href="#"
                                
                            >Action</a
                            >
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                                href="#">
                                Another action
                            </a
                            >
                        </li>
                        <li>
                            <a
                                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                                href="#">
                                Something else here
                            </a>
                        </li>
                    </ul>
                </li>

                <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1">
                    <a className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        onClick={props.onNextPage}
                    >
                        {">"}
                    </a>
                </li>
            </ul>
        </div>
    </nav>
}
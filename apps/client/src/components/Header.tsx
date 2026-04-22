import titleImage from '/pics/title.jpeg';

export default function MenuHeader() {
    return (
        <header
            className="
        shrink-0
        rounded-[5px]
        border-[5px] border-[#e4c9a6]
        shadow-[0_5px_15px_rgba(0,0,0,0.1)]
        overflow-hidden">
            <img
                src={titleImage}
                alt="La Balsa"
                className="w-full object-cover sm:aspect-[8/1] aspect-[5/1]"
                fetchPriority="high"
            />
        </header>
    );
}
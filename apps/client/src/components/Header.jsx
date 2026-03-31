import titleImage from '/pics/title.jpeg';

export default function MenuHeader() {
    return (
        <header
            className="

        rounded-[10px]
        border-[10px] border-[#e4c9a6]
        shadow-[0_5px_15px_rgba(0,0,0,0.1)]
        bg-cover bg-center bg-no-repeat
        overflow-hidden">
            <img
                src={titleImage}
                alt="La Balsa"
                className="
          w-full max-h-[100px] object-cover"/>
        </header>
    );
}
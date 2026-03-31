import titleImage from '/pics/title.jpeg';

export default function MenuHeader() {
    return (
        <header
            className="

        rounded-[10px]
        border-[10px] border-[#e4c9a6]
        shadow-[0_5px_15px_rgba(0,0,0,0.1)]
        bg-cover bg-center bg-no-repeat
        px-0 py-5
        overflow-hidden
        max-[480px]:h-[120px]
        max-[480px]:border-[5px]
        max-[480px]:p-[5px]
      "
            style={{
                backgroundImage: `url(${titleImage})`,
            }}
        >
            <img
                src={titleImage}
                alt="La Balsa"
                className="
          w-full h-auto max-h-[150px] object-cover
          max-[480px]:max-h-[100px]
        "
            />
        </header>
    );
}
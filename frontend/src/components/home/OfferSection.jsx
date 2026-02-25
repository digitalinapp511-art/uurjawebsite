import { Link } from "react-router-dom";
const offerData = {
    title: "New Year Flash Sale!",
    subtitle: "Celebrate Ethnic Elegance",
    description:
        "Buy 1 Get 1 Free. Limited time New Year offer!",
    ctaText: "Shop Now",
    leftImage: "/offerBanner2.png",
    rightImage: "/offerBanner1.png",
};

const OfferSection = () => {
    return (
        <section className="py-16 md:py-8 bg-gradient-to-r from-[#7a1553] via-[#8b1c62] to-[#a8326d]">
            <div className="max-w-7xl mx-auto px-6 md:px-14">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl px-6 py-8 ">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-white">

                        {/* Left Product */}
                        <div className="hidden md:flex justify-center">
                            <img
                                src={offerData.leftImage}
                                alt="Offer Product Left"
                                className="max-h-80 object-contain opacity-90 drop-shadow-xl"
                            />
                        </div>

                        {/* Offer Content */}
                        <div className="text-center px-2">
                            <span className="uppercase text-xs tracking-widest text-yellow-200">
                                Limited Time Offer
                            </span>

                            <div className="w-24 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto my-4 rounded-full" />
                            <h2 className="font-heading text-4xl md:text-5xl tracking-wide mb-4">
                                {offerData.title}
                            </h2>
                            <div className="w-24 h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto my-4 rounded-full" />

                            <p className="italic text-lg text-white/90 mb-2">
                                {offerData.subtitle}
                            </p>

                            <p className="mb-6 text-white/90 leading-relaxed">
                                <span className="font-semibold text-yellow-200">
                                    Buy 1 Get 1 Free.
                                </span>{" "}
                                Limited time New Year offer!
                            </p>

                            <div className="relative inline-flex flex-col items-center">
                                <Link to="/shop">
                                    <button
                                        className=" relative z-10 bg-white text-[#8b1c62] px-5 py-3 rounded-full font-semibold tracking-wide
                                    shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:shadow-2xl  transition duration-300 animate-bounce-slow hover:animate-none">
                                        Explore Collection
                                    </button>
                                </Link>

                                <span
                                    className="absolute-bottom-2 w-24 h-3 bg-black/50 blur-md rounded-full animate-shadow-bounce" />
                            </div>

                        </div>

                        {/* Right Product */}
                        <div className="hidden md:flex justify-center">
                            <img
                                src={offerData.rightImage}
                                alt="Offer Product Right"
                                className="max-h-80 object-contain opacity-90 drop-shadow-xl"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferSection;

import { Link } from "react-router-dom";
import sliderImage from "../../assets/logo/sliderImage.png";

const HeroSection = () => {
    return (
        <section className="bg-[#fff7f2] py-12 px-6">

            <div className="max-w-7xl mx-auto flex justify-center items-center">

                <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                    <img
                        src={sliderImage}
                        alt="Hero Slider"
                        className="w-full h-auto object-cover"
                    />
                </div>

            </div>
        </section>

    );
};

export default HeroSection;

// import { Link } from "react-router-dom";

// const HeroSection = () => {
//     return (
//         <section className="bg-[#fff7f2] py-12 px-6">

//             <div className="max-w-7xl mx-auto flex justify-center items-center">

//                 <div className="w-full overflow-hidden rounded-2xl shadow-lg">
//                     <img src="https://res.cloudinary.com/dqkssrvir/image/upload/v1772029048/sliderImage_x7mdix.png" alt="Hero Slider" />
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default HeroSection;

// HeroSection.jsx
import { useGetBannersQuery } from "../../redux/backendApi";

const HeroSection = () => {
    const { data: bannersResponse } = useGetBannersQuery();
    const banners = bannersResponse?.data || [];

    const heroBanner = banners[0]?.image;
    const flashBanner = banners[1]?.image;

    return (
        <section className="bg-[#fff7f2] py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <img
                    src={heroBanner}
                    alt="Hero Banner"
                    className="w-full rounded-2xl shadow-lg"
                />
            </div>
        </section>
    );
};

export default HeroSection;
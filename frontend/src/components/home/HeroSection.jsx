// import { Link } from "react-router-dom";
// import CloudinaryImage from "../CloudinaryImage";

// const HeroSection = () => {
//     return (
//         <section className="bg-[#fff7f2] py-12 px-6">

//             <div className="max-w-7xl mx-auto flex justify-center items-center">

//                 <div className="w-full overflow-hidden rounded-2xl shadow-lg">
//                     <CloudinaryImage
//                         src="https://res.cloudinary.com/dqkssrvir/image/upload/v1772029048/sliderImage_x7mdix.png"
//                         alt="Hero Slider"
//                         width={1200}
//                         height={600}
//                         className="w-full h-auto object-cover"
//                     />
//                 </div>

//             </div>
//         </section>

//     );
// };

// export default HeroSection;


import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="bg-[#fff7f2] py-12 px-6">

            <div className="max-w-7xl mx-auto flex justify-center items-center">

                <div className="w-full overflow-hidden rounded-2xl shadow-lg">
                    <img src="https://res.cloudinary.com/dqkssrvir/image/upload/v1772029048/sliderImage_x7mdix.png" alt="Hero Slider" />
                </div>

            </div>
        </section>
    );
};

export default HeroSection;
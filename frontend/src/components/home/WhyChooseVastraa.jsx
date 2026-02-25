import { GiClothes } from "react-icons/gi";
import { FaHandSparkles, FaUndo, FaLock } from "react-icons/fa";
const iconMap = {
    fabric: <GiClothes />,
    craft: <FaHandSparkles />,
    return: <FaUndo />,
    secure: <FaLock />,
};

const whyChooseData = [
    {
        title: "Premium Fabric",
        description: "Carefully sourced high-quality fabrics for lasting comfort and elegance.",
        icon: "fabric",
    },
    {
        title: "Handcrafted Designs",
        description: "Authentic ethnic designs crafted by skilled artisans.",
        icon: "craft",
    },
    {
        title: "Easy Returns",
        description: "Hassle-free returns and exchanges for a worry-free experience.",
        icon: "return",
    },
    {
        title: "Secure Payments",
        description: "Safe and trusted payment gateways for complete peace of mind.",
        icon: "secure",
    },
];


const WhyChooseVastraa = () => {
    return (
        <section className="py-14 bg-[#383737]">
            <div className="max-w-7xl mx-auto px-6 md:px-14">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl text-[#ff9d00] mb-3">
                        Why Choose UUrja
                    </h2>
                    <p className="text-gray-100 max-w-2xl mx-auto">
                        We bring you timeless ethnic fashion with quality, comfort, and trust at the heart of everything we do.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {whyChooseData.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl 
                        hover:-translate-y-1 transition duration-300">
                            <div className=" flex justify-center text-4xl text-[#ff9d00] mb-2 ">
                                {iconMap[item.icon]}
                            </div>

                            <h3 className="font-heading text-lg text-[#ff9d00] mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyChooseVastraa;

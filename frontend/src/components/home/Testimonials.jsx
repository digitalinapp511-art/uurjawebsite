import { FaStar } from "react-icons/fa";
const testimonialsData = [
    {
        name: "Ananya Sharma",
        location: "Jaipur",
        rating: 5,
        review:"Absolutely loved the stone quality and elegant design. UURJA truly represents ethnic luxury.",
    },
    {
        name: "Priya Mehta",
        location: "Mumbai",
        rating: 4,
        review:"Beautiful collection and timely delivery. The craftsmanship is commendable. Will shop again!",
    },
    {
        name: "Ritika Verma",
        location: "Delhi",
        rating: 5,
        review:"Premium feel, comfortable fit, and excellent finishing. Highly recommended for ethnic lovers!",
    },
];

const Testimonials = () => {
    return (
        <section className="py-10 md:py-12 bg-[#383737] border-t border-[#8b1c62]/10">
            <div className="max-w-7xl mx-auto px-6 md:px-14">

                {/* Section Header */}
                <div className="text-center mb-14">
                    <h2 className="font-heading text-3xl md:text-4xl text-gray-100 mb-2">
                        What Our Customers Say
                    </h2>
                    <div className="w-20 h-1 bg-[#fff] mx-auto rounded-full mb-4"></div>

                    <p className="text-gray-200 max-w-2xl mx-auto">
                        Real stories from our clients who chose UURJA .
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-2 sm:gris-col-3 md:grid-cols-3 gap-8">
                    {testimonialsData.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 
                        transition duration-300 relative">
                            {/* Quote mark */}
                            <span className="absolute top-4 right-4 text-5xl text-[#8b1c62]/10">
                                “
                            </span>

                            {/* Stars */}
                            <div className="flex justify-center mb-4">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <FaStar key={i} className="text-yellow-400 mx-0.5" />
                                ))}
                            </div>

                            {/* Review */}
                            <p className="text-gray-700 text-sm text-center mb-6 leading-relaxed">
                                {item.review}
                            </p>

                            {/* Customer Info */}
                            <div className="text-center">
                                <h4 className="font-semibold text-[#383737]">
                                    {item.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                    {item.location}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;

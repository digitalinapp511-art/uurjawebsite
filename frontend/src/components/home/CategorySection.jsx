import { Link } from "react-router-dom";

const categories = [
  {
    name: "Bracelet",
    image: "/bracelete.jpeg",
  },
  {
    name: "Ring",
    image: "/rings.jpg",
  },
  {
    name: "Selenite Plate",
    image: "/SelenitePlate.jpg",
  },
  // {
  //   name: "Anarkali Sets",
  //   image: "/anarkali.jpg",
  // },
  // {
  //   name: "Suits",
  //   image: "/suit.png",
  // },
  // {
  //   name: "Dupatta / Shawls",
  //   image: "/dupatta.jpg",
  // },
];

const CategorySection = () => {
  return (
    <section className="py-10 md:py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading text-center mb-10 text-gray-900">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            >
              <div className="relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-auto object-fit group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <h3 className="text-white text-4xl font-heading font-semibold">
                    {cat.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

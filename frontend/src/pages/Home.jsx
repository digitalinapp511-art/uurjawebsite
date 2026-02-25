// import Navbar from "../components/Navbar";
import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import OfferSection from "../components/home/OfferSection";
import  WhyChooseVastraa from "../components/home/WhyChooseVastraa";
import Testimonials from "../components/home/Testimonials";
import NewsletterSection from "../components/home/Newsletter";

const Home = () => {
  return (
    <>
      {/* <Navbar /> */}
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      {/* <OfferSection /> */}
      <WhyChooseVastraa/>
      <Testimonials/>
      <NewsletterSection/>

    </>
  );
};

export default Home;

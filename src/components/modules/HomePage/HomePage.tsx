import BestSellingTShirts from "./Features/BestSellingTShirts";
import ShopByCollection from "./Features/Collection";
import CustomerReviews from "./Features/CustomerReviews";
import HeroSection from "./Features/HeroSection";
import NewsletterCTA from "./Features/NewsletterCTA";
import TrendingProducts from "./Features/TrendingProducts";
import WhyChooseUs from "./Features/WhyChooseUs";


const HomePage = () => {
    return (
        <div>
           <HeroSection/>
           <TrendingProducts/>
           <ShopByCollection/>
           <BestSellingTShirts/>
           <WhyChooseUs/>
           <CustomerReviews/>
           <NewsletterCTA/>
        </div>
    );
};

export default HomePage;
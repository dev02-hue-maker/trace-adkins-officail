import { mockProducts } from "@/types/mockProducts";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import HomeTourSection from "./components/HomeTourSection";
 
 
export default function Home() {
  return (
     <div>
      <Hero />
     <ProductGrid products={mockProducts} />
      <HomeTourSection />
     </div>
  );
}

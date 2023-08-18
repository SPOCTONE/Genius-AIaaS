import { LandingNavbar } from "@/components/landing-navbar";
import { LandingHero } from "@/components/ui/landing-hero";


const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <LandingHero />
      
    </div>
   );
}
 
export default LandingPage;
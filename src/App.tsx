import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Trust from "./components/Trust";
import Services from "./components/Services";
import PricingTable from "./components/PricingTable";
import Packages from "./components/Packages";
import HowItWorks from "./components/HowItWorks";
import BookingForm from "./components/BookingForm";
import ParentNotes from "./components/ParentNotes";
import SafetyNotes from "./components/SafetyNotes";
import FAQ from "./components/FAQ";
import Partners from "./components/Partners";
import Policies from "./components/Policies";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Services />
        <PricingTable />
        <Packages />
        <HowItWorks />
        <BookingForm />
        <ParentNotes />
        <SafetyNotes />
        <Policies />
        <FAQ />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}

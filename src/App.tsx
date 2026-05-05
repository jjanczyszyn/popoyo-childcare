import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import BookingForm from "./components/BookingForm";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <BookingForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

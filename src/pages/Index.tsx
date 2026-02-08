import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import { Truck, MapPin, Globe } from "lucide-react";

import camionLocal from "@/assets/camion-local.jpg";
import camionProvincial from "@/assets/camion-provincial.jpg";
import camionNacional from "@/assets/camion-nacional.jpg";

const services = [
  {
    title: "Transporte Local",
    description: "Entregas rápidas en Calatayud y alrededores. Servicio ágil y económico para envíos urbanos.",
    image: camionLocal,
    icon: <Truck className="h-6 w-6" />,
    features: [
      "Entrega en el día",
      "Recogida a domicilio",
      "Paquetería ligera",
      "Precios competitivos"
    ]
  },
  {
    title: "Transporte Provincial",
    description: "Cobertura completa en toda la provincia de Zaragoza. Conexión con las principales ciudades aragonesas.",
    image: camionProvincial,
    icon: <MapPin className="h-6 w-6" />,
    features: [
      "Toda la provincia",
      "Rutas regulares",
      "Carga completa",
      "Seguimiento en tiempo real"
    ]
  },
  {
    title: "Transporte Nacional",
    description: "Llegamos a cualquier punto de España. Logística integral para empresas y particulares.",
    image: camionNacional,
    icon: <Globe className="h-6 w-6" />,
    features: [
      "Península completa",
      "Grupaje y carga completa",
      "Almacenaje",
      "Gestión documental"
    ]
  }
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        
        {/* About Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="section-title">
                  Su socio de confianza en <span className="text-accent">logística</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  <strong className="text-foreground">Transportes Gargallo Vicen, S.L.</strong> lleva 
                  más de 25 años conectando empresas y particulares con soluciones de transporte 
                  eficientes y seguras.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Desde nuestra sede en Calatayud, ofrecemos servicios de transporte local, 
                  provincial y nacional, adaptándonos a las necesidades específicas de cada cliente. 
                  Nuestra flota moderna y nuestro equipo profesional garantizan que su mercancía 
                  llegue siempre a tiempo y en perfectas condiciones.
                </p>
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Flota propia
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Seguimiento GPS
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Seguro incluido
                  </li>
                  <li className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Atención 24h
                  </li>
                </ul>
              </div>
              <div className="relative">
                <img
                  src={camionProvincial}
                  alt="Flota Transportes Gargallo Vicen"
                  className="rounded-xl shadow-card w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
                  <div className="text-4xl font-bold">+25</div>
                  <div className="text-sm">Años de experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { ArrowRight, Truck, Users } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-corporate-blue-dark/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium">
            <Truck className="h-4 w-4" />
            <span>Desde 1998 conectando Aragón con toda España</span>
          </div>

          {/* Title */}
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-tight">
            Transportes
            <span className="block text-accent">Gargallo Vicen</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-primary-foreground/90 font-light max-w-2xl mx-auto">
            <strong className="font-semibold">Local · Provincial · Nacional</strong>
            <br />
            desde Calatayud
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/reservas" className="btn-accent group">
              <Truck className="h-5 w-5" />
              RESERVAR AHORA
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/clientes" className="btn-outline-light group">
              <Users className="h-5 w-5" />
              ZONA CLIENTES
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">+25</div>
              <div className="text-sm text-primary-foreground/70">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">+50</div>
              <div className="text-sm text-primary-foreground/70">Vehículos en flota</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">+1000</div>
              <div className="text-sm text-primary-foreground/70">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent">24/7</div>
              <div className="text-sm text-primary-foreground/70">Seguimiento GPS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

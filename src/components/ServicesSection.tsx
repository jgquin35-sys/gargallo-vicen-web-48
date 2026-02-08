import { Link } from "react-router-dom";
import { ArrowRight, Truck, MapPin, Clock } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  features: string[];
}

const ServiceCard = ({ title, description, image, icon, features }: ServiceCardProps) => {
  return (
    <div className="service-card group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="service-card-image transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 p-3 bg-accent rounded-full text-accent-foreground">
          {icon}
        </div>
      </div>
      <div className="service-card-content">
        <h3 className="font-montserrat font-bold text-xl mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
        <Link
          to="/reservas"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group/link"
        >
          Solicitar Presupuesto
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

interface ServicesProps {
  services: Array<{
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    features: string[];
  }>;
}

const ServicesSection = ({ services }: ServicesProps) => {
  return (
    <section id="servicios" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Soluciones de transporte adaptadas a cada necesidad. 
            Desde envíos locales hasta rutas nacionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/reservas" className="btn-accent">
            <Truck className="h-5 w-5" />
            Solicitar Transporte
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

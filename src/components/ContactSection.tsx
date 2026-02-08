import { Phone, Mail, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Contacto</h2>
          <p className="section-subtitle">
            ¿Necesitas más información? Estamos aquí para ayudarte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <a href="tel:976555123" className="contact-item hover:bg-accent/10 cursor-pointer">
              <div className="p-3 bg-accent rounded-full text-accent-foreground">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Teléfono</h4>
                <p className="text-primary font-bold text-lg">976 555 123</p>
                <p className="text-sm text-muted-foreground">Llámanos para presupuesto inmediato</p>
              </div>
            </a>

            <a href="mailto:info@transportesgvc.es" className="contact-item hover:bg-accent/10 cursor-pointer">
              <div className="p-3 bg-accent rounded-full text-accent-foreground">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Email</h4>
                <p className="text-primary font-bold">info@transportesgvc.es</p>
                <p className="text-sm text-muted-foreground">Respondemos en menos de 24h</p>
              </div>
            </a>

            <div className="contact-item">
              <div className="p-3 bg-accent rounded-full text-accent-foreground">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Dirección</h4>
                <p className="text-foreground">C/ Logística 15</p>
                <p className="text-muted-foreground">50300 Calatayud (Zaragoza)</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="p-3 bg-accent rounded-full text-accent-foreground">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Horario</h4>
                <p className="text-foreground">Lunes - Viernes: 7:00 - 20:00</p>
                <p className="text-muted-foreground">Sábados: 8:00 - 14:00</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-card h-[400px] lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24474.32659842421!2d-1.6530!3d41.3533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5913a14f5c7c47%3A0x5f3c0d2b3c4d5e6f!2sCalatayud%2C%20Zaragoza!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Transportes Gargallo Vicen"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

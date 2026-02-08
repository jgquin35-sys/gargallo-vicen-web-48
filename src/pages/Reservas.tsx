import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Truck, MapPin, Calendar, User, Phone, Mail, 
  Package, FileText, CheckCircle, ArrowLeft 
} from "lucide-react";
import { toast } from "sonner";

interface ReservaForm {
  nombre: string;
  telefono: string;
  email: string;
  origen: string;
  destino: string;
  fechaHora: string;
  tipoTransporte: string;
  pesoVolumen: string;
  observaciones: string;
}

const Reservas = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservaId, setReservaId] = useState("");
  const [formData, setFormData] = useState<ReservaForm>({
    nombre: "",
    telefono: "",
    email: "",
    origen: "",
    destino: "",
    fechaHora: "",
    tipoTransporte: "",
    pesoVolumen: "",
    observaciones: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateReservaId = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `GV-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate reservation ID
    const newReservaId = generateReservaId();
    setReservaId(newReservaId);

    // Save to localStorage
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const newReserva = {
      id: newReservaId,
      ...formData,
      estado: "pendiente",
      fechaCreacion: new Date().toISOString()
    };
    reservas.push(newReserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    toast.success("¡Reserva realizada con éxito!");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                ¡Reserva Confirmada!
              </h1>
              <p className="text-muted-foreground mb-6">
                Hemos recibido tu solicitud de transporte. Nos pondremos en contacto contigo 
                en las próximas 24 horas para confirmar los detalles.
              </p>
              <div className="bg-secondary rounded-xl p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Tu número de seguimiento:</p>
                <p className="text-2xl font-bold text-primary">{reservaId}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/seguimiento")}
                  className="btn-accent"
                >
                  <MapPin className="h-5 w-5" />
                  Seguir Envío
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn-outline-light text-foreground border-border hover:bg-secondary"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Volver al Inicio
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="section-title">Reservar Transporte</h1>
              <p className="section-subtitle">
                Complete el formulario y le contactaremos para confirmar su reserva.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-card p-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="form-label">
                    <User className="inline h-4 w-4 mr-2" />
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="form-input"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="form-label">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    required
                    className="form-input"
                    placeholder="600 123 456"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="form-label">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                {/* Origen */}
                <div>
                  <label htmlFor="origen" className="form-label">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Origen (Recogida) *
                  </label>
                  <input
                    type="text"
                    id="origen"
                    name="origen"
                    required
                    className="form-input"
                    placeholder="Dirección de recogida"
                    value={formData.origen}
                    onChange={handleChange}
                  />
                </div>

                {/* Destino */}
                <div>
                  <label htmlFor="destino" className="form-label">
                    <Truck className="inline h-4 w-4 mr-2" />
                    Destino (Entrega) *
                  </label>
                  <input
                    type="text"
                    id="destino"
                    name="destino"
                    required
                    className="form-input"
                    placeholder="Dirección de entrega"
                    value={formData.destino}
                    onChange={handleChange}
                  />
                </div>

                {/* Fecha/Hora */}
                <div>
                  <label htmlFor="fechaHora" className="form-label">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Fecha y Hora *
                  </label>
                  <input
                    type="datetime-local"
                    id="fechaHora"
                    name="fechaHora"
                    required
                    className="form-input"
                    value={formData.fechaHora}
                    onChange={handleChange}
                  />
                </div>

                {/* Tipo Transporte */}
                <div>
                  <label htmlFor="tipoTransporte" className="form-label">
                    <Package className="inline h-4 w-4 mr-2" />
                    Tipo de Transporte *
                  </label>
                  <select
                    id="tipoTransporte"
                    name="tipoTransporte"
                    required
                    className="form-input"
                    value={formData.tipoTransporte}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona tipo</option>
                    <option value="local">Local (Calatayud)</option>
                    <option value="provincial">Provincial (Zaragoza)</option>
                    <option value="nacional">Nacional (España)</option>
                  </select>
                </div>

                {/* Peso/Volumen */}
                <div>
                  <label htmlFor="pesoVolumen" className="form-label">
                    <Package className="inline h-4 w-4 mr-2" />
                    Peso / Volumen aproximado
                  </label>
                  <input
                    type="text"
                    id="pesoVolumen"
                    name="pesoVolumen"
                    className="form-input"
                    placeholder="Ej: 500 kg, 2 palets"
                    value={formData.pesoVolumen}
                    onChange={handleChange}
                  />
                </div>

                {/* Observaciones */}
                <div className="md:col-span-2">
                  <label htmlFor="observaciones" className="form-label">
                    <FileText className="inline h-4 w-4 mr-2" />
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Detalles adicionales sobre la mercancía, horarios preferidos, etc."
                    value={formData.observaciones}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 flex justify-center">
                <button type="submit" className="btn-accent w-full sm:w-auto">
                  <Truck className="h-5 w-5" />
                  REALIZAR RESERVA
                </button>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                * Campos obligatorios. Le contactaremos para confirmar disponibilidad y precio.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservas;

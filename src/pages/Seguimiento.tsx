import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Search, MapPin, Truck, CheckCircle, Clock, Package,
  MessageCircle, Send, User
} from "lucide-react";

interface TrackingStatus {
  id: string;
  estado: "origen" | "en-camino" | "entregado";
  origen: string;
  destino: string;
  fechaEstimada: string;
  conductor: string;
  historial: Array<{
    estado: string;
    fecha: string;
    ubicacion: string;
  }>;
}

interface ChatMessage {
  id: string;
  sender: "user" | "conductor";
  message: string;
  time: string;
}

const mockTrackingData: Record<string, TrackingStatus> = {
  "GV-2026-001": {
    id: "GV-2026-001",
    estado: "en-camino",
    origen: "Calatayud, Zaragoza",
    destino: "Madrid, Centro",
    fechaEstimada: "08/02/2026 - 16:00",
    conductor: "Antonio García",
    historial: [
      { estado: "Recogido en origen", fecha: "08/02/2026 08:30", ubicacion: "Calatayud" },
      { estado: "En tránsito", fecha: "08/02/2026 10:15", ubicacion: "Medinaceli" },
      { estado: "En camino", fecha: "08/02/2026 12:00", ubicacion: "Guadalajara" }
    ]
  },
  "GV-2026-002": {
    id: "GV-2026-002",
    estado: "entregado",
    origen: "Zaragoza",
    destino: "Calatayud",
    fechaEstimada: "07/02/2026 - 14:00",
    conductor: "Miguel López",
    historial: [
      { estado: "Recogido", fecha: "07/02/2026 09:00", ubicacion: "Zaragoza" },
      { estado: "En tránsito", fecha: "07/02/2026 10:30", ubicacion: "La Almunia" },
      { estado: "Entregado", fecha: "07/02/2026 12:45", ubicacion: "Calatayud" }
    ]
  }
};

const Seguimiento = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<TrackingStatus | null>(null);
  const [error, setError] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load chat from localStorage
    if (trackingResult) {
      const savedChat = localStorage.getItem(`chat_${trackingResult.id}`);
      if (savedChat) {
        setChatMessages(JSON.parse(savedChat));
      } else {
        setChatMessages([
          {
            id: "1",
            sender: "conductor",
            message: `Hola, soy ${trackingResult.conductor}. Estoy transportando su envío. ¿Necesita alguna información?`,
            time: "Hace 1h"
          }
        ]);
      }
    }
  }, [trackingResult]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Check mock data
    const upperTrackingNumber = trackingNumber.toUpperCase();
    if (mockTrackingData[upperTrackingNumber]) {
      setTrackingResult(mockTrackingData[upperTrackingNumber]);
      return;
    }

    // Check localStorage for reservations
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const reserva = reservas.find((r: any) => r.id.toUpperCase() === upperTrackingNumber);
    
    if (reserva) {
      setTrackingResult({
        id: reserva.id,
        estado: "origen",
        origen: reserva.origen,
        destino: reserva.destino,
        fechaEstimada: new Date(reserva.fechaHora).toLocaleDateString("es-ES") + " - Pendiente",
        conductor: "Por asignar",
        historial: [
          { 
            estado: "Reserva recibida", 
            fecha: new Date(reserva.fechaCreacion).toLocaleString("es-ES"), 
            ubicacion: "Sistema" 
          }
        ]
      });
      return;
    }

    setError("No se encontró ningún envío con ese número de seguimiento.");
    setTrackingResult(null);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !trackingResult) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      message: newMessage,
      time: "Ahora"
    };

    const updatedMessages = [...chatMessages, userMessage];
    setChatMessages(updatedMessages);
    localStorage.setItem(`chat_${trackingResult.id}`, JSON.stringify(updatedMessages));
    setNewMessage("");

    // Simulate conductor response
    setTimeout(() => {
      const conductorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "conductor",
        message: "Recibido. Le mantendré informado del estado del envío. ¡Gracias por su paciencia!",
        time: "Ahora"
      };
      const finalMessages = [...updatedMessages, conductorResponse];
      setChatMessages(finalMessages);
      localStorage.setItem(`chat_${trackingResult.id}`, JSON.stringify(finalMessages));
    }, 2000);
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "origen":
        return <Package className="h-6 w-6" />;
      case "en-camino":
        return <Truck className="h-6 w-6" />;
      case "entregado":
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case "origen":
        return "pending";
      case "en-camino":
        return "in-transit";
      case "entregado":
        return "delivered";
      default:
        return "pending";
    }
  };

  const getStatusLabel = (estado: string) => {
    switch (estado) {
      case "origen":
        return "En origen";
      case "en-camino":
        return "En camino";
      case "entregado":
        return "Entregado";
      default:
        return "Pendiente";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <h1 className="section-title">Seguimiento GPS</h1>
              <p className="section-subtitle">
                Introduce tu número de seguimiento para localizar tu envío en tiempo real.
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-12 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ej: GV-2026-001"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="form-input pl-12 py-4 text-lg"
                  />
                </div>
                <button type="submit" className="btn-accent">
                  <MapPin className="h-5 w-5" />
                  LOCALIZAR
                </button>
              </div>
              {error && (
                <p className="text-destructive mt-2 text-center">{error}</p>
              )}
              <p className="text-sm text-muted-foreground text-center mt-2">
                Prueba con: GV-2026-001 o GV-2026-002
              </p>
            </form>

            {/* Results */}
            {trackingResult && (
              <div className="space-y-8 animate-fade-in-up">
                {/* Status Card */}
                <div className="bg-card rounded-2xl shadow-card p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Número de seguimiento</p>
                      <h2 className="text-2xl font-bold text-primary">{trackingResult.id}</h2>
                    </div>
                    <div className={`status-badge ${getStatusColor(trackingResult.estado)}`}>
                      {getStatusIcon(trackingResult.estado)}
                      {getStatusLabel(trackingResult.estado)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Origen</p>
                      <p className="font-semibold text-foreground">{trackingResult.origen}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destino</p>
                      <p className="font-semibold text-foreground">{trackingResult.destino}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Entrega estimada</p>
                      <p className="font-semibold text-foreground">{trackingResult.fechaEstimada}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conductor</p>
                        <p className="font-medium text-foreground">{trackingResult.conductor}</p>
                      </div>
                    </div>
                    {trackingResult.estado !== "entregado" && trackingResult.conductor !== "Por asignar" && (
                      <button
                        onClick={() => setChatOpen(!chatOpen)}
                        className="flex items-center gap-2 text-primary hover:text-accent transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Chat con conductor
                      </button>
                    )}
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-xl overflow-hidden shadow-card h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192873.0757!2d-1.8!3d41.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5913a14f5c7c47%3A0x5f3c0d2b3c4d5e6f!2sCalatayud%2C%20Zaragoza!5e0!3m2!1ses!2ses!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Ubicación del envío"
                  />
                </div>

                {/* Timeline */}
                <div className="bg-card rounded-2xl shadow-card p-8">
                  <h3 className="font-bold text-lg mb-6 text-foreground">Historial del envío</h3>
                  <div className="space-y-4">
                    {trackingResult.historial.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full ${index === trackingResult.historial.length - 1 ? "bg-accent" : "bg-primary"}`} />
                          {index < trackingResult.historial.length - 1 && (
                            <div className="w-0.5 h-full bg-border flex-1 my-1" />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className="font-semibold text-foreground">{item.estado}</p>
                          <p className="text-sm text-muted-foreground">{item.fecha} · {item.ubicacion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat */}
                {chatOpen && (
                  <div className="bg-card rounded-2xl shadow-card overflow-hidden animate-slide-in-right">
                    <div className="bg-primary text-primary-foreground p-4">
                      <h3 className="font-semibold">Chat con {trackingResult.conductor}</h3>
                    </div>
                    <div className="h-80 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`chat-bubble ${msg.sender === "user" ? "sent" : "received"}`}>
                          <p>{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <form onSubmit={sendMessage} className="p-4 border-t border-border flex gap-2">
                      <input
                        type="text"
                        placeholder="Escribe un mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="form-input flex-1"
                      />
                      <button type="submit" className="btn-accent p-3">
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Seguimiento;

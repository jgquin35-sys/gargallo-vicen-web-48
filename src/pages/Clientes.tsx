import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  User, Lock, LogIn, FileText, Download, TrendingUp,
  Package, Calendar, LogOut
} from "lucide-react";
import { toast } from "sonner";

interface ClientData {
  nombre: string;
  empresa: string;
  servicios: Array<{
    id: string;
    fecha: string;
    origen: string;
    destino: string;
    estado: string;
    importe: string;
  }>;
  facturas: Array<{
    id: string;
    fecha: string;
    concepto: string;
    importe: string;
  }>;
}

// Hidden test users (not visible in production)
const testUsers: Record<string, { password: string; data: ClientData }> = {
  admin: {
    password: "admin123",
    data: {
      nombre: "Administrador",
      empresa: "Empresa Demo S.L.",
      servicios: [
        { id: "GV-2026-001", fecha: "08/02/2026", origen: "Calatayud", destino: "Madrid", estado: "En camino", importe: "250,00 €" },
        { id: "GV-2026-002", fecha: "07/02/2026", origen: "Zaragoza", destino: "Calatayud", estado: "Entregado", importe: "85,00 €" },
        { id: "GV-2025-198", fecha: "28/01/2026", origen: "Barcelona", destino: "Calatayud", estado: "Entregado", importe: "320,00 €" },
        { id: "GV-2025-189", fecha: "15/01/2026", origen: "Calatayud", destino: "Valencia", estado: "Entregado", importe: "180,00 €" }
      ],
      facturas: [
        { id: "FAC-2026-0012", fecha: "01/02/2026", concepto: "Servicios Enero 2026", importe: "1.250,00 €" },
        { id: "FAC-2025-0156", fecha: "01/01/2026", concepto: "Servicios Diciembre 2025", importe: "980,00 €" },
        { id: "FAC-2025-0142", fecha: "01/12/2025", concepto: "Servicios Noviembre 2025", importe: "1.120,00 €" }
      ]
    }
  }
};

const Clientes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = testUsers[username.toLowerCase()];
    if (user && user.password === password) {
      setIsLoggedIn(true);
      setClientData(user.data);
      toast.success(`¡Bienvenido, ${user.data.nombre}!`);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setClientData(null);
    setUsername("");
    setPassword("");
    toast.info("Sesión cerrada correctamente");
  };

  const handleDownload = (facturaId: string) => {
    toast.success(`Descargando factura ${facturaId}...`);
    // Simulated download - in production would link to actual PDF
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto">
              {/* Header */}
              <div className="text-center mb-8 animate-fade-in-up">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h1 className="section-title">Zona Clientes</h1>
                <p className="text-muted-foreground">
                  Accede a tu área privada para gestionar tus envíos y facturas.
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="bg-card rounded-2xl shadow-card p-8 animate-fade-in-up">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="username" className="form-label">
                      <User className="inline h-4 w-4 mr-2" />
                      Usuario *
                    </label>
                    <input
                      type="text"
                      id="username"
                      required
                      className="form-input"
                      placeholder="Tu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="form-label">
                      <Lock className="inline h-4 w-4 mr-2" />
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      id="password"
                      required
                      className="form-input"
                      placeholder="Tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {error && (
                    <p className="text-destructive text-sm text-center">{error}</p>
                  )}

                  <button type="submit" className="btn-accent w-full">
                    <LogIn className="h-5 w-5" />
                    INICIAR SESIÓN
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <a href="#" className="text-sm text-primary hover:text-accent transition-colors">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-6">
                ¿No tienes cuenta? Contacta con nosotros en{" "}
                <a href="tel:976555123" className="text-primary hover:text-accent">
                  976 555 123
                </a>
              </p>
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
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fade-in-up">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Bienvenido, {clientData?.nombre}
                </h1>
                <p className="text-muted-foreground">{clientData?.empresa}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Cerrar sesión
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
              <div className="bg-card rounded-xl shadow-card p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Envíos totales</p>
                    <p className="text-2xl font-bold text-foreground">{clientData?.servicios.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl shadow-card p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">En curso</p>
                    <p className="text-2xl font-bold text-foreground">
                      {clientData?.servicios.filter(s => s.estado !== "Entregado").length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl shadow-card p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Facturas</p>
                    <p className="text-2xl font-bold text-foreground">{clientData?.facturas.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Servicios */}
              <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Mis Servicios
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">ID</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Fecha</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Ruta</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientData?.servicios.map((servicio) => (
                        <tr key={servicio.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                          <td className="py-3 px-2 text-sm font-medium text-primary">{servicio.id}</td>
                          <td className="py-3 px-2 text-sm text-foreground">{servicio.fecha}</td>
                          <td className="py-3 px-2 text-sm text-muted-foreground">
                            {servicio.origen} → {servicio.destino}
                          </td>
                          <td className="py-3 px-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              servicio.estado === "Entregado" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {servicio.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Facturas */}
              <div className="bg-card rounded-2xl shadow-card p-6 animate-fade-in-up">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Mis Facturas
                </h2>
                <div className="space-y-4">
                  {clientData?.facturas.map((factura) => (
                    <div 
                      key={factura.id}
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{factura.id}</p>
                          <p className="text-sm text-muted-foreground">{factura.concepto}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {factura.fecha}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground mb-2">{factura.importe}</p>
                        <button
                          onClick={() => handleDownload(factura.id)}
                          className="flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          Descargar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Clientes;

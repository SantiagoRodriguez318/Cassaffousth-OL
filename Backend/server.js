const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configurar el motor de vistas
app.set('view engine', 'html');

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(__dirname));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Ruta principal - sirve el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta de ejemplo para una API de búsqueda de vuelos
app.get('/api/flights/search', (req, res) => {
    // Esta es una simulación de una respuesta de API
    // En una aplicación real, aquí se conectaría a una base de datos o servicio de vuelos
    const { origin, destination, departureDate, returnDate, passengers } = req.query;
    
    // Validar parámetros requeridos
    if (!origin || !destination || !departureDate) {
        return res.status(400).json({ 
            error: 'Se requieren los parámetros: origin, destination y departureDate' 
        });
    }
    
    // Simular un retraso de red
    setTimeout(() => {
        // Datos de ejemplo de vuelos
        const sampleFlights = [
            {
                id: 'FL123',
                airline: 'SkyWings',
                flightNumber: 'SW456',
                departureTime: '08:00',
                arrivalTime: '11:30',
                duration: '3h 30m',
                price: 299,
                stops: 0,
                departureAirport: origin,
                arrivalAirport: destination,
                departureDate: departureDate,
                returnDate: returnDate || null
            },
            {
                id: 'FL124',
                airline: 'SkyWings',
                flightNumber: 'SW457',
                departureTime: '14:00',
                arrivalTime: '18:45',
                duration: '4h 45m',
                price: 259,
                stops: 1,
                departureAirport: origin,
                arrivalAirport: destination,
                departureDate: departureDate,
                returnDate: returnDate || null,
                stopDetails: '1 escala en GRU'
            }
        ];
        
        res.json({
            success: true,
            data: {
                flights: sampleFlights,
                searchParams: { origin, destination, departureDate, returnDate, passengers: parseInt(passengers) || 1 }
            }
        });
    }, 1000);
});

// Configurar rutas para cada página HTML
app.get('/vuelos', (req, res) => {
    res.sendFile(path.join(__dirname, 'vuelos.html'));
});

app.get('/ofertas', (req, res) => {
    res.sendFile(path.join(__dirname, 'ofertas.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'contacto.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/registro', (req, res) => {
    res.sendFile(path.join(__dirname, 'registro.html'));
});

app.get('/cuenta', (req, res) => {
    res.sendFile(path.join(__dirname, 'cuenta.html'));
});

// Manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

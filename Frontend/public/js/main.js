document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para destinos populares
    const popularDestinations = [
        {
            id: 1,
            city: 'Buenos Aires',
            country: 'Argentina',
            price: 299,
            image: 'https://images.unsplash.com/photo-1614786269829-d24616faf88d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            code: 'EZE'
        },
        {
            id: 2,
            city: 'Río de Janeiro',
            country: 'Brasil',
            price: 349,
            image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            code: 'GIG'
        },
        {
            id: 3,
            city: 'Miami',
            country: 'Estados Unidos',
            price: 499,
            image: 'https://images.unsplash.com/photo-1520101247427-35f7d00002db?ixlib=rb-4.0.3&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            code: 'MIA'
        },
        {
            id: 4,
            city: 'Madrid',
            country: 'España',
            price: 899,
            image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            code: 'MAD'
        }
    ];

    // Función para renderizar destinos populares
    function renderPopularDestinations() {
        const container = document.getElementById('popular-destinations');
        if (!container) return;

        container.innerHTML = popularDestinations.map(destination => `
            <div class="destination-card">
                <div class="destination-image" style="background-image: url('${destination.image}')"></div>
                <div class="destination-info">
                    <h3>${destination.city}, ${destination.country}</h3>
                    <p>${destination.code}</p>
                    <div class="destination-price">Desde $${destination.price}</div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" 
                            onclick="searchFlight('${destination.city}', '${destination.code}')">
                        Ver vuelos
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Función para buscar vuelos
    window.searchFlight = function(city, code) {
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        
        if (originInput && destinationInput) {
            // Si se hace clic en un destino, lo establecemos como destino
            destinationInput.value = `${city} (${code})`;
            originInput.focus();
        }
    };

    // Manejar el envío del formulario de búsqueda
    const flightSearchForm = document.getElementById('flight-search');
    if (flightSearchForm) {
        flightSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const origin = document.getElementById('origin').value;
            const destination = document.getElementById('destination').value;
            const departureDate = document.getElementById('departure').value;
            const returnDate = document.getElementById('return').value;
            const passengers = document.getElementById('passengers').value;
            
            if (!origin || !destination || !departureDate) {
                alert('Por favor complete los campos obligatorios: Origen, Destino y Fecha de Salida');
                return;
            }
            
            // Aquí iría la lógica para buscar vuelos
            console.log('Buscando vuelos...', {
                origin,
                destination,
                departureDate,
                returnDate,
                passengers
            });
            
            // Simular búsqueda
            alert('Buscando vuelos... Esta es una simulación. En una aplicación real, se conectaría a una API de vuelos.');
        });
    }

    // Configurar fechas por defecto
    function setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        const departureInput = document.getElementById('departure');
        const returnInput = document.getElementById('return');
        
        if (departureInput) {
            departureInput.min = formatDate(today);
            departureInput.value = formatDate(tomorrow);
        }
        
        if (returnInput) {
            returnInput.min = formatDate(tomorrow);
            returnInput.value = formatDate(nextWeek);
            
            // Actualizar fecha mínima de regreso cuando cambia la fecha de salida
            if (departureInput) {
                departureInput.addEventListener('change', function() {
                    const departureDate = new Date(this.value);
                    const nextDay = new Date(departureDate);
                    nextDay.setDate(nextDay.getDate() + 1);
                    returnInput.min = formatDate(nextDay);
                    
                    // Si la fecha de regreso es anterior a la nueva fecha de salida + 1 día, actualizarla
                    if (new Date(returnInput.value) < nextDay) {
                        returnInput.value = formatDate(nextDay);
                    }
                });
            }
        }
    }

    // Inicializar la aplicación
    function init() {
        renderPopularDestinations();
        setDefaultDates();
        
        // Cambiar pestañas
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Ejecutar inicialización
    init();
});

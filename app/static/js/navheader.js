
        // Estado de la aplicación
        const appState = {
            destination: 'Lions Houses Parrita',
            checkIn: null,
            checkOut: null,
            rooms: [{
                adults: 2,
                children: 0
            }],
            discount: null,
            selectedDates: {
                start: null,
                end: null
            }
        };
        
        // Variables para controlar los modales
        let currentModal = null;
        const modals = {
            'destination': document.getElementById('destination-modal'),
            'dates': document.getElementById('dates-modal'),
            'rooms': document.getElementById('rooms-modal'),
            'discounts': document.getElementById('discounts-modal')
        };
        
        const overlay = document.getElementById('modal-overlay');
        
        // Abrir modal al hacer clic en un item del menú
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                const modalId = this.getAttribute('data-modal');
                
                // Si ya está abierto, cerrarlo
                if (currentModal === modalId) {
                    CerrarModal();
                    return;
                }
                
                // Cerrar cualquier modal abierto
                CerrarModal();
                
                // Abrir el nuevo modal
                AbrirModal(modalId);
                
                // Activar el item del menú
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        
        // Función para abrir un modal
        function AbrirModal(modalId) {
            currentModal = modalId;
            
            // Ocultar todos los modales primero
            Object.values(modals).forEach(modal => {
                modal.classList.remove('active');
            });
            
            // Mostrar el modal seleccionado
            modals[modalId].classList.add('active');
            overlay.classList.add('active');
        }
        
        // Función para cerrar el modal actual
        function CerrarModal() {
            if (currentModal) {
                modals[currentModal].classList.remove('active');
                document.querySelectorAll('.menu-item').forEach(item => {
                    item.classList.remove('active');
                });
                overlay.classList.remove('active');
                currentModal = null;
            }
        }
        
        // Cerrar modal al hacer clic en el overlay
        overlay.addEventListener('click', CerrarModal);
        
        // Cerrar modal al hacer clic en botones cancelar
        document.querySelectorAll('[data-modal-close]').forEach(btn => {
            btn.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal-close');
                if (currentModal === modalId) {
                    CerrarModal();
                }
            });
        });
        
        // Aceptar cambios en los modales
        document.querySelectorAll('[data-modal-accept]').forEach(btn => {
            btn.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal-accept');
                
                // Actualizar estado según el modal
                switch(modalId) {
                    case 'destination':
                        if (appState.destination) {
                            updateMenuBadge('destination', '1');
                        }
                        break;
                    case 'dates':
                        if (appState.selectedDates.start && appState.selectedDates.end) {
                            const nights = calculateNights();
                            updateMenuBadge('dates', `${nights}n`);
                        }
                        break;
                    case 'rooms':
                        const totalGuests = appState.rooms.reduce((total, room) => total + room.adults + room.children, 0);
                        updateMenuBadge('rooms', `${appState.rooms.length}h/${totalGuests}p`);
                        break;
                    case 'discounts':
                        if (appState.discount) {
                            updateMenuBadge('discounts', '✓');
                        }
                        break;
                }
                
                CerrarModal();
            });
        });
        
        // Actualizar badges del menú
        function updateMenuBadge(type, value) {
            const badge = document.getElementById(`${type}-badge`);
            if (badge) {
                badge.textContent = value;
                badge.style.display = 'inline';
            }
        }
        
        // Funcionalidad para el modal de destino
        document.getElementById('destination-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const items = document.querySelectorAll('.destination-item');
            
            items.forEach(item => {
                const name = item.querySelector('.destination-name').textContent.toLowerCase();
                const details = item.querySelector('.destination-details').textContent.toLowerCase();
                
                if (name.includes(searchTerm) || details.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
        
        document.querySelectorAll('.destination-item').forEach(item => {
            item.addEventListener('click', function() {
                // Quitar selección anterior
                document.querySelectorAll('.destination-item').forEach(i => {
                    i.classList.remove('selected');
                });
                
                // Seleccionar este item
                this.classList.add('selected');
                const destination = this.getAttribute('data-destination');
                appState.destination = destination;
            });
        });
        
        // Funcionalidad para el modal de fechas
        let selectedStartDate = null;
        let selectedEndDate = null;
        
        document.querySelectorAll('#dates-modal td:not(.empty)').forEach(cell => {
            cell.addEventListener('click', function() {
                const dateValue = parseInt(this.textContent);
                
                if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
                    // Reiniciar selección
                    document.querySelectorAll('#dates-modal td.selected').forEach(el => {
                        el.classList.remove('selected');
                    });
                    document.querySelectorAll('#dates-modal td.in-range').forEach(el => {
                        el.classList.remove('in-range');
                    });
                    
                    selectedStartDate = dateValue;
                    selectedEndDate = null;
                    this.classList.add('selected');
                    document.getElementById('nights-counter').textContent = '0 noches seleccionadas';
                    
                    // Actualizar estado
                    appState.selectedDates.start = dateValue;
                    appState.selectedDates.end = null;
                } else {
                    // Completar el rango de fechas
                    selectedEndDate = dateValue;
                    
                    // Ordenar las fechas si es necesario
                    const start = Math.min(selectedStartDate, selectedEndDate);
                    const end = Math.max(selectedStartDate, selectedEndDate);
                    
                    // Marcar todas las celdas en el rango
                    document.querySelectorAll('#dates-modal td:not(.empty)').forEach(el => {
                        const cellDate = parseInt(el.textContent);
                        if (cellDate >= start && cellDate <= end) {
                            el.classList.add('in-range');
                        }
                        if (cellDate === start || cellDate === end) {
                            el.classList.add('selected');
                        }
                    });
                    
                    // Calcular noches seleccionadas
                    const nights = end - start;
                    document.getElementById('nights-counter').textContent = `${nights} noche${nights !== 1 ? 's' : ''} seleccionada${nights !== 1 ? 's' : ''}`;
                    
                    // Actualizar estado
                    appState.selectedDates.start = start;
                    appState.selectedDates.end = end;
                }
            });
        });
        
        function calculateNights() {
            if (appState.selectedDates.start && appState.selectedDates.end) {
                return appState.selectedDates.end - appState.selectedDates.start;
            }
            return 0;
        }
        
        // Funcionalidad para el modal de habitaciones
        document.querySelectorAll('.counter-btn').forEach(button => {
            button.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                const counter = document.getElementById(`${type}-count`);
                let value = parseInt(counter.textContent);
                
                if (this.classList.contains('plus')) {
                    // Verificar límite máximo de 5 personas por habitación
                    const adultsCount = parseInt(document.getElementById('adults-count').textContent);
                    const childrenCount = parseInt(document.getElementById('children-count').textContent);
                    
                    if (adultsCount + childrenCount >= 6) {
                        ShowModal('Error','La ocupación máxima por habitación es de 5 personas','error');
                        return;
                    }
                    
                    value++;
                    
                    // Actualizar estado
                    if (type === 'adults') {
                        appState.rooms[0].adults = value;
                    } else {
                        appState.rooms[0].children = value;
                    }
                    
                    // Actualizar badge
                    const totalGuests = appState.rooms.reduce((total, room) => total + room.adults + room.children, 0);
                    updateMenuBadge('rooms', `${appState.rooms.length}h/${totalGuests}p`);
                } else if (this.classList.contains('minus')) {
                    if (value > (type === 'adults' ? 1 : 0)) {
                        value--;
                        
                        // Actualizar estado
                        if (type === 'adults') {
                            appState.rooms[0].adults = value;
                        } else {
                            appState.rooms[0].children = value;
                        }
                        
                        // Actualizar badge
                        const totalGuests = appState.rooms.reduce((total, room) => total + room.adults + room.children, 0);
                        updateMenuBadge('rooms', `${appState.rooms.length}h/${totalGuests}p`);
                    }
                }
                
                counter.textContent = value;
                
                // Actualizar mensaje de ocupación máxima
                const total = parseInt(document.getElementById('adults-count').textContent) + 
                              parseInt(document.getElementById('children-count').textContent);
                const maxOccupancy = document.querySelector('.max-occupancy');
                if (total >= 5) {
                    maxOccupancy.style.backgroundColor = '#fff2f2';
                    maxOccupancy.style.color = '#d32f2f';
                } else {
                    maxOccupancy.style.backgroundColor = '#f0f8ff';
                    maxOccupancy.style.color = '#666';
                }
            });
        });
        
        // Botón de restablecer
        document.getElementById('reset-room').addEventListener('click', function() {
            document.getElementById('adults-count').textContent = '2';
            document.getElementById('children-count').textContent = '0';
            
            // Actualizar estado
            appState.rooms[0].adults = 2;
            appState.rooms[0].children = 0;
            
            // Actualizar badge
            updateMenuBadge('rooms', '1h/2p');
            
            // Restablecer mensaje de ocupación
            const maxOccupancy = document.querySelector('.max-occupancy');
            maxOccupancy.style.backgroundColor = '#f0f8ff';
            maxOccupancy.style.color = '#666';
        });
        
        // Botón de añadir habitación
        document.querySelector('.add-room-btn').addEventListener('click', function() {
            alert('Funcionalidad para añadir una nueva habitación. Se agregaría una nueva habitación al array appState.rooms');
        });
        
        // Funcionalidad para el modal de descuentos
        document.querySelectorAll('.discount-card').forEach(card => {
            card.addEventListener('click', function() {
                // Quitar selección anterior
                document.querySelectorAll('.discount-card').forEach(c => {
                    c.classList.remove('selected');
                });
                
                // Seleccionar este descuento
                this.classList.add('selected');
                const discount = this.getAttribute('data-discount');
                appState.discount = discount;
            });
        });
        
        // Botón de búsqueda
        document.querySelector('.search-btn').addEventListener('click', function() {
            if (!appState.destination) {
                alert('Por favor, selecciona un destino primero');
                return;
            }
            
            let message = `Buscando disponibilidad para:\n`;
            message += `Destino: ${appState.destination || 'No seleccionado'}\n`;
            
            if (appState.selectedDates.start && appState.selectedDates.end) {
                message += `Fechas: ${appState.selectedDates.start} dic - ${appState.selectedDates.end} dic (${calculateNights()} noches)\n`;
            } else {
                message += `Fechas: No seleccionadas\n`;
            }
            
            message += `Habitaciones: ${appState.rooms.length}\n`;
            message += `Personas: ${appState.rooms.reduce((total, room) => total + room.adults + room.children, 0)}\n`;
            
            if (appState.discount) {
                message += `Descuento aplicado: ${appState.discount}`;
            }
            
            alert(message);
        });
        
        // Cerrar modal al presionar Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                CerrarModal();
            }
        });
        
        // Prevenir que clics dentro del modal cierren el modal
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
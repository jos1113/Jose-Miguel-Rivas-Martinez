function openModal(id){
    document.getElementById(id).style.display = 'block';
}
function closeModal(id){
    document.getElementById(id).style.display = 'none';
}

// Cerrar modal si clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if(event.target == modal){
            modal.style.display = 'none';
        }
    });
}

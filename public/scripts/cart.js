// Eliminar ítem del carrito
document.querySelectorAll(".remove-from-cart").forEach(button => {
    button.addEventListener("click", async () => {
        const itemId = button.dataset.itemId;
        try {
            const response = await fetch(`/api/carts/${itemId}`, {
                method: "DELETE"
            });
            const result = await response.json();
            if (result.response?.success) location.reload();
        } catch (error) {
            console.error("Error:", error);
            alert("Error al eliminar del carrito");
        }
    });
});
// Finalizar compra
document.querySelector("#checkout")?.addEventListener("click", async () => {
    try {
        const response = await fetch("/api/carts/checkout", {
            method: "POST"
        });
        const result = await response.json();
        if (result.success) {
            alert("¡Compra finalizada con éxito!");
            location.reload();
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al finalizar la compra");
    }
});
document.querySelector(".add-to-cart-btn")?.addEventListener("click", async (e) => {
    const button = e.target;
    const productId = button.dataset.productId;
    try {
        const response = await fetch("/api/carts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId, quantity: 1 })
        });
        const result = await response.json();
        if (result.response?.success === true) {
            alert("Producto agregado al carrito");
        } else {
            alert("No se pudo agregar al carrito: " + (result.message || "Error desconocido"));
        }
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("Ocurrió un error al agregar al carrito");
    }
});

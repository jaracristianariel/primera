document.querySelectorAll(".update-form").forEach(form => {
    form.addEventListener("submit", async e => {
        e.preventDefault();
        const id = form.dataset.id;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.price = parseFloat(data.price);
        data.stock = parseInt(data.stock);
        try {
            const res = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (result.error) {
                alert("Error: " + result.error);
            } else {
                alert("Producto actualizado con Exito");
                location.reload();
            }
        } catch (error) {
            console.error(error);
            alert("Error al actualizar producto");
        }
    });
});
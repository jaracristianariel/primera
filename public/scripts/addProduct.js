document.querySelector("#addProduct").addEventListener("click", async () => {
    try {
        const data = {
            title: document.querySelector("#title").value,
            description: document.querySelector("#description").value,
            category: document.querySelector("#category").value,
            image: document.querySelector("#image").value,
            price: parseFloat(document.querySelector("#price").value),
            stock: parseInt(document.querySelector("#stock").value),
            onsale: document.querySelector("#onsale").checked,
        };
        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
        const res = await fetch("/api/products", opts);
        const result = await res.json();
        if (result.error) {
            alert(result.error);
        } else {
            alert("Producto agregado correctamente");
            location.replace("/");
        }
    } catch (error) {
        console.error(error);
        alert("Error al agregar producto");
    }
});
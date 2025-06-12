document.querySelector("#forgot").addEventListener("click", async (e) => {
    try {
        const email = document.querySelector("#email").value;
        if (!email) return alert("ingresa su correo a recuperar");
        const response = await fetch("/api/auth/request-reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (result.error) alert(result.error);
        else {
            alert("Correo enviado con instrucciones para restablecer tu contraseña.");
            location.href = "/";
        }
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
});


document.querySelector("#reset").addEventListener("click", async () => {
    try {
        const email = document.querySelector("#email").value;
        const password1 = document.querySelector("#password1").value;
        const password2 = document.querySelector("#password2").value;
        if (!password1 || !password2) {
            alert("completar ambos campos");
            return;
        }
        if (password1 !== password2) {
            alert("las contraseñas no coinciden");
            return;
        }
        const opts = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({password:password1})
        };
        const url = `/api/auth/reset/${email}`;
        let response = await fetch(url, opts);
        response = await response.json();
        if (response.error) {
            alert(response.error);
        } else {
            alert("contraseña actualizada")
            location.replace("/login");
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
});
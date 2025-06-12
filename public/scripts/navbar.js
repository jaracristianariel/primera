const selector = document.querySelector("#opts");

const isOnline = async () => {
    try {
        const opts = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const url = "/api/auth/online";
        let response = await fetch(url, opts);
        response = await response.json();
        console.log(response)
        if (response.error) {
            selector.innerHTML = `
            <a class="btn btn-success py-1 px-2 m-1" href="/register">Register</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/login">Login</a>
            `;
        } else {
            let buttons = `
            <a class="btn btn-success py-1 px-2 m-1" href="/profile">Profile</a>
            <a class="btn btn-success py-1 px-2 m-1" href="/cart">Cart</a>
            `;
            const role = response.response.role;
            if (role === "ADMIN") {
                buttons += `<a class="btn btn-success py-1 px-2 m-1" href="/add-product">Add Producto</a>
                            <a class="btn btn-success py-1 px-2 m-1" href="/update-products">Update Producto</a>`
            }
            buttons += `<button class="btn btn-success py-1 px-2 m-1" id="signout">Sign out</button>`
            selector.innerHTML = buttons;
        document.querySelector("#signout").addEventListener("click", async () => {
            try {
                const opts = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const url = "/api/auth/signout";
                await fetch(url, opts);
                localStorage.removeItem("token");
                location.replace("/");
            } catch (error) {
                console.log(error);
            }
        });
        }
        
    } catch (error) {
        
    }
};

isOnline();
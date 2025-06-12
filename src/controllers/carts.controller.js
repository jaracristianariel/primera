import { cartsService, productsService } from "../services/service.js";

const addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const user_id = req.user._id;
        // mira stock
        const product = await productsService.readById(productId);
        if (!product || product.stock < quantity) {
            return res.json400("Stock insuficiente");
        }
        // buscar si ya existe el producto en el carrito del usuario
        const existingItem = await cartsService.readBy({
            user_id,
            product_id: productId,
            state: "reserved"
        });
        if (existingItem) {
            // actualiza la cantidad si ya existe
            await cartsService.updateById(existingItem._id, {
                quantity: existingItem.quantity + quantity
            });
        } else {
            // Crear nuevo ítem en el carrito
            await cartsService.createOne({
                product_id: productId,
                user_id,
                quantity
            });
        }
        // actualiza ell stock
        await productsService.updateById(productId, {
            $inc: { stock: -quantity }
        });

        res.json201({ success: true });
    } catch (error) {
        res.json500(error.message);
    }
};

const getCart = async (req, res) => {
    try {
        const user_id = req.user._id;
        const cartItems = await cartsService.readAll({
            user_id,
            state: "reserved"
        });
        // Calcular total
        const total = cartItems.reduce((sum, item) => {
            return sum + (item.product_id.price * item.quantity);
        }, 0);
        res.render("cart", {
            cartItems,
            total: total.toFixed(2)
        });
    } catch (error) {
        res.json500(error.message);
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const user_id = req.user?._id;
        if (!user_id) {
            return res.json401("Usuario no autenticado");
        }
        const item = await cartsService.readById(itemId);
        if (!item) {
            return res.json404("Ítem no encontrado");
        }
        const itemUserId = item.user_id._id?.toString?.() || item.user_id.toString();
        const currentUserId = user_id.toString();
        if (itemUserId !== currentUserId) {
            return res.json403("No tienes permiso para eliminar este ítem");
        }
        // Devolver el stock al producto
        await productsService.updateById(item.product_id, {
            $inc: { stock: item.quantity }
        });
        // Eliminar ítem del carrito
        await cartsService.destroyById(itemId);
        res.json200({ success: true });
    } catch (error) {
        console.error("Error al eliminar ítem del carrito:", error);
        res.json500("Error interno del servidor");
    }
};

const checkout = async (req, res) => {
    try {
        const user_id = req.user._id;
        // 1. Cambiar estado de los ítems del carrito a "paid"
        await cartsService.u(
            { user_id, state: "reserved" }, // Filtro: ítems del usuario en estado "reserved"
            { state: "paid" } // Nuevo estado
        );
        res.json200({
            success: true,
            message: "Compra finalizada con éxito"
        });
    } catch (error) {
        res.json500(error.message);
    }
};

export { addToCart, getCart, removeFromCart, checkout }



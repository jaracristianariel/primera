class DaoMemory {
    constructor() {}
    createOne = async (data) => {/* logica para crear uno */};
    readAll = async (filter) => {/* logica para leer todos o filtrar en la memoria metodo filter*/};
    readById = async (id) => {/* logica para leer por id */};
    readBy = async (filter) => {/* logica para leer uno de la memoria */};
    updateById = async (id, data) => {/* logica para actualizar uno de la memoria */};
    destroyById = async (id) =>  {/* logica para borrar uno de la memoria */};
}

const productsManager = new DaoMemory();
const cartsManager = new DaoMemory();
const usersManager = new DaoMemory();

export { productsManager, cartsManager, usersManager };
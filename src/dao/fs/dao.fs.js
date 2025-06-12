class DaoFs {
    constructor() {}
    createOne = async (data) => {/* logica para crear uno en fs */};
    readAll = async (filter) => {/* logica para leer todos o filtrar en fs metodo readfile o readfilesync */};
    readById = async (id) => {/* logica para leer por id */};
    readBy = async (filter) => {/* logica para leer uno de fs */};
    updateById = async (id, data) => {/* logica para actualizar uno de fs */};
    destroyById = async (id) =>  {/* logica para borrar uno de fs */};
}

const productsManager = new DaoFs();
const cartsManager = new DaoFs();
const usersManager = new DaoFs();

export { productsManager, cartsManager, usersManager };
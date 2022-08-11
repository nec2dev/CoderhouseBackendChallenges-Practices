class ProductsAPI {
    constructor() {
        this.productos = []
        this.id = 0
    }

    toList(id) {
        const prod = this.productos.find(prod => prod.id == id)
        return prod || { error: 'No se ha encontrado el producto.' }
    }

    toListAll() {
        return [...this.productos]
    }

    save(prod) {
        const newProd = { ...prod, id: ++this.id }
        this.productos.push(newProd)
        return newProd
    }

    toUpdate(prod, id) {
        const newProd = { id: Number(id), ...prod }
        const index = this.productos.findIndex(p => p.id == id)
        if (index !== -1) {
            this.productos[index] = newProd
            return newProd
        } else {
            return { error: 'No se ha encontrado el producto.' }
        }
    }

    delete(id) {
        const index = this.productos.findIndex(prod => prod.id == id)
        if (index !== -1) {
            return this.productos.splice(index, 1)
        } else {
            return { error: 'No se ha encontrado el producto.' }
        }
    }
}
module.exports = ProductsAPI
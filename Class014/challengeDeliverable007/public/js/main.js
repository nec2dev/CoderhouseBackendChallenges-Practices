const showProducts = () => {
  const route = '/api/productos';
  fetch(route).then((res) => res.json()).then((data) =>{
    if (data.productos) {
      let html = `
        <table class="table table-dark">
          <thead><tr style="color: yellow;"> <th>Nombre</th> <th>Descripcion</th> <th>Código</th> <th>Foto</th> <th>Precio</th> <th>Stock</th><th>Acciones</th> </tr></thead><tbody>
      `;
      for (let producto of data.productos) {
        let id = producto.id
        html += `<tr><td>${producto.title}</td><td>${producto.description}</td><td>${producto.code}</td><td><img src="${producto.thumbnail}" alt="Imagen del producto"></td><td>${producto.price}</td><td>${producto.stock ? 'Producto disponible' : 'Producto no disponible'}</td>`;
        if (data.admin) {
          html += `<td><button>Actualizar</button><button onclick="delProduct(producto.id)">Eliminar</button></td>`;
        }
      }
      html += `</tbody></table>`;
      document.getElementById('productList').innerHTML = html;
    }
  }).catch((error) => console.log(error));
}

const delProduct = (id) => {
  const route = `/api/productos/${id}`;
  alert(route);
}

showProducts()
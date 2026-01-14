const boton = document.getElementById("loadProducts");
const contenedor = document.getElementById("contenedorTarjetas");

let json = [];

function descripcion100(descripcion) {
  if (descripcion.length > 100) {
    return descripcion.substring(0, 100) + "...";
  }
  return descripcion;
}

function mostrarModal(id) {
  const product = json.find((p) => p.id === id);
  const descripcion = product.description;

  document.getElementById("descripcionModal").textContent = descripcion;
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalCategory").textContent = product.category.name;
  document.getElementById("imagenModal").src = product.images[0];
  document.getElementById("imagenModal").alt = product.title;
}

boton.addEventListener("click", (event) => {
  event.preventDefault();
  contenedor.innerHTML = "";

  fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((dato) => {
      json = dato;
      dato.forEach((product) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "col";
        tarjeta.innerHTML = `
          <div class="card shadow-sm">
             <img src="${product.images[0]}" class="card-img-top" alt="${
          product.title
        }">
              <title>${product.title}</title>
              <rect width="100%" height="100%" fill="#55595c" />
              <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                ${product.title}
              </text>
            </svg>
            <div class="card-body">
              <p class="card-text">
                ${descripcion100(product.description)}
              </p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modalVerMas" onclick="mostrarModal(${
                    product.id
                  })">
                    Ver más
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">
                    Edit
                  </button>
                </div>
                <small class="text-body-secondary">$${product.price}</small>
              </div>
            </div>
          </div>`;
        contenedor.appendChild(tarjeta);
      });
    });
});

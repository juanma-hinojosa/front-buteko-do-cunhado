import React, { useState, useEffect } from 'react';
import '../css/components/ItemMenuManager.css';

const categorias = [
  'Hamburguer', 'Boca de Anjo', 'Pastel', 'PORÇÕES', 'Isca de Frango',
  'Peixe', 'Pratos', 'Drinks', 'Bebidas sem Alcool', 'Cerveja', 'Sobremesas'
];

const ItemMenuManager = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [itemsOriginales, setItemsOriginales] = useState([]);


  const [formData, setFormData] = useState({
    categoria: '',
    nombre: '',
    descripcion: '',
    valor: '',
    estado: 'Disponible',
    foto: null
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    fetchItems();
  }, []);

  const handleFiltroCategoria = (e) => {
    const categoriaSeleccionada = e.target.value;
    setCategoriaFiltro(categoriaSeleccionada);

    if (categoriaSeleccionada === '') {
      fetchItems(); // Muestra todos
    } else {
      const filtrados = itemsOriginales.filter(item => item.categoria === categoriaSeleccionada);
      setItems(filtrados);
    }
  };


  const fetchItems = async () => {
    const res = await fetch( `${import.meta.env.VITE_API_URL}/api/menu`);
    const data = await res.json();
    setItems(data);
    setItemsOriginales(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const form = new FormData();
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (value) form.append(key, value);
  //   });

  //   const url = editId ? `http://localhost:5000/api/menu/${editId}` : 'http://localhost:5000/api/menu';
  //   const method = editId ? 'PUT' : 'POST';

  //   const storedUser = JSON.parse(localStorage.getItem("user"));
  //   const token = storedUser?.token;


  //   const res = await fetch(url, {
  //     method,
  //     body: form,
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });

  //   if (res.ok) {
  //     fetchItems();
  //     setFormData({
  //       categoria: '',
  //       nombre: '',
  //       descripcion: '',
  //       valor: '',
  //       estado: 'Disponible',
  //       foto: null
  //     });
  //     setEditId(null);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    const url = editId
      ? `${import.meta.env.VITE_API_URL}/api/menu/${editId}`
      : `${import.meta.env.VITE_API_URL}/api/menu`;
    const method = editId ? 'PUT' : 'POST';

    // const storedUser = JSON.parse(localStorage.getItem("token"));
    // console.log("Token:", storedUser?.token);
    // const token = storedUser?.token;

    const res = await fetch(url, {
      method,
      body: form,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });

    if (res.ok) {
      fetchItems();
      setFormData({
        categoria: '',
        nombre: '',
        descripcion: '',
        valor: '',
        estado: 'Disponible',
        foto: null
      });
      setEditId(null);
    } else {
      const err = await res.json();
      alert(`Error: ${err.message}`);
    }
  };


  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      categoria: item.categoria,
      nombre: item.nombre,
      descripcion: item.descripcion,
      valor: item.valor,
      estado: item.estado,
      foto: null
    });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('¿Eliminar este producto?');
    if (!confirm) return;
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    // const token = storedUser?.token;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/menu/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });

    if (res.ok) fetchItems();
  };

  return (
    <div className="itemmenu-container">

      {user?.role === "admin" && (
        <>
          <h2>{editId ? 'Editar Produto' : 'Criar Novo Producto do Menú'}</h2>
          <form onSubmit={handleSubmit} className="itemmenu-form">
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="">Escolha a categoría</option>
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nome do Produto"
              required
            />
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descrição"
            />
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="Valor"
              required
            />
            <select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Disponible">Disponivel</option>
              <option value="Sin stock">Sem stock</option>
            </select>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
            />
            <button type="submit">{editId ? 'Atualizar' : 'Criar'}</button>
          </form>
        </>

      )}

      <div className="filtro-categorias">
        <label htmlFor="filtro">Filtrar por categoría: </label>
        <select id="filtro" value={categoriaFiltro} onChange={handleFiltroCategoria}>
          <option value="">-- Todas --</option>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={fetchItems}>Mostrar Todos</button>
      </div>

      <h1>Cardapio</h1>
      <div className="itemmenu-grid">
        {items.map(item => (
          <div key={item._id} className="itemmenu-card">
            <img src={item.fotoUrl} alt={item.nombre} />
            <div>
              <h4
                style={{
                  textTransform: "capitalize"
                }}
              >{item.nombre}</h4>
              <p><strong>Cat:</strong> {item.categoria}</p>
              <p><strong>Desc:</strong> {item.descripcion}</p>
              <p><strong>Precio: </strong>R${item.valor}</p>
              <p><strong>Estado:</strong> {item.estado}</p>
              {user?.role === "admin" && (<>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item._id)} className="delete">Eliminar</button>
              </>

              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemMenuManager;

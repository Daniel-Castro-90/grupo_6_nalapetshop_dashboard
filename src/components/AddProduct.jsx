import { useState } from 'react';

function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [highlight, setHighlight] = useState('');
  const [packageNum, setPackageNum] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    console.log(event.target.value);
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleHighlightChange = (event) => {
    setHighlight(event.target.value);
  };

  const handlePackageNumChange = (event) => {
    setPackageNum(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Validaciones
  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError('Ingrese un nombre válido.');
      isValid = false;
    } else {
      setNameError('');
    }

    // Puedes agregar más validaciones según tus requisitos

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category == 'Gato' ? 'Gato' : 'Perro');
    formData.append('price', price);
    formData.append('highlight', highlight == 'Si' ? 1 : 0);
    formData.append('package', packageNum);
    formData.append('description', description);
    formData.append('image', image);

    try {
      // Realizar la solicitud POST a la API
      const response = await fetch('http://localhost:3000/api/addproduct', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Producto agregado correctamente');
        window.location.href = '/productadded';
      } else {
        console.error('Error al agregar producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al agregar producto:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'black', fontFamily: 'Nunito, sans-serif' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', padding: '20px', borderRadius: '8px', textAlign: 'center', margin: '0 auto' }}>
          Agregar Producto
        </h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-grid', marginTop: '20px', textAlign: 'left', margin: '0 auto 10px auto' }}>
        <label>
          <strong>Nombre del Producto:&nbsp;</strong>
          <input type="text" placeholder="Ingrese el nombre del producto" value={name} onChange={handleNameChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          <span style={{ color: 'red' }}>{nameError}</span>
        </label>
        <br />
        <label>
          <strong>Categoría:&nbsp;</strong>
          <select value={category} onChange={handleCategoryChange} style={{ backgroundColor: '#c79f9f', color: 'black', cursor: 'pointer', width: '100%' }}>
            <option value='Gato'>Gato</option>
            <option value='Perro'>Perro</option>
          </select>
        </label>
        <br />
        <label>
          <strong>Precio:&nbsp;</strong>
          <input type="text" placeholder="Ingrese el precio" value={price} onChange={handlePriceChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          <span style={{ color: 'red' }}>{priceError}</span>
        </label>
        <br />
        <label>
          <strong>Destacado:&nbsp;</strong>
          <select value={highlight} onChange={handleHighlightChange} style={{ backgroundColor: '#c79f9f', color: 'black', cursor: 'pointer', width: '100%' }}>
            <option value="Si">Sí</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />
        <label>
          <strong>Presentación:&nbsp;</strong>
          <input type="text" placeholder="Ingrese cantidad en kilogramos" value={packageNum} onChange={handlePackageNumChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
        </label>
        <br />
        <label>
          <strong>Descripción:&nbsp;</strong>
          <textarea placeholder="Ingrese la descripción" value={description} onChange={handleDescriptionChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%', height: '100%' }} />
        </label>
        <br />
        <label>
          <strong>Imagen:&nbsp;</strong>
          <input type="file" accept="image/*" name='image' onChange={handleImageChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
        </label>
        <br />
        {image && <img src={image} alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
        <br />
        <button type="submit" style={{ backgroundColor: '#c79f9f', color: 'white', cursor: 'pointer' }}>Crear nuevo Producto</button>
      </form>
    </div>
  );
}

export default AddProduct;

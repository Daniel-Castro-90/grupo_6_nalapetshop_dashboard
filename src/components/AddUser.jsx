import React, { useState } from 'react';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [dni, setDni] = useState('');
  const [tel, setTel] = useState('');
  const [role, setRole] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const handleTelChange = (event) => {
    setTel(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
    console.log('Valor de role después de setRole:', role);
  };

  // Validaciones
  const validateForm = () => {
    let isValid = true;

    if (!email || !email.includes('@')) {
      setEmailError('Ingrese un correo electrónico válido.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 8) {
      setPasswordError('Contraseña debe tener al menos 8 caracteres.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('image', image);
    formData.append('dni', dni);
    formData.append('tel', tel);
    console.log('Valor de role:', role);
    formData.append('roles_id', role == 'Administrador' ? 1 : 2);
    console.log('Valor de roles_id en FormData:', formData.get('roles_id'));
    

    try {
      // Realizar la solicitud POST a la API
      const response = await fetch('http://localhost:3000/api/adduser', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Usuario agregado correctamente');
        window.location.href = '/useradded';
      } else {
        console.error('Error al agregar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al agregar usuario:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'black', fontFamily: 'Nunito, sans-serif' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', padding: '20px', borderRadius: '8px', textAlign: 'center', margin: '0 auto' }}>
        Agregar Usuario
      </h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-grid', marginTop: '20px', textAlign: 'left', margin: '0 auto 10px auto' }}>
        <label>
          <strong>Correo Electrónico:&nbsp;</strong>
          <input type="email" placeholder="Ingrese el correo electrónico" value={email} onChange={handleEmailChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          <span style={{ color: 'red' }}>{emailError}</span>
        </label>
        <br />
        <label>
          <strong>Contraseña:&nbsp;</strong>
          <input type="password" placeholder="Ingrese la contraseña" value={password} onChange={handlePasswordChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          <span style={{ color: 'red' }}>{passwordError}</span>
        </label>
        <br />
        <label>
          <strong>Imagen:&nbsp;</strong>
          <input type="file" accept="image/*" name="image" onChange={handleImageChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
        </label>
        <br />
        {image && <img src={image} alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
        <br />
        <label>
          <strong>DNI:&nbsp;</strong>
          <input type="text" placeholder="Ingrese el DNI" value={dni} onChange={handleDniChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
        </label>
        <br />
        <label>
          <strong>Teléfono:&nbsp;</strong>
          <input type="text" placeholder="Ingrese el número de teléfono" value={tel} onChange={handleTelChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
        </label>
        <br />
        <label>
          <strong>Rol:&nbsp;</strong>
          <select value={role} onChange={handleRoleChange} style={{ backgroundColor: '#c79f9f', color: 'black', cursor: 'pointer', width: '100%' }}>
            <option value="Administrador">Administrador</option>
            <option value="Usuario">Usuario</option>
          </select>
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: '#c79f9f', color: 'white', cursor: 'pointer', marginTop: '10px' }}>Crear nuevo Usuario</button>
      </form>
    </div>
  );
};

export default AddUser;

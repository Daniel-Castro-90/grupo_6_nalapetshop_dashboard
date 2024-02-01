import { useState } from 'react';

const ModifUser = () => {
  const [searchInput, setSearchInput] = useState('');
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [editedUser, setEditedUser] = useState({
    email: '',
    password: '',
    image: null,
    dni: '',
    tel: '',
    roles_id: '',
  });

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchUser = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const userData = await response.json();
  
      if (response.ok) {
        setUsers(userData.data);
  
        const foundUser = userData.data.find(
          (user) => user.email === searchInput || user.id === parseInt(searchInput, 10)
        );
  
        if (foundUser) {
          setUser(foundUser);
          setEditedUser({
            email: foundUser.email,
            password: foundUser.password,
            image: null,
            dni: foundUser.dni,
            tel: foundUser.tel,
            roles_id: foundUser.roles_id,
          });
          setUserNotFound(false);
        } else {
          setUser(null);
          setUserNotFound(true);
        }
      } else {
        console.error('Error al buscar usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al buscar usuarios:', error.message);
    }
  };

  const handleEmailChange = (event) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const handleClear = () => {
    setSearchInput('');
    setUser(null);
    setEditedUser({
      email: '',
      password: '',
      image: null,
      dni: '',
      tel: '',
      roles_id: '',
    });
  };

  const handlePasswordChange = (event) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setEditedUser((prevUser) => ({
          ...prevUser,
          image: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDniChange = (event) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      dni: event.target.value,
    }));
  };

  const handleTelChange = (event) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      tel: event.target.value,
    }));
  };

  const handleRoleChange = (event) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      roles_id: event.target.value,
    }));
  };

  // Validaciones
  const validateForm = () => {
    let isValid = true;

    if (!editedUser.email || !editedUser.email.includes('@')) {
      setEmailError('Ingrese un correo electrónico válido.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (editedUser.password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleEditUser = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/edituser/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        console.log('Usuario editado correctamente');
      } else {
        console.error('Error al editar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red al editar el usuario:', error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'black', fontFamily: 'Nunito, sans-serif' }}>
    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', padding: '20px', borderRadius: '8px', textAlign: 'center', margin: '0 auto' }}>
      Modificar Usuario
    </h2>
    <form onSubmit={handleSearchUser} style={{ display: 'inline-grid', marginTop: '20px', textAlign: 'left', margin: '0 auto 10px auto' }}>
      <label>
        <strong>Buscar Usuario por Nombre o ID:&nbsp;</strong>
        <input type="text" placeholder="Ingrese nombre o ID" value={searchInput} onChange={handleSearchInputChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
      </label>
      <br />
      <button type="submit" style={{ backgroundColor: '#c79f9f', color: 'white', cursor: 'pointer', marginTop: '10px' }}>Buscar Usuario</button>
      <button type="button" onClick={handleClear} style={{ backgroundColor: '#c79f9f', color: 'white', cursor: 'pointer', marginTop: '10px', marginLeft: '10px' }}>Limpiar</button>
    </form>

    {userNotFound && <div style={{ color: 'red', marginTop: '10px' }}>Usuario no encontrado</div>}

    {user && (
        <form onSubmit={handleEditUser} style={{ display: 'inline-grid', marginTop: '20px', textAlign: 'left', margin: '0 auto 10px auto' }}>
          <label>
            <strong>Correo Electrónico:&nbsp;</strong>
            <input type="email" placeholder="Ingrese el correo electrónico" value={editedUser.email} onChange={handleEmailChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
            <span style={{ color: 'red' }}>{emailError}</span>
          </label>
          <br />
          <label>
            <strong>Contraseña:&nbsp;</strong>
            <input type="password" placeholder="Ingrese la contraseña" value={editedUser.password} onChange={handlePasswordChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
            <span style={{ color: 'red' }}>{passwordError}</span>
          </label>
          <br />
          <label>
            <strong>Imagen:&nbsp;</strong>
            <input type="file" accept="image/*" name="image" onChange={handleImageChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          </label>
          <br />
          {editedUser.image && <img src={editedUser.image} alt="Vista previa de la imagen" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} />}
          <br />
          <label>
            <strong>DNI:&nbsp;</strong>
            <input type="text" placeholder="Ingrese el DNI" value={editedUser.dni} onChange={handleDniChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          </label>
          <br />
          <label>
            <strong>Teléfono:&nbsp;</strong>
            <input type="text" placeholder="Ingrese el número de teléfono" value={editedUser.tel} onChange={handleTelChange} style={{ backgroundColor: '#c79f9f', color: 'black', width: '100%' }} />
          </label>
          <br />
          <label>
            <strong>Rol:&nbsp;</strong>
            <select value={editedUser.roles_id} onChange={handleRoleChange} style={{ backgroundColor: '#c79f9f', color: 'black', cursor: 'pointer', width: '100%' }}>
              <option value="1">Administrador</option>
              <option value="2">Usuario</option>
            </select>
          </label>
          <br />
          <button type="submit" style={{ backgroundColor: '#c79f9f', color: 'white', cursor: 'pointer', marginTop: '10px' }}>Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default ModifUser;
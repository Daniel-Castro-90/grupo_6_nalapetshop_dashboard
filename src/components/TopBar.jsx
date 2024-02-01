import { useState, useEffect } from 'react';

function TopBar() {
  const [userData, setUserData] = useState(null);

  // Función para obtener el valor de una cookie por su nombre
  const getCookieValue = (cookieName) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };

  const handleLogout = () => {
    // Limpiar la cookie y redirigir al home
    document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = 'http://localhost:3000';
  };

  const goToHome = () => {
    // Redirigir al home
    window.location.href = 'http://localhost:3000';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data...');
      const userId = getCookieValue('user_id');
      console.log('userId:', userId);

      if (userId) {
        try {
          // Realizar la solicitud a la API para obtener todos los usuarios
          const response = await fetch('http://localhost:3000/api/users');
          console.log('Response:', response);

          if (response.ok) {
            const responseData = await response.json();
            console.log('Response Data:', responseData);

            // Verificar que responseData contenga la propiedad 'data' que sea un array
            if (responseData && Array.isArray(responseData.data)) {
              const usersData = responseData.data;
              // Encontrar el usuario con la ID correspondiente
              const user = usersData.find((user) => user.id === parseInt(userId, 10));
              console.log('Found User:', user);

              if (user) {
                setUserData({
                  email: user.email,
                  image: user.image, // Ajusta esto según la estructura de tu JSON
                });
              } else {
                console.error('Usuario no encontrado en la lista completa de usuarios.');
              }
            } else {
              console.error('La respuesta de la API no contiene la propiedad "data" o no es un array.');
            }
          } else {
            console.error('No se pudo obtener la lista completa de usuarios.');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error.message);
        }
      } else {
        console.error('La cookie "user_id" no está presente.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="fa fa-bars"></i>
      </button>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" id="userDropdown">
            <span className="btn btn-link mr-2 d-none d-lg-inline text-gray-600 small" onClick={goToHome}>
            HOME NALA PETSHOP😺
          </span>
            </a>
          </li>
          <div className="topbar-divider d-none d-sm-block"></div>

        {userData && (
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="http://localhost:3000/users" id="userDropdown">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userData.email}</span>
              <img className="img-profile rounded-circle" src={userData.image} alt="User Profile" width="60" />
            </a>
          </li>
        )}
        <div className="topbar-divider d-none d-sm-block"></div>

        <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" id="userDropdown">
            <span className="btn btn-link mr-2 d-none d-lg-inline text-gray-600 small" onClick={handleLogout}>
            Cerrar Sesión
          </span>
            </a>
        </li>
      </ul>
    </nav>
  );
}

export default TopBar;

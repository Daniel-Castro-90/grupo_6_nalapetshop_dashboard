import { useState, useEffect } from 'react';

function AdminMiddleware () {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const userId = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('user_id'))
        ?.split('=')[1];
  
      if (userId) {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            console.log('Response:', response);
  
            if (response.ok) {
              const userData = await response.json();
              console.log('Response Data:', userData);

              if (userData && Array.isArray(userData.data)) {
                const adminData = userData.data;

                const admin = userData.find((admin) => admin.roles_id === parseInt(userId, 10))

                if (admin) {
                    setIsAdmin({
                        user
                    })
                }
              }
  
            setIsAdmin(userData.roles_id === 1);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error.message);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };
  
    checkAdminStatus();
  }, []);

  useEffect(() => {
    // Redirigir según el estado de isAdmin
    if (isAdmin) {
      window.location.href = 'http://localhost:5173';
    } else {
      window.location.href = 'http://localhost:3000';
    }
  }, [isAdmin]);

  return null;
}

export default AdminMiddleware;
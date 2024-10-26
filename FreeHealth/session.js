export const validateSession = async () => {
    try {
      const response = await fetch('http://localhost:3000/session', {
        credentials: 'include',
      });
  
      if (response.ok) {
        const user = await response.json();
        if (user) {
            return true
        }
        return false;
      }
  
    } catch (error) {
      console.error('Error validating session:', error);
    }
  
    return false;
  };
  
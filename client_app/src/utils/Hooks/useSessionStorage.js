export default function () {
  const session = window.sessionStorage;
  
  const getItem = (name) => {
    const value = session.getItem(name);

    if (value) {
      return JSON.parse(value);
    }

    return value;
  };

  const removeItem = (name) => {
    return session.removeItem(name);
  };

  const addItem = (name, value) => {
    return session.addItem(name, value);
  };

  return [getItem, addItem, removeItem];
}
export default function () {
  const session = window.sessionStorage;
  
  const getItem = name => {
    const value = session.getItem(name);

    if (value) {
      return JSON.parse(value);
    }

    return value;
  };

  const removeItem = name => session.removeItem(name);

  const setItem = (name, value) => session.setItem(name, value);

  return [getItem, setItem, removeItem];
}
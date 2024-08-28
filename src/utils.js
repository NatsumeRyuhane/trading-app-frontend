export const login = (credentials) => {
  const loginUrl = `/auth/login`;

  // fetch will return something called a Promise
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  }); // returns a promise
};

// Register a new user (formerly sign up)
export const register = (userData) => {
  const registerUrl = "/auth/register";

  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData), //convert a JavaScript object(userData) into a JSON stirng represtiontation
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Fail to register");
    }
  });
};

export const logout = () => {
  const logoutUrl = "/logout";
  return fetch(logoutUrl, {
    method: "POST",
    credentials: "include",
  }).then((response) => {
    if (response.status !== 204) {
      throw Error("Fail to log out");
    }
  });
};

// Search for items
export const searchItems = (searchParams) => {
  return fetch(`/items?search=${searchParams}`).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to search items");
    }
    return response.json();
  });
};

// View cart contents
export const viewCart = () => {
  return fetch("/cart").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get cart data");
    }
    return response.json();
  });
};

// Upload a new item
export const uploadItem = (itemData) => {
  return fetch("/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(itemData)),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to upload item");
    }
  });
};

// Check out
export const checkout = () => {
  return fetch("/cart/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout");
    }
  });
};

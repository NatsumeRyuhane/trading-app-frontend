export const login = (credentials) => {
    const loginUrl = `/login?username=${credentials.username}&password=${credentials.password}`;
  
    // fetch will return something called a Promise
    return fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw Error("Fail to log in");
      }
    }); // returns a promise
  };
  
// Register a new user (formerly sign up)
export const register = (userData) => {
  const registerUrl = "/register";

  return fetch(registerUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),//convert a JavaScript object(userData) into a JSON stirng represtiontation
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error("Fail to register");
    }
    return response.json();
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
  return fetch("/items/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
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

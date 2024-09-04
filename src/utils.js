import Cookies from "js-cookie";

export const login = (credentials) => {
  const loginUrl = `/auth/login`;

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
    return response.json();
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
  const logoutUrl = "/auth/logout";
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
  return fetch(`/items/search?name=${searchParams}`).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to search items");
    }
    return response.json();
  });
};

export const getCart = () => {
  return fetch("/cart").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
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
  const sessionToken = Cookies.get("sessionToken");

  return fetch("/items", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
    body: itemData,
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

export const getAllItems = () => {
  return fetch("/items").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to fetch items");
    }
    return response.json();
  });
};

//try to get item by id
export const fetchItemById = (itemId) => {
  return fetch(`/items/${itemId}`, {
    method: "GET",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get item");
    }
    return response.json();
  });
};

export const fetchItemsOfCurrentUser = () => {
  const sessionToken = Cookies.get("sessionToken");

  return fetch("/items/mine", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to fetch items");
    }
    return response.json();
  });
};

export const fetchTransactionsAsBuyer = () => {
  const sessionToken = Cookies.get("sessionToken");

  return fetch(`/transactions/buyer`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to fetch transactions");
    }
    return response.json();
  });
};

export const createTransaction = (item) => {
  const sessionToken = Cookies.get("sessionToken");
  const url = `/transactions?${new URLSearchParams({
    sellerId: item.owner.id,
    itemId: item.id,
  }).toString()}`;

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to create transaction");
    }
  });
};

export const publishItem = (id) => {
  const url = `/items/${id}?${new URLSearchParams({
    status: "AVAILABLE",
  })}`;

  fetch(url, {
    method: "PATCH",
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to publish item");
    }
  });
};

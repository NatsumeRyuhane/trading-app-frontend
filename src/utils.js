import Cookies from "js-cookie";
import { message } from "antd";

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

export const fetchCartItems = () => {
  const sessionToken = Cookies.get("sessionToken");

  return fetch("/cart", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
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

export const fetchTransactionById = (transactionId) => {
  const sessionToken = Cookies.get("sessionToken");

  return fetch(`/transactions/${transactionId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to fetch transaction");
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

export const createMultipleTransactions = (items) => {
  try {
    items.forEach((item) => {
      createTransaction(item);
    });
  } catch (e) {
    throw e;
  }
};

export const cancelTransaction = (transactionId) => {
  const sessionToken = Cookies.get("sessionToken");
  const url = `/transactions/${transactionId}/canceled`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to cancel transaction");
    }
  });
};

export const addToCart = (item) => {
  console.log(item);
  const sessionToken = Cookies.get("sessionToken");
  const url = `/cart?${new URLSearchParams({
    itemId: item.id,
  }).toString()}`;

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to add item to cart");
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

export const confirmTransaction = (id) => {
  const sessionToken = Cookies.get("sessionToken");
  const url = `/transactions/${id}/confirmed`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to confirm transaction");
    }
  });
};

export const deleteItem = (id) => {
  const sessionToken = Cookies.get("sessionToken");
  const url = `/items/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Failed to delete item");
    }
  });
};

export const deleteCartItem = (id) => {
  const sessionToken = Cookies.get("sessionToken");
  const url = `/cart/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status >= 300) {
      throw Error("Failed to remove item from shopping cart");
    }
  });
};

export const deleteMultipleCartItems = (ids) => {
  try {
    ids.forEach((id) => {
      deleteCartItem(id);
    });
  } catch (e) {
    throw e;
  }
};

export const fetchItemsByCategory = (category) => {
  return fetch(`/items/category?category=${category}`, {
    method: "GET",
  })
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Failed to fetch items by category");
      }
      return response.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        return []; // Return an empty array if data is not an array
      }
      return data;
    })
    .catch((error) => {
      console.error("Error fetching items by category:", error);
      return []; // Return an empty array in case of error
    });
};

export const rateSeller = (transactionId, rating) => {
  const sessionToken = Cookies.get("sessionToken");
  const url = `/transactions/${transactionId}/rating?rating=${rating}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to rate seller");
    }
  });
};

export const getUserRating = (userId) => {
  const url = `/users/rating?id=${userId}`;

  return fetch(url).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to fetch user rating");
    }
    return response.json();
  });
};

export const getActiveTransactionByItemId = (itemId) => {
  const sessionToken = Cookies.get("sessionToken");

  const url = `/transactions?itemId=${itemId}`;
  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Failed to fetch transaction using item id");
    }
    return response.json();
  });
};

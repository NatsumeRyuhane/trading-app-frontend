import { useLocation } from "react-router-dom";

const ItemDisplayByCategory = () => {
  const location = useLocation();
  const CATEGORY = location.state.category;

  return <div>{CATEGORY}</div>;
};

export default ItemDisplayByCategory;

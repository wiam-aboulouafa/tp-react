import { useEffect, useState } from 'react';

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);                // tous les produits
  const [filteredProducts, setFilteredProducts] = useState([]); // produits filtrés
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchProducts = () => {
    setLoading(true);
    fetch('https://api.daaif.net/products')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des produits');
        return res.json();
      })
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.products || data.data || [];
        setProducts(productArray);
        setFilteredProducts(productArray);
        setCurrentPage(1); // Reset pagination
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔁 Filtrage quand searchTerm change
  useEffect(() => {
    const filtered = !searchTerm
      ? products
      : products.filter((product) =>
          product.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // ✅ Pagination
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    const maxPage = Math.ceil(filteredProducts.length / itemsPerPage);
    if (currentPage < maxPage) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return {
    products: paginatedProducts,
    loading,
    error,
    fetchProducts,
    nextPage,
    prevPage,
    currentPage,
  };
};

export default useProductSearch;
import { useEffect, useState } from 'react';


const useProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const productsPerPage = 30;
    const skip = (currentPage - 1) * productsPerPage;
    try {
      setLoading(true);
      // TODO: Exercice 4.2 - Modifier l'URL pour inclure les paramètres de pagination
      const response = await fetch(
        `https://api.daaif.net/products?delay=1000&limit=${productsPerPage}&skip=${skip}`
      );
      if (!response.ok) throw new Error("Erreur réseau");
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / productsPerPage));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const reloadProducts = () => {
    fetchProducts();
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return {
    products,
    loading,
    error,
    reloadProducts,
    currentPage,
    previousPage,
    nextPage,
    totalPages,
  };
};

export default useProductSearch;
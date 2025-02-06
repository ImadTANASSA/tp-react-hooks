import React, { useContext } from 'react';
import { LanguageContext, ThemeContext } from "../App";
import useProductSearch from "../hooks/useProductSearch";

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const {
    products,
    loading,
    error,
    reloadProducts,
    currentPage,
    totalPages,
    previousPage,
    nextPage,
    // TODO: Exercice 4.1 - Récupérer la fonction de rechargement
    // TODO: Exercice 4.2 - Récupérer les fonctions et états de pagination
  } = useProductSearch(searchTerm);

  if (loading)
    return (
      <div className="text-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">
            {language === "fr" ? "Chargement..." : "Loading..."}
          </span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {language === "fr" ? "Erreur:" : "Error:"} {error}
      </div>
    );

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-primary" onClick={reloadProducts}>
          {language === "fr" ? "Recharger" : "Reload"}
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col">
            <div
              className={`card h-100 ${isDarkTheme ? "bg-dark text-light" : ""
                }`}
            >
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>{language === "fr" ? "Prix:" : "Price:"}</strong>{" "}
                  {product.price}€
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: Exercice 4.2 - Ajouter les contrôles de pagination */}
      {/* Exemple de structure pour la pagination : */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage === 1}
              onClick={previousPage}
            >
              Précédent
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">
              Page {currentPage} sur {totalPages}
            </span>
          </li>
          <li className="page-item">
            <button
              className="page-link"
              disabled={currentPage === totalPages}
              onClick={nextPage}
            >
              Suivant
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
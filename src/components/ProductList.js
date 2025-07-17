import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import useProductSearch from '../hooks/useProductSearch';

const ProductList = ({ searchTerm }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const {
    products,
    loading,
    error,
    fetchProducts,
    nextPage,
    prevPage,
    currentPage,
  } = useProductSearch(searchTerm);

  if (loading) {
    return (
      <div className="text-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Erreur: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3">
        <button className="btn btn-secondary" onClick={prevPage}>← Précédent</button>
        <span>Page {currentPage}</span>
        <button className="btn btn-secondary" onClick={nextPage}>Suivant →</button>
      </div>

      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={fetchProducts}>🔄 Recharger</button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className={`card h-100 ${isDarkTheme ? 'bg-dark text-light' : ''}`}>
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Prix : </strong>
                  {product.price} €
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
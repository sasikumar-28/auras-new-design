import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// TypeScript interfaces
interface ProductCarouselProps {
  keywords?: string;
  onResultsUpdate?: (hasResults: boolean) => void;
}

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  keywords,
  onResultsUpdate,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [responses, setResponses] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageKey, setImageKey] = useState<number>(0); // Add a key to force image refresh

  // Get search term from either route params or passed keywords prop
  const search = searchParams.get("query") || keywords || "";
  
  useEffect(() => {
    if (search) {
      fetchKeywordResultData();
      // Reset current index when search term changes
      setCurrentIndex(0);
      // Update image key to force refresh
      setImageKey(prevKey => prevKey + 1);
    } else {
      // Clear responses if search is empty
      setResponses([]);
      onResultsUpdate?.(false);
    }
  }, [search]);

  const fetchKeywordResultData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    // Don't make API call if search is empty
    if (!search) {
      setLoading(false);
      setResponses([]);
      onResultsUpdate?.(false);
      return;
    }
    
    try {
      console.log(`Searching for products with keyword: "${search}"`);
      
      // Try both methods of API calling
      let response;
      try {
        // Method 1: Using search in URL params
        response = await fetch(`http://localhost:5000/api/search-product?search=${encodeURIComponent(search)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // Add cache-busting parameter
          cache: "no-store"
        });
      } catch (err) {
        console.log("Method 1 failed, trying method 2");
        // Method 2: Using search in headers
        response = await fetch(`http://localhost:5000/api/search-product`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            search: search,
          },
          // Add cache-busting parameter
          cache: "no-store"
        });
      }
      
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      
      const result = await response.json();
      console.log("API Response:", result);
      
      // Check different possible response structures
      let products: Product[] = [];
      
      if (result?.data?.hits && Array.isArray(result.data.hits)) {
        products = result.data.hits;
      } else if (result?.hits && Array.isArray(result.hits)) {
        products = result.hits;
      } else if (Array.isArray(result)) {
        products = result;
      } else if (result?.data && Array.isArray(result.data)) {
        products = result.data;
      } else {
        throw new Error("Unexpected API response format");
      }
      
      if (products.length === 0) {
        console.log("No products found in API response");
      }
      
      setResponses(products);
      onResultsUpdate?.(products.length > 0);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(`Failed to load products: ${error}`);
      setResponses([]);
      onResultsUpdate?.(false);
    } finally {
      setLoading(false);
    }
  };

  const goToNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === responses.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? responses.length - 1 : prevIndex - 1
    );
  };

  // If no keyword is provided, show a helpful message instead of rendering nothing
  if (!search) {
    return (
      <div style={styles.carouselContainer}>
        <div style={styles.noResults}>Please enter a search term to find products</div>
      </div>
    );
  }

  return (
    <div style={styles.carouselContainer}>
      {loading ? (
        <div style={styles.loadingSpinner} />
      ) : (
        <div style={styles.carouselWrapper}>
          {error && <div style={styles.errorMessage}>{error}</div>}
          
          {responses.length > 0 ? (
            <>
              <button
                onClick={goToPrevious}
                style={{...styles.navigationButton, left: "2px"}}
                aria-label="Previous product"
                disabled={responses.length <= 1}
              >
                <ChevronLeft size={24} />
              </button>

              <div style={styles.carouselTrack}>
                {responses.map((product, index) => (
                  <div
                    key={`${product.id || index}-${imageKey}`}
                    style={{
                      ...styles.carouselItem,
                      display: currentIndex === index ? "block" : "none"
                    }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      style={styles.link}
                    >
                      <div style={styles.productCard}>
                        <div style={styles.imageContainer}>
                          {product.image ? (
                            <img
                              key={`img-${imageKey}-${index}`}
                              src={`${product.image}?v=${imageKey}`}
                              alt={product.title}
                              style={styles.productImage}
                              onError={(e) => {
                                // Fallback to placeholder on error
                                e.currentTarget.src = `https://via.placeholder.com/200x150?text=No+Image&v=${imageKey}`;
                              }}
                            />
                          ) : (
                            <div style={styles.placeholderImage}>
                              No Image Available
                            </div>
                          )}
                        </div>
                        <h2 style={styles.productTitle}>
                          {product.title || "Untitled Product"}
                        </h2>
                        <p style={styles.productPrice}>
                          Price: ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price || "N/A"}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <button
                onClick={goToNext}
                style={{ ...styles.navigationButton, right: "2px" }}
                aria-label="Next product"
                disabled={responses.length <= 1}
              >
                <ChevronRight size={24} />
              </button>
              <div style={styles.dotContainer}>
                {responses.map((_, index) => (
                  <button
                    key={`dot-${index}-${imageKey}`}
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      ...styles.dot,
                      backgroundColor:
                        currentIndex === index ? "#007bff" : "#ddd",
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div style={styles.noResults}>No products found for "{search}"</div>
          )}
        </div>
      )}
    </div>
  );
};

// Using type for the styles object
type StylesType = {
  [key: string]: React.CSSProperties;
};

const styles: StylesType = {
  carouselContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "300px",
    margin: "10px auto",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
    border: "1px solid #f0f0f0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  },
  loadingSpinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "150px",
    width: "50px",
    margin: "0 auto",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    padding: "10px",
    fontSize: "14px",
  },
  carouselWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "250px",
  },
  carouselTrack: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  navigationButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    background: "rgba(255, 255, 255, 0.9)",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "background-color 0.3s ease",
  },
  carouselItem: {
    width: "100%",
    transition: "all 0.3s ease-in-out",
  },
  productCard: {
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    width: "100%",
    maxWidth: "250px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "transform 0.2s ease-in-out",
    
  },
  imageContainer: {
    width: "200px",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
    marginBottom: "10px",
  },
  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "4px",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    color: "#666",
    fontSize: "14px",
    borderRadius: "4px",
  },
  productTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    color: "#333",
  },
  productPrice: {
    fontSize: "13px",
    color: "#666",
  },
  noResults: {
    textAlign: "center",
    padding: "20px",
    fontSize: "14px",
    color: "#666",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    display: "block",
  },
  dotContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "-15px",
    left: "0",
    right: "0",
    gap: "6px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    border: "none",
    padding: "0",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default ProductCarousel;
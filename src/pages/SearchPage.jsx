import { useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Backnavbar from "../components/common/Backnavbar";
import ProductExplorer from "../components/product/ProductExplorer";
import { ShoeContext } from "../context/shoeContext";

const SearchPage = () => {
  const { shoes, isLoading } = useContext(ShoeContext);
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const subtitle = useMemo(() => {
    if (!query) {
      return "Browse everything in one place.";
    }
    return `Showing results for “${query}”. Use filters to get the perfect match.`;
  }, [query]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Backnavbar />
      <ProductExplorer
        breadcrumb="Home / Search"
        title="Search"
        description={subtitle}
        products={shoes}
        isLoading={isLoading}
        initialSearch={query}
        emptyStateMessage="We couldn't find anything for that term. Try a different brand or product name."
      />
    </div>
  );
};

export default SearchPage;


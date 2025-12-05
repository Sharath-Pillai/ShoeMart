import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Backnavbar from "../components/common/Backnavbar";
import ProductExplorer from "../components/product/ProductExplorer";
import { ShoeContext } from "../context/shoeContext";

const AllCollectionPage = () => {
  const { shoes, isLoading } = useContext(ShoeContext);
  const [params] = useSearchParams();
  const initialSearch = params.get("q") || params.get("search") || "";

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Backnavbar />
      <ProductExplorer
        breadcrumb="Home / Collections"
        title="All Collections"
        description="Explore every drop from SHOEMART. From daily runners to luxury leather, everything lives here with powerful search, sort and filter controls."
        products={shoes}
        isLoading={isLoading}
        initialSearch={initialSearch}
        emptyStateMessage="No shoes match these filters. Reset them or try another keyword."
      />
    </div>
  );
};

export default AllCollectionPage;

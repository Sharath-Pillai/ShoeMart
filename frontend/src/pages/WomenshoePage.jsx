import { useContext, useMemo } from "react";
import Backnavbar from "../components/common/Backnavbar";
import ProductExplorer from "../components/product/ProductExplorer";
import { ShoeContext } from "../context/shoeContext";

const WomenshoePage = () => {
  const { shoes, isLoading } = useContext(ShoeContext);
  const womenShoes = useMemo(
    () => shoes.filter((shoe) => shoe.gender === "WOMEN"),
    [shoes]
  );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Backnavbar />
      <ProductExplorer
        breadcrumb="Home / Women"
        title="Shoes For Women"
        description="From luxe heels to eco-friendly runners, discover women-first designs with instant filtering, search and sort."
        products={womenShoes}
        isLoading={isLoading}
        emptyStateMessage="No women's products match those filters. Clear a few and try again."
      />
    </div>
  );
};

export default WomenshoePage;

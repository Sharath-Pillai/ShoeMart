import { useContext, useMemo } from "react";
import Backnavbar from "../components/common/Backnavbar";
import ProductExplorer from "../components/product/ProductExplorer";
import { ShoeContext } from "../context/shoeContext";

const MenShoePage = () => {
  const { shoes, isLoading } = useContext(ShoeContext);
  const menShoes = useMemo(
    () => shoes.filter((shoe) => shoe.gender === "MEN"),
    [shoes]
  );

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Backnavbar />
      <ProductExplorer
        breadcrumb="Home / Men"
        title="Shoes For Men"
        description="Daily trainers, weekend-ready casuals and boardroom classics—curated menswear footwear with instant filtering."
        products={menShoes}
        isLoading={isLoading}
        emptyStateMessage="No men's styles match those filters. Try clearing some of them."
      />
    </div>
  );
};

export default MenShoePage;

import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ShoeContext } from "../context/shoeContext";
import ProductCard from "../components/product/ProductCard";
import SkeletonCard from "../components/product/SkeletonCard";

function Home() {
  const { shoes, isLoading } = useContext(ShoeContext);
  const bestSellers = useMemo(() => shoes.slice(0, 3), [shoes]);
  const newArrivals = useMemo(() => shoes.slice(3, 6), [shoes]);

  return (
    <>
      <div className="px-6 m-0 bg-white">
        {/* Hero Section */}
        <section className="relative w-full max-w-7xl mx-auto px-4 md:px-0">
          <div
            className="h-[400px] sm:h-[500px] md:h-[700px] w-full bg-cover bg-center flex items-center relative overflow-hidden rounded-3xl mt-6 shadow-2xl"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative px-6 sm:px-8 md:pl-16 text-white max-w-2xl z-10">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight mb-4 md:mb-6 drop-shadow-xl tracking-tight">
                Love the Planet <br /> we walk on
              </h1>
              <p className="text-base sm:text-lg md:text-2xl mb-8 md:mb-10 font-medium text-gray-100 drop-shadow-md">
                Discover the latest arrivals from Recycled.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menshoelist">
                  <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Shop Men
                  </button>
                </Link>
                <Link to="/womenshoelist">
                  <button className="bg-black/30 backdrop-blur-md text-white border border-white/50 px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Shop Women
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* As Seen In Section (Hidden on mobile) */}
        <div className="hidden md:block">
          <section className="flex items-center justify-around py-8 gap-4 max-w-7xl mx-auto">
            <p className="font-medium text-gray-500">As seen in:</p>
            {[
              "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-5.svg",
              "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-4.svg",
              "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-3.svg",
              "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-2.svg",
              "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-1.svg",
            ].map((src, i) => (
              <img key={i} src={src} alt={`featured-${i}`} className="h-14 opacity-60 hover:opacity-100 transition-opacity" />
            ))}
          </section>
          <hr className="border-gray-200 max-w-7xl mx-auto mb-10" />
        </div>

        {/* Best Sellers */}
        <section className="pt-20 max-w-7xl mx-auto px-4 md:px-0">
          <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">Our Best Sellers</h2>
              <p className="mt-2 text-gray-500 font-medium">Most popular choices among planet lovers.</p>
            </div>
            <Link
              to="/allcollections"
              className="text-orange-500 font-bold uppercase tracking-wider text-sm hover:text-orange-600 transition-colors duration-300 group flex items-center gap-2"
            >
              View All <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {bestSellers.map((shoe) => (
                <ProductCard key={shoe.id} product={shoe} />
              ))}
            </div>
          )}
        </section>

        {/* Double Banner Section shop men & women */}
        <section className="flex flex-col md:flex-row items-center gap-6 my-24 max-w-7xl mx-auto px-4 md:px-0">
          <div
            className="group relative h-[300px] sm:h-[400px] md:h-[500px] w-full md:w-1/2 bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 sm:p-8 z-10">
              <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight drop-shadow-md">Men's Collection</h2>
              <Link to="/menshoelist">
                <button className="bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide uppercase hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Shop Men
                </button>
              </Link>
            </div>
          </div>

          <div
            className="group relative h-[300px] sm:h-[400px] md:h-[500px] w-full md:w-1/2 bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 sm:p-8 z-10">
              <h2 className="text-white font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight drop-shadow-md">Women's Collection</h2>
              <Link to="/womenshoelist">
                <button className="bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide uppercase hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Shop Women
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className=" max-w-7xl mx-auto px-4 md:px-0 mb-12">
          <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">New Arrivals</h2>
              <p className="mt-2 text-gray-500 font-medium">Fresh styles just dropped in store.</p>
            </div>
            <Link
              to="/allcollections"
              className="text-orange-500 font-bold uppercase tracking-wider text-sm hover:text-orange-600 transition-colors duration-300 group flex items-center gap-2"
            >
              View All <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {newArrivals.map((shoe) => (
                <ProductCard key={shoe.id} product={shoe} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default Home;

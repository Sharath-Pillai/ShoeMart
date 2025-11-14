import { useEffect, useState } from "react";
import { Link } from "react-router";

function Home() {
  const [shoelist, setShoelist] = useState("");

  useEffect(() => {
    fetch("/shoeDetails.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network responce was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setShoelist(data);
      })
      .catch((error) => {
        console.log("fetch error", error);
      });
  }, []);

  return (
    <>
      <div className="px-12 m-0 bg-white">
        {/* Hero Section */}
        <section className="relative">
          <div
            className="h-[700px] w-full bg-cover bg-center flex items-center my-2"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <div className="pl-12 text-white max-w-lg">
              <h1 className="text-5xl font-bold leading-tight mb-4">
                Love the Planet <br /> we walk on
              </h1>
              <p className="text-lg mb-6 font-semibold">
                Discover the latest arrivals from Recycled.
              </p>
              <div className="flex gap-4">
                <Link to="/menshoelist">
                  <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
                    Shop Men
                  </button>
                </Link>
                <Link to="/womenshoelist">
                  <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
                    Shop Women
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* As Seen In Section */}
        <section className="flex items-center justify-around py-8 gap-4 max-w-7xl mx-auto">
          <p>As seen in:</p>
          {[
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-5.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-4.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-3.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-2.svg",
            "https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-1.svg",
          ].map((src, i) => (
            <img key={i} src={src} alt={`featured-${i}`} className="h-30" />
          ))}
        </section>
        <hr className=" border-gray-300 max-w-7xl mx-auto" />

        {/* Best Sellers */}
        <section className="py-16 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Our Best Sellers</h2>
            <Link
              to="/allcollections"
              className="text-gray-600 font-bold underline decoration-2 decoration-amber-400 hover:decoration-black underline-offset-4 transition-colors duration-300"
            >
              View All Best Sellers
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* {shoelist.map((shoes,index)=>{

          })

          } */}

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white shadow rounded-lg p-4 text-center"
              >
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt={`shoe${i}`}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className="font-semibold mb-1">Product {i}</h3>
                <p className="text-gray-500 mb-1">$99.99</p>
                <p className="text-yellow-500">★★★★☆</p>
              </div>
            ))}
          </div>
        </section>

        {/* Double Banner Section shop men & women */}
        <section className="flex flex-col md:flex-row items-center  my-20 justify-between w-full mx-auto  ">
          <div
            className="h-[700px] w-[48%] bg-cover bg-center flex flex-col gap-8 justify-center items-center"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <h1 className="text-white font-bold text-2xl">Men</h1>
            <Link to="/menshoelist">
              <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
                Shop Men
              </button>
            </Link>
          </div>

          <div
            className="h-[700px] w-[48%] bg-cover bg-center flex flex-col gap-8 justify-center items-center"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <h1 className="text-white font-bold text-2xl">Women</h1>
            <Link to="/womenshoelist">
              <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
                Shop Women
              </button>
            </Link>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <Link
              to="/allcollections"
              className="text-gray-600 font-bold underline decoration-2 decoration-amber-400 hover:decoration-black underline-offset-4 transition-colors duration-300"
            >
              View All New Arrivals
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white shadow rounded-lg p-4 text-center"
              >
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt={`shoe${i}`}
                  className="w-full h-64 object-cover mb-4"
                />
                <h3 className="font-semibold mb-1">Product {i}</h3>
                <p className="text-gray-500 mb-1">$99.99</p>
                <p className="text-yellow-500">★★★★☆</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

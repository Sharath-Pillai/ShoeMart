// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import "./index.css";
import Header from "./components/common/Header";
import Toppromobar from "./components/common/Toppromobar";
function App() {
  return (
    // <>
    //   <p className="bg-gray-100 text-center text-xs py-2 text-gray-400">
    //     Free Express Shipping on all orders with all duties included
    //   </p>
    //   <div className="px-[50px] m-0 bg-white">
    //     <div className="main-container">
    //       <header className="flex justify-between py-[30px]">
    //         <div className="left-header flex gap-5">
    //           <div className="logo">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/site-logo.svg"
    //               alt="logo"
    //             />
    //           </div>
    //           <div>
    //             <ul className="flex gap-5 text-gray-400">
    //               <li className="hover:text-black">MEN</li>
    //               <li className="hover:text-black">WOMEN</li>
    //               <li className="hover:text-black">COLLECTION</li>
    //               <li className="hover:text-black">LOOKBOOK</li>
    //               <li className="hover:text-black">SALE</li>
    //             </ul>
    //           </div>
    //         </div>
    //         <div className="right-header">
    //           <div>
    //             <ul className="flex gap-5 text-gray-400">
    //               <li className="hover:text-black">OUR STORY</li>
    //               <li className="hover:text-black">CONTACT</li>
    //               <li className="hover:text-black"></li>
    //               <li className="hover:text-black"></li>
    //             </ul>
    //           </div>
    //         </div>
    //       </header>

    //       <section className="hero">
    //         <div className="banner bg-[url('/background-Images/bannerinmainsection.jpg')] bg-cover  bg-center h-[900px] w-full flex items-center ">
    //           <div className="banner-text pl-30 text-white ">
    //             <h1 className="text-[48px] font-bold">
    //               Love the Planet <br /> we walk on
    //             </h1>
    //             <p className="text-sm mb-10 font-bold">
    //               Discover the latest arrivals from Recycled.
    //             </p>
    //             <div className="flex gap-5">
    //               <button className="bg-white p-3 text-black">
    //                 SHOP MEN
    //               </button>
    //               <button className="bg-white p-3 text-black ">
    //                 SHOP WOMEN
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </section>
    //     </div>

    //     <div className="section1-container">
    //       <div>
    //         <h2>As seen in:</h2>
    //         <img
    //           src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-5.svg"
    //           alt=""
    //         />
    //         <img
    //           src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-4.svg"
    //           alt=""
    //         />
    //         <img
    //           src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-3.svg"
    //           alt=""
    //         />
    //         <img
    //           src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-2.svg"
    //           alt=""
    //         />
    //         <img
    //           src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-1.svg"
    //           alt=""
    //         />
    //       </div>
    //       <div className="aboutus">
    //         <div className="left-aboutsection">
    //           <img
    //             src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg"
    //             alt="aboutusimage"
    //           />
    //         </div>
    //         <div className="right-aboutsection">
    //           <h2>About Us</h2>
    //           <h1>
    //             Selected materials designed for comfort and sustainability
    //           </h1>
    //           <p>
    //             Nullam auctor faucibus ridiculus dignissim sed et auctor sed
    //             eget auctor nec sed elit nunc, magna non urna amet ac neque ut
    //             quam enim pretium risus gravida ullamcorper adipiscing at ut
    //             magna.
    //           </p>
    //           <a href="">READ MORE</a>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       className="section2-container bg-gray-400"
    //       backgroundImage="url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-how-shoes-are-made-image.png')"
    //     >
    //       <h1>See how your shoes are made</h1>
    //       <p>
    //         Urna, felis enim orci accumsan urna blandit egestas mattis egestas
    //         feugiat viverra ornare donec adipiscing semper aliquet integer risus
    //         leo volutpat nulla enim ultrices
    //       </p>
    //       <div className="process-steps">
    //         <div className="process-left">
    //           <div>
    //             <p>01</p>
    //             <h3>Pet canvas</h3>
    //             <p>
    //               Morbi eget bibendum sit adipiscing morbi ac nisl vitae
    //               maecenas nulla cursus
    //             </p>
    //           </div>
    //           <div>
    //             <p>02</p>
    //             <h3>Algae foam + vegan glue</h3>
    //             <p>Enim tincidunt donec vulputate magna pharetra mattis in</p>
    //           </div>
    //         </div>
    //         <div className="process-right">
    //           <div>
    //             <p>03</p>
    //             <h3>Organic cotton</h3>
    //             <p>A vel ipsum, sed dignissim elementum ultrices amet</p>
    //           </div>
    //           <div>
    //             <p>04</p>
    //             <h3>Upcycled plastic bottles</h3>
    //             <p>
    //               Pellentesque viverra amet netus facilisis amet felis odio
    //               tortor orci cursus est
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section3-container">
    //       <div className="our-best-seller">
    //         <div className="title">
    //           <h2>Our Best Sellers</h2>
    //           <a href="">VIEW ALL BEST SELLERS</a>
    //         </div>
    //         <div className="card-container">
    //           <div className="card">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
    //               alt="shoe1"
    //             />
    //             <h3>Title</h3>
    //             <p>price</p>
    //             <p>rating</p>
    //           </div>
    //           <div className="card">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
    //               alt="shoe1"
    //             />
    //             <h3>Title</h3>
    //             <p>price</p>
    //             <p>rating</p>
    //           </div>
    //           <div className="card">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
    //               alt="shoe1"
    //             />
    //             <h3>Title</h3>
    //             <p>price</p>
    //             <p>rating</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section4-container">
    //       <div className="shopmen-women">
    //         <div className="shop-men bg-[url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg')] w-[500px] h-[600px]">
    //           <h2>Men</h2>
    //           <button>SHOP MEN</button>
    //         </div>
    //         <div className="shop-women bg-[url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg')] w-[500px] h-[600px]">
    //           <h2>Women</h2>
    //           <button>SHOP MEN</button>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section5-container">
    //       <div className="New Arrivals">
    //         <div className="title">
    //           <h2>New Arrivals</h2>
    //           <a href="">VIEW ALL NEW ARRIVALS</a>
    //         </div>
    //         <div className="card-container">
    //           <div className="card">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
    //               alt="shoe1"
    //             />
    //             <h3>Title</h3>
    //             <p>price</p>
    //             <p>rating</p>
    //           </div>
    //           <div className="card">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
    //               alt="shoe1"
    //             />
    //             <h3>Title</h3>
    //             <p>price</p>
    //             <p>rating</p>
    //           </div>
    //           <div className="card">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
    //               alt="shoe1"
    //             />
    //             <h3>Title</h3>
    //             <p>price</p>
    //             <p>rating</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section6-container">
    //       <div className="certified flex">
    //         <div className="certified-left">
    //           <p>
    //             Eu eget felis erat mauris aliquam mattis lacus, arcu leo aliquam
    //             sapien pulvinar laoreet vulputate sem aliquet phasellus egestas
    //             felis, est, vulputate morbi massa mauris vestibulum dui odio.
    //           </p>
    //           <div className="badges flex">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-3.svg"
    //               alt=""
    //             />
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-2.svg"
    //               alt=""
    //             />
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
    //               alt=""
    //             />
    //           </div>
    //         </div>
    //         <div className="certified-right w-[200px] h-[200px] rounded ">
    //           <img
    //             src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-recycled-circle-iamge.jpg"
    //             alt=""
    //           />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section7-container">
    //       <h1>Our Customers speak for us</h1>
    //       <div className="comment-card flex">
    //         <div className="card">
    //           <p>rating</p>
    //           <p>
    //             “Felis semper duis massa scelerisque ac amet porttitor ac tellus
    //             venenatis aliquam varius mauris integer”
    //           </p>
    //           <div className="flex">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
    //               alt=""
    //             />
    //             <h3>John Doe</h3>
    //           </div>
    //         </div>
    //         <div className="card">
    //           <p>rating</p>
    //           <p>
    //             “Felis semper duis massa scelerisque ac amet porttitor ac tellus
    //             venenatis aliquam varius mauris integer”
    //           </p>
    //           <div className="flex">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
    //               alt=""
    //             />
    //             <h3>John Doe</h3>
    //           </div>
    //         </div>
    //         <div className="card">
    //           <p>rating</p>
    //           <p>
    //             “Felis semper duis massa scelerisque ac amet porttitor ac tellus
    //             venenatis aliquam varius mauris integer”
    //           </p>
    //           <div className="flex">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
    //               alt=""
    //             />
    //             <h3>John Doe</h3>
    //           </div>
    //         </div>
    //       </div>
    //       <p>4.8 average rating from 1814 reviews</p>
    //     </div>
    //     <div className="section8-container">
    //       <div className="bannershopmen-women">
    //         <div className="shop-men bg-[url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg')] w-[500px] h-[600px]">
    //           <h1>Better for People & the Planet</h1>
    //           <p>
    //             Ut eget at et aliquam sit quis nisl, pharetra et ac pharetra est
    //             dictum in vulputate
    //           </p>
    //           <div>
    //             <button>SHOP MEN</button>
    //             <button>SHOP MEN</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section9-container">
    //       <div className="securepayment flex">
    //         <p>Secure Payment</p>
    //         <p>Express Shipping</p>
    //         <p>Free Return</p>
    //       </div>
    //       <hr />
    //       <div className="footer-links flex">
    //         <div>
    //           <img
    //             src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/site-logo.svg"
    //             alt=""
    //           />
    //           <p>
    //             Praesent eget tortor sit risus egestas nulla pharetra ornare
    //             quis bibendum est bibendum sapien proin nascetur
    //           </p>
    //           <div className="social-icons flex">
    //             <img src="" alt="icon" />
    //             <img src="" alt="icon" />
    //             <img src="" alt="icon" />
    //             <img src="" alt="icon" />
    //           </div>
    //         </div>
    //         <div>
    //           <h1>Shop</h1>
    //           <div>
    //             <ul>
    //               <li>Shop Men</li>
    //               <li>Shop Women</li>
    //               <li>Lookbook</li>
    //               <li>Gift Card</li>
    //               <li>Sale</li>
    //             </ul>
    //           </div>
    //         </div>
    //         <div>
    //           <h1>About</h1>
    //           <div>
    //             <ul>
    //               <li>Our Story</li>
    //               <li>Our Materials</li>
    //               <li>Our Value</li>
    //               <li>Sustainability</li>
    //               <li>Manufacture</li>
    //             </ul>
    //           </div>
    //         </div>
    //         <div>
    //           <h1>Need Help?</h1>
    //           <div>
    //             <ul>
    //               <li>FAQs</li>
    //               <li>Shipping & Returns</li>
    //               <li>Shoe Care</li>
    //               <li>Size Chart</li>
    //               <li>Contact Us</li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="section10-container">
    //       <div className="footer flex justify-between">
    //         <div className="left-footer">
    //           <p>© 2025 Recycled Shoe Store. Powered by Recycled Shoe Store.</p>
    //         </div>
    //         <div className="right-footer">
    //           <div className="payment-card flex">
    //             <img
    //               src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/payment-icons.png"
    //               alt=""
    //             />
    //           </div>
    //         </div>
    //       </div>
    //       <p>4.8 average rating from 1814 reviews</p>
    //     </div>
    //   </div>
    // </>
    <>
      {/* Top Promo Bar */}
      <Toppromobar />
      <div className="px-12 m-0 bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative">
          <div
            className="h-[700px] w-full bg-cover bg-center flex items-center"
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
                <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
                  Shop Men
                </button>
                <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
                  Shop Women
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* As Seen In Section */}
        <section className="flex items-center justify-around py-8 gap-4 max-w-screen-xl mx-auto">
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
        <hr className=" border-gray-300 max-w-screen-xl mx-auto" />

        {/* About Us Section */}
        <section className="flex flex-col md:flex-row items-center py-22 justify-between max-w-screen-xl mx-auto">
          <div className="flex-1 max-w-[600px]">
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg"
              alt="about us"
              className="rounded-lg"
            />
          </div>

          <div className="flex-1 max-w-[600px] ">
            <h2 className="text-lg font-semibold mb-6 text-orange-400">
              About Us
            </h2>
            <h1 className="text-5xl font-bold mb-6 tracking-wide">
              Selected materials designed for comfort and sustainability
            </h1>
            <p className="text-gray-600 mb-12 text-xl">
              Nullam auctor faucibus ridiculus dignissim sed et auctor sed eget
              auctor nec sed elit nunc, magna non urna amet ac neque ut quam
              enim pretium risus gravida ullamcorper adipiscing at ut magna.
            </p>
            <a
              href="#"
              className="text-black font-semibold  underline decoration-orange-300 decoration-2 underline-offset-4 hover:decoration-black transition-colors duration-30"
            >
              READ MORE
            </a>
          </div>
        </section>

        {/* how to made */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">
              See how your shoes are made
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mb-16">
              Urna, felis enim orci accumsan urna blandit egestas mattis egestas
              feugiat viverra ornare donec adipiscing semper aliquet integer
              risus leo volutpat nulla enim ultrices.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16">
              {/* Left side steps */}
              <div className="flex flex-col gap-12 text-left">
                <div>
                  <p className="text-orange-400 font-bold text-sm mb-1">01.</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Pet canvas
                  </h3>
                  <p className="text-gray-500 max-w-xs">
                    Morbi eget bibendum sit adipiscing morbi ac nisl vitae
                    maecenas nulla cursus.
                  </p>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <p className="text-orange-400 font-bold text-sm mb-1">02.</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Algae foam + vegan glue
                  </h3>
                  <p className="text-gray-500 max-w-xs">
                    Enim tincidunt donec vulputate magna pharetra mattis in.
                  </p>
                </div>
              </div>

              {/* Center shoe image */}
              <div className="relative">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-how-shoes-are-made-image.png"
                  alt="Shoe diagram"
                  className="w-[450px] mx-auto"
                />
              </div>

              {/* Right side steps */}
              <div className="flex flex-col gap-12 text-left">
                <div>
                  <p className="text-orange-400 font-bold text-sm mb-1">03.</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Organic cotton
                  </h3>
                  <p className="text-gray-500 max-w-xs">
                    A vel ipsum, sed dignissim elementum ultrices amet.
                  </p>
                </div>
                <hr className="border-gray-200" />
                <div>
                  <p className="text-orange-400 font-bold text-sm mb-1">04.</p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Upcycled plastic bottles
                  </h3>
                  <p className="text-gray-500 max-w-xs">
                    Pellentesque viverra amet netus facilisis amet felis odio
                    tortor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Our Best Sellers</h2>
            <a
              href="#"
              className="text-gray-600 font-bold underline decoration-2 decoration-amber-400 hover:decoration-black underline-offset-4 transition-colors duration-300"
            >
              View All Best Sellers
            </a>
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
            <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
              Shop Men
            </button>
          </div>

          <div
            className="h-[700px] w-[48%] bg-cover bg-center flex flex-col gap-8 justify-center items-center"
            style={{
              backgroundImage:
                "url('/background-Images/bannerinmainsection.jpg')",
            }}
          >
            <h1 className="text-white font-bold text-2xl">Women</h1>
            <button className="bg-white text-black px-5 py-3 font-semibold hover:bg-gray-200">
              Shop Women
            </button>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="py-16 max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <a
              href="#"
              className="text-gray-600 font-bold underline decoration-2 decoration-amber-400 hover:decoration-black underline-offset-4 transition-colors duration-300"
            >
              View All New Arrivals
            </a>
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

        {/* Certifications */}



        

        {/* Footer */}
        <footer className="bg-gray-100 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-12">
            <div className="flex-1">
              <img
                src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/site-logo.svg"
                alt="logo"
                className="mb-4"
              />
              <p className="text-gray-600 mb-4">
                Praesent eget tortor sit risus egestas nulla pharetra ornare
                quis bibendum est bibendum sapien proin nascetur
              </p>
              <div className="flex gap-3">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="facebook"
                  className="w-6 h-6"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                  alt="twitter"
                  className="w-6 h-6"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="instagram"
                  className="w-6 h-6"
                />
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Shop</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Shop Men</li>
                  <li>Shop Women</li>
                  <li>Lookbook</li>
                  <li>Gift Card</li>
                  <li>Sale</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Our Story</li>
                  <li>Our Materials</li>
                  <li>Our Value</li>
                  <li>Sustainability</li>
                  <li>Manufacture</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>FAQs</li>
                  <li>Shipping & Returns</li>
                  <li>Shoe Care</li>
                  <li>Size Chart</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © 2025 Recycled Shoe Store. Powered by Shoe Mart.
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;

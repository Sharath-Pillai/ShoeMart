// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import "./index.css";

function App() {
  return (
    <>
      <p className="bg-gray-100 text-center text-xs py-2 text-gray-400">
        Free Express Shipping on all orders with all duties included
      </p>
      <div className="px-[50px] m-0 bg-white">
        <div className="main-container">
          <header className="flex justify-between py-[30px]">
            <div className="left-header flex gap-5">
              <div className="logo">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/site-logo.svg"
                  alt="logo"
                />
              </div>
              <div>
                <ul className="flex gap-5 text-gray-400">
                  <li className="hover:text-black">MEN</li>
                  <li className="hover:text-black">WOMEN</li>
                  <li className="hover:text-black">COLLECTION</li>
                  <li className="hover:text-black">LOOKBOOK</li>
                  <li className="hover:text-black">SALE</li>
                </ul>
              </div>
            </div>
            <div className="right-header">
              <div>
                <ul className="flex gap-5 text-gray-400">
                  <li className="hover:text-black">OUR STORY</li>
                  <li className="hover:text-black">CONTACT</li>
                  <li className="hover:text-black"></li>
                  <li className="hover:text-black"></li>
                </ul>
              </div>
            </div>
          </header>

          <section className="hero">
            <div className="banner bg-[url('/background-Images/bannerinmainsection.jpg')] bg-cover  bg-center h-[900px] w-full flex items-center ">
              <div className="banner-text pl-30 text-white ">
                <h1 className="text-[48px] font-bold">
                  Love the Planet <br /> we walk on
                </h1>
                <p className="text-sm mb-10 font-bold">
                  Discover the latest arrivals from Recycled.
                </p>
                <div className="flex gap-5">
                  <button className="bg-white p-3 text-black">
                    SHOP MEN
                  </button>
                  <button className="bg-white p-3 text-black ">
                    SHOP WOMEN
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="section1-container">
          <div>
            <h2>As seen in:</h2>
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-5.svg"
              alt=""
            />
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-4.svg"
              alt=""
            />
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-3.svg"
              alt=""
            />
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-2.svg"
              alt=""
            />
            <img
              src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-featured-in-logo-1.svg"
              alt=""
            />
          </div>
          <div className="aboutus">
            <div className="left-aboutsection">
              <img
                src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg"
                alt="aboutusimage"
              />
            </div>
            <div className="right-aboutsection">
              <h2>About Us</h2>
              <h1>
                Selected materials designed for comfort and sustainability
              </h1>
              <p>
                Nullam auctor faucibus ridiculus dignissim sed et auctor sed
                eget auctor nec sed elit nunc, magna non urna amet ac neque ut
                quam enim pretium risus gravida ullamcorper adipiscing at ut
                magna.
              </p>
              <a href="">READ MORE</a>
            </div>
          </div>
        </div>
        <div
          className="section2-container bg-gray-400"
          backgroundImage="url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-how-shoes-are-made-image.png')"
        >
          <h1>See how your shoes are made</h1>
          <p>
            Urna, felis enim orci accumsan urna blandit egestas mattis egestas
            feugiat viverra ornare donec adipiscing semper aliquet integer risus
            leo volutpat nulla enim ultrices
          </p>
          <div className="process-steps">
            <div className="process-left">
              <div>
                <p>01</p>
                <h3>Pet canvas</h3>
                <p>
                  Morbi eget bibendum sit adipiscing morbi ac nisl vitae
                  maecenas nulla cursus
                </p>
              </div>
              <div>
                <p>02</p>
                <h3>Algae foam + vegan glue</h3>
                <p>Enim tincidunt donec vulputate magna pharetra mattis in</p>
              </div>
            </div>
            <div className="process-right">
              <div>
                <p>03</p>
                <h3>Organic cotton</h3>
                <p>A vel ipsum, sed dignissim elementum ultrices amet</p>
              </div>
              <div>
                <p>04</p>
                <h3>Upcycled plastic bottles</h3>
                <p>
                  Pellentesque viverra amet netus facilisis amet felis odio
                  tortor orci cursus est
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section3-container">
          <div className="our-best-seller">
            <div className="title">
              <h2>Our Best Sellers</h2>
              <a href="">VIEW ALL BEST SELLERS</a>
            </div>
            <div className="card-container">
              <div className="card">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt="shoe1"
                />
                <h3>Title</h3>
                <p>price</p>
                <p>rating</p>
              </div>
              <div className="card">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt="shoe1"
                />
                <h3>Title</h3>
                <p>price</p>
                <p>rating</p>
              </div>
              <div className="card">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt="shoe1"
                />
                <h3>Title</h3>
                <p>price</p>
                <p>rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section4-container">
          <div className="shopmen-women">
            <div className="shop-men bg-[url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg')] w-[500px] h-[600px]">
              <h2>Men</h2>
              <button>SHOP MEN</button>
            </div>
            <div className="shop-women bg-[url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg')] w-[500px] h-[600px]">
              <h2>Women</h2>
              <button>SHOP MEN</button>
            </div>
          </div>
        </div>
        <div className="section5-container">
          <div className="New Arrivals">
            <div className="title">
              <h2>New Arrivals</h2>
              <a href="">VIEW ALL NEW ARRIVALS</a>
            </div>
            <div className="card-container">
              <div className="card">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt="shoe1"
                />
                <h3>Title</h3>
                <p>price</p>
                <p>rating</p>
              </div>
              <div className="card">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt="shoe1"
                />
                <h3>Title</h3>
                <p>price</p>
                <p>rating</p>
              </div>
              <div className="card">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-product-image-006-600x600.jpg"
                  alt="shoe1"
                />
                <h3>Title</h3>
                <p>price</p>
                <p>rating</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section6-container">
          <div className="certified flex">
            <div className="certified-left">
              <p>
                Eu eget felis erat mauris aliquam mattis lacus, arcu leo aliquam
                sapien pulvinar laoreet vulputate sem aliquet phasellus egestas
                felis, est, vulputate morbi massa mauris vestibulum dui odio.
              </p>
              <div className="badges flex">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-3.svg"
                  alt=""
                />
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-2.svg"
                  alt=""
                />
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="certified-right w-[200px] h-[200px] rounded ">
              <img
                src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-recycled-circle-iamge.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="section7-container">
          <h1>Our Customers speak for us</h1>
          <div className="comment-card flex">
            <div className="card">
              <p>rating</p>
              <p>
                “Felis semper duis massa scelerisque ac amet porttitor ac tellus
                venenatis aliquam varius mauris integer”
              </p>
              <div className="flex">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
                  alt=""
                />
                <h3>John Doe</h3>
              </div>
            </div>
            <div className="card">
              <p>rating</p>
              <p>
                “Felis semper duis massa scelerisque ac amet porttitor ac tellus
                venenatis aliquam varius mauris integer”
              </p>
              <div className="flex">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
                  alt=""
                />
                <h3>John Doe</h3>
              </div>
            </div>
            <div className="card">
              <p>rating</p>
              <p>
                “Felis semper duis massa scelerisque ac amet porttitor ac tellus
                venenatis aliquam varius mauris integer”
              </p>
              <div className="flex">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-badge-1.svg"
                  alt=""
                />
                <h3>John Doe</h3>
              </div>
            </div>
          </div>
          <p>4.8 average rating from 1814 reviews</p>
        </div>
        <div className="section8-container">
          <div className="bannershopmen-women">
            <div className="shop-men bg-[url('https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/recycled-shoe-store-home-about-image.jpg')] w-[500px] h-[600px]">
              <h1>Better for People & the Planet</h1>
              <p>
                Ut eget at et aliquam sit quis nisl, pharetra et ac pharetra est
                dictum in vulputate
              </p>
              <div>
                <button>SHOP MEN</button>
                <button>SHOP MEN</button>
              </div>
            </div>
          </div>
        </div>
        <div className="section9-container">
          <div className="securepayment flex">
            <p>Secure Payment</p>
            <p>Express Shipping</p>
            <p>Free Return</p>
          </div>
          <hr />
          <div className="footer-links flex">
            <div>
              <img
                src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/site-logo.svg"
                alt=""
              />
              <p>
                Praesent eget tortor sit risus egestas nulla pharetra ornare
                quis bibendum est bibendum sapien proin nascetur
              </p>
              <div className="social-icons flex">
                <img src="" alt="icon" />
                <img src="" alt="icon" />
                <img src="" alt="icon" />
                <img src="" alt="icon" />
              </div>
            </div>
            <div>
              <h1>Shop</h1>
              <div>
                <ul>
                  <li>Shop Men</li>
                  <li>Shop Women</li>
                  <li>Lookbook</li>
                  <li>Gift Card</li>
                  <li>Sale</li>
                </ul>
              </div>
            </div>
            <div>
              <h1>About</h1>
              <div>
                <ul>
                  <li>Our Story</li>
                  <li>Our Materials</li>
                  <li>Our Value</li>
                  <li>Sustainability</li>
                  <li>Manufacture</li>
                </ul>
              </div>
            </div>
            <div>
              <h1>Need Help?</h1>
              <div>
                <ul>
                  <li>FAQs</li>
                  <li>Shipping & Returns</li>
                  <li>Shoe Care</li>
                  <li>Size Chart</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="section10-container">
          <div className="footer flex justify-between">
            <div className="left-footer">
              <p>© 2025 Recycled Shoe Store. Powered by Recycled Shoe Store.</p>
            </div>
            <div className="right-footer">
              <div className="payment-card flex">
                <img
                  src="https://websitedemos.net/recycled-shoe-store/wp-content/uploads/sites/983/2021/11/payment-icons.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <p>4.8 average rating from 1814 reviews</p>
        </div>
      </div>
    </>
  );
}

export default App;

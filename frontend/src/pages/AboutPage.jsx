import Backnavbar from "../components/common/Backnavbar";

const About = () => {
  return (
    <>
    {/* Top nav / breadcrumbs */}
            <Backnavbar/>
      {/* About Us Section */}
      <section className="flex flex-col md:flex-row items-center py-22 justify-between max-w-7xl mx-auto">
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
            auctor nec sed elit nunc, magna non urna amet ac neque ut quam enim
            pretium risus gravida ullamcorper adipiscing at ut magna.
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
            feugiat viverra ornare donec adipiscing semper aliquet integer risus
            leo volutpat nulla enim ultrices.
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
    </>
  );
};

export default About;

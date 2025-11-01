export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Contact
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 px-4 md:px-8">
        {/* Left Contact Info */}
        <div className="bg-gray-100 p-10 rounded-lg w-full md:w-1/3">
          <div className="space-y-8 text-gray-700">
            {/* Products & order */}
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>📦</span> Products & order
              </h3>
              <p className="text-sm mt-1 text-gray-500">(+1) 123-456-7890</p>
              <p className="text-sm text-gray-400">available 24/7</p>
            </div>

            {/* Info & enquiries */}
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>📧</span> Info & enquiries
              </h3>
              <p className="text-sm mt-1 text-gray-500">(+1) 123-456-7890</p>
              <p className="text-sm text-gray-400">available 24/7</p>
            </div>

            {/* Store locator */}
            <div>
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span>📍</span> Store locator
              </h3>
              <p className="text-sm mt-1 text-gray-500">
                Find our retail near you
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-3">Stay in touch</p>
              <div className="flex gap-4 text-gray-600 text-xl">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-white p-10 rounded-lg shadow-sm w-full md:w-2/3">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Comment or Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="5"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-gray-600"
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-[#6B6B45] text-white px-6 py-2 font-semibold uppercase tracking-wider rounded-md hover:bg-black transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mt-20 px-4 md:px-0">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Purus amet scelerisque nisi nibh felis massa a enim gravida
        </p>

        {/* FAQ items */}
        <div className="divide-y divide-gray-300 border border-gray-200 rounded-md">
          <details className="p-4 group">
            <summary className="flex justify-between items-center font-semibold cursor-pointer">
              <span>Quam ligula tristique sed leo nunc aenean amet</span>
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <p className="text-gray-500 mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </details>

          <details className="p-4 group">
            <summary className="flex justify-between items-center font-semibold cursor-pointer">
              <span>Tortor eget a tincidunt est viverra turpis</span>
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
          </details>

          <details className="p-4 group">
            <summary className="flex justify-between items-center font-semibold cursor-pointer">
              <span>Quis cras urna diam id nec amet</span>
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
          </details>

          <details className="p-4 group">
            <summary className="flex justify-between items-center font-semibold cursor-pointer">
              <span>Id congue bibendum velit blandit massa elementum</span>
              <span className="transition-transform group-open:rotate-180">⌄</span>
            </summary>
          </details>
        </div>
      </div>
    </div>
  );
}

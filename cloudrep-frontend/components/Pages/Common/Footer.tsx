const Footer = () => {
  return (
    <section className="py-24 bg-blue-200">
      <div className="container mx-auto px-4">
        <div className="max-w-md lg:max-w-none mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/3 px-4 mb-12 lg:mb-0">
              <a className="inline-block" href="#">
                <img
                  className="block h-16"
                  src="/sitesettings/logo.png"
                  alt=""
                />
              </a>
            </div>
            <div className="w-full lg:w-1/3 px-4 mb-12 lg:mb-0">
              <p className="max-w-md lg:mx-auto text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu,
                ipsum nibh felis neque hendrerit.
              </p>
            </div>
            <div className="w-full lg:w-1/3 px-4">
              <div className="flex flex-wrap lg:justify-end">
                <a
                  className="inline-block mr-12 pb-2 border-b border-gray-800 hover:border-gray-400 text-gray-700"
                  href="#"
                >
                  Terms &amp; Conditions
                </a>
                <a
                  className="inline-block pb-2 border-b border-gray-800 hover:border-gray-400 text-gray-700"
                  href="#"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;

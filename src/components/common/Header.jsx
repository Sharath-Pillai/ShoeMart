import React, { useState } from "react";
import { Link } from "react-router";
const Header = () => {
  // const[search,setsearch]=useState('')

  const [shoes, setShoelist] = useState([]);
  const [open, setOpen] = useState(false);
  const handleSearch = (e) => {
    const keyValue = e.target.value;
    console.log(keyValue);
    for (let i = 0; i < shoes.length; i++) {
      for (let j = 0; j < shoes[i].name.length; j++) {
        if (keyValue === shoes[i].name[j]) {
          setShoelist(keyValue);
        }
      }
    }
  };

  return (
    <header className="flex justify-between items-center py-2 px-14 bg-white shadow-sm border-b relative">
      <div className="flex items-center gap-6">
        <div className="logo text-2xl font-bold text-orange-500">
          <Link to="/">SHOEMART</Link>
        </div>
        <nav>
          <ul className="flex gap-6 text-gray-400 uppercase font-semibold">
            <li className="hover:text-black cursor-pointer">
              <Link to="/allcollections">All Collections</Link>
            </li>
            <li className="hover:text-black cursor-pointer">
              <Link to="/womenshoelist">Women</Link>
            </li>
            <li className="hover:text-black cursor-pointer">
              <Link to="/menshoelist">Men</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 mx-8">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2">
          <input
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Find your Everything"
            onChange={(e) => handleSearch(e)}
          />
          <button className="text-sm px-3">Search</button>
        </div>
      </div>

      <nav>
        <ul className="flex gap-6 text-gray-400 items-center">
          <li className="hover:text-black cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:text-black cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="flex gap-6">
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/cart">
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAACUCAMAAAA5xjIqAAAAYFBMVEUAAAD////t7e1JSUkjIyPGxsapqane3t7U1NS+vr7y8vJ6enr29vY5OTlwcHDi4uJDQ0OcnJwwMDAQEBBpaWmxsbFYWFijo6NTU1NhYWGPj4+JiYkXFxcoKCgcHBzMzMxxkQFKAAAFsUlEQVR4nO2cbXeqOhCFLRZ5E1HUVqtt//+/PMv2VgJl70lCyNzV5f54GpJHTjIZJpNZPIVSkp6vi1+6ntMk2BCLQP00u+1v0m9td02gQcLArjHqN+46yDBBYD9bhnpTW4QYJwBs8iah3vQWYOpOh81ebFgXi5dMHza3Q70p14Yt9vaw+6kTdyJs8W7Puli8T6SdBpuNvNf6skrzPF1d6pF3O23eToJthqx1lZp/T6sh8H7S/jAFtjz0SdrdrxeX7QYm+FAqwe4GHKOWNNn0W+0mDDgBtm+08B5V9F/uBAM2AXZpIpzI0sl6LZf+I/rDHnsEdOE0Pdqj95DesMmLNeuA9sXbS/CGNV/sszgP8+cQr9YXdn1wG938bQdf79YXtjH/X20eMGeN787gC3vphr5a7aHmznzxHNQX9sN5aOPnfXgO6gmbGKsrlZvflBq/z9MeeMK+GsvF9hljSa78RvWErbqBX22fMX5g5TeqJ+zZY2kbBuTsN6ofbHLqBnYY666T36T1g807p3pr/1QXCKn9XC8/2M/u08t6fT09dZ7t+6fXsH6wabfVOzjTXTDE1twNNBnW2hiY5kAL1sFkrh6woh6wsh6wQA9YWQ9YWQ9YoAesrAesrD8Cu06gysLwZ0vcbvCU4c8W5CkcCUOw6+NmiWWca7Sk2UBGBLwmzTZHhItgB2cbcYW+6wDsRu5xTm1cYHuxXwU9jwcmx2Ff5f7m1fhn6DjsTu5uXo1/4P+BN3t0OJifQ/vxUwqwwJxO5sPrfTwWNg7biBk686odj6OOw65HcgWGup4PFq2Gqg9jqWq/Wo3vYWBToGlaX9plSdkUjqj7oimTTLY1II4KYJdSd/9NqkZsaOrn1PRTbOgEWwm93e2geQYj6ePuGErvFpw5AFjB0BoL4MRbmjrdH5IWMIijAlhhMm665BGrdLlvvd0fKgVHCSRaANiMd1Z1q9VhZ+720LUwzcABK4Bd886M0xYHx7dzUxNh8gDvGznfwrj3HSaRjdxd2/tPlHICERT4d8Hetz+TVjIbPf0s8lJYX7UjrJS6efiaVslFaDbQ5evdZtLUQQkMCFZ8Y/VhdayctoSbltVxJe/S6GgXwa6kDucUikUgWNddP6hQPhuCTTVhUbwGweYWjtxcuqJjaASbKbrfLcoQQrCNg4MSWieUb4FgJVdjTm1Qji0MzDltTWFVuQbmXFy/0HpDTBBWMSgD8y0g7FHudC7BPEwIm6oFEnECDYTNPIICYVTDREwI6+JVh9UWJn3hAxC1XeEEkTCs5c2p8MK5wxhWbQsDBwoUVs3Q4rQ2DKtmaHG6O4Z1uEIXVjipEsOWWrD4XhM5aNaCJUT/O9i9F6xzUCCMyK0mAqt01kyyhwmskvsNXW8Kq2Roya0iAqsU5yAZKQRWiH7PJXKtiMA2KkGZK7mkQWATlW+Fmty3ILDlWe46vM7kFjGB1YlzwAgHh9UxtMTMUliV6DfLwPszsIWC7bqyeg0MNlcIKNPLVwy2UYhzbNnFPQZbKsQ5TqxYA82fVfBo6V04CqsQ58ARDglWYVdgewKHVXC/6YV+CqtwJkrL4lBYBfeb3uinsELyyRyidRp46n98WI5D/xr9WwElnNjARo9+84oZHDb6twKvJcBho3u0/PILh41uaHn1MQ4bPfrNSwlw2EbuPqx4GQoOm0TOqr/yihIcNrb7TV1vCTZ2nINFOGRYx1zDqbpMgY19b0UoQyHARja0QpHHvwQbN87RCuVlBNi4iXMwVc4ONq7fJdVvkmCjmgOpJo0EW0bMmPqQyjeJ168jRmVoNMYKNuLnuFhYT77YHm3HlQvrybCxUudwopwDbKwPMYvaAzb1DaLYWpsaeVbFGCIcNVqVyLOCHRZHDq/xEsZesLPPBOELwRH2aTWj+9Xaln6zLiCSzWZvK+u6gw7VTvJqhg/z/cahROI/+i5SDjOaZIMAAAAASUVORK5CYII="
                alt="cart-icon"
                className="w-6 h-6 cursor-pointer"
              />
            </Link>

            <div onMouseEnter={() => setOpen(true)}>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAY1BMVEUAAAD///9fX19PT0/x8fF/f3/8/Pz5+fmtra15eXkeHh6IiIinp6fn5+fk5OTNzc0LCwvFxcVXV1dkZGSfn59JSUlqamrb29s3NzcjIyO4uLgXFxcpKSmVlZVzc3MvLy9BQUEnjlp0AAAEd0lEQVR4nO2c6XKjMAyAnWAgB4QjEBJyvv9Tblk2kwC20WFDd4bvf9tvwJZlSVSsuMgq2/j5+ZKml3Pub7JKsn+l4P14UG+9q+hw9bZ1MJ9UkGyFhm3C8WJIZUedUsMxm0EqKU1KDWUysZTcjyk17IlrniaV7CBOQuxoD4skVaQwJyHSYiKp0IcqNfjhJFI5xkmIfAKpcI1zEmKNflZoKWNwUnN0LQUKBX32bqU2FCchNi6lDjQnIQ7upELkxvuQoxY7SiqiOgkRuZKK6U5CxI6kSDvvDWYHIqQqjpMQlRMp1oNCPSq4lASnBmpSeHIFlyLGzQ/wCAqWCk9cqRM4VoGlWPGgBRwVwFIZXwp8vwFLPfhSD+tSN77UzbZUDLy/mNhBFxVUKmFGqYYUeuGCStV8JyFqy1KMrOUDNH+BSt1tSN0tSzFP4xbombxI2Zb6lWuqsCEFLcFApdjZVAM0o4JKWUgS4GnCf332BRe+1AVaxganLuiy1JA19G+BpSysdPDNASxFLrh8AJdewFLS4zp54Isf/N7HDp/w6jVcillKwBQTELUE5v4D7z2UVMKTQnREMPUp1tUPfOlDSrEeFaZ1hKp5opoyXXzM30FJHZ5UpyeqZo2ro5MTGFzvFtlxIL5A1MtDS+F7WA3YPha2YRQSkr0dtreGbq0d0DWhG64xQ5HC1xkxvQaq1CoenUj4xsM7kbrtmNWO79USpVYBuDAUkUZeiBMcCSgP9YiDJdRZlxCQiBaUV8eRasZdjCfhkzrowpL6CVmFVutZoIOTJam/Y13lIMTvSt5IF3v87WdxJbX/1e/O/TqhLiV7Uv+Qh6o68EcEW2xJWWWRgkKRknGVRfe7f/QMHP37PcqqmLLO8PnU5pG/xqP5m1f+2LjNp+L6RGpmpacalcBgru3+mWLUcvYdXNtlxK7E7iLo+oJJBcWLq9TwKmDHD0QqtNLsa4kgZxBAqiKPcqnIAbWzUSnJqGqo8UeX1phUxa6/DvHGHtaIlJU+0ZCRirpRKmAP3eg4GbehSUpaaH3oWJsWlkFKkktkEJ4GK73UgXGoQDjrz2mtFHfabRz9PJxOSqKqGDRKnZVGKnAQnoZ4mj2okbIextVoaqFqKYsnsBn1SI5Sit2wgqM8cVRSUyzyN8rFrpKaaEG1qJaVQorZQsOiyN2HUiHhew8Ox2EuOpSabOe9Ge7AgVRgYaATx20QQgdSVmaScAza8H0p+Zpe6tUPC30pR/mvmX523JdynESpOZulrMxu4cmMUlaGFPHsTVJy8njQcpMGqZneXv/9daWc3fPGOOmlgln2XsM50EpV1/Efd8O10krNEjlbNlqpSbO7Lr5Oiv6hI5/Op5LfUu4vxXo61+VvKQtfNtGJNVITJ+ddEo3UjJuvu/2+pWZIOj8UGqmZUoSWvUZK+79HpmCrkZrtOG44aaQc1l3HWS9Si9QitUgtUovUIrVILVKL1CL1X0j9yivWr6wlhBO2afuUuvrUKp5kGkFF95uRXnE/KmconKVlb67xD9XuPj0EmhyhAAAAAElFTkSuQmCC"
                alt="user-icon"
                className="w-6 h-6 cursor-pointer"
              />
              {open && (
                <div
                  className="absolute top-12 right-0 bg-white rounded-lg py-2.5 shadow-lg w-[100px] z-10 text-center"
                  onMouseLeave={() => setOpen(false)}
                >
                  <div className="py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100">
                    Profile
                  </div>
                  <div className="py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100">
                    Settings
                  </div>
                  <Link to="/signin" className="py-2.5 px-4 whitespace-nowrap cursor-pointer text-sm transition-colors duration-200 hover:bg-gray-100">
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

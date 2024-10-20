import { Link } from "react-router-dom";

const Footer = () => {
  const productList = [
    { text: "Contact", href: "#contact" },
    { text: "About Us", href: "#aboutus" },
  ];

  const contactList = ["causefundr@gmail.com", "Contact Us"];

  return (
    <footer className="text-center text-white bg-[#1b1b1b] lg:text-left justify-self-end">
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              CauseFundr
            </h6>
            <p>
              CauseFundr is a decentralized crowdfunding platform on Ethereum,
              empowering creators to raise funds securely and transparently
              through smart contracts.
            </p>
          </div>

          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((item, index) => (
              <p className="mb-4" key={index}>
                <Link to={item.href}>{item.text}</Link>
              </p>
            ))}
          </div>

          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {productList.slice(0, 3).map((item, index) => (
              <p className="mb-4" key={index}>
                <Link to={item.href}>{item.text}</Link>
              </p>
            ))}
          </div>

          <div>
            <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.slice(0, 3).map((item, index) => (
              <p className="mb-4" key={index}>
                <Link to={item.includes("@") ? `mailto:${item}` : "#"}>
                  {item}
                </Link>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="backgroundMain p-6 text-center">
        <span>
          &copy; All Rights Reserved &nbsp; |
          <Link to="/" className="text-blue-500">
            &nbsp; CauseFundr
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react'
import { footerLinks } from '../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {

      return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-primary/10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
            <div>
              <Link to={"/"}>
                <h1 className="text-xl md:text-3xl font-bold">
                  Fruit.<span className="text-primary">Bay</span>
                </h1>
              </Link>
              <p className="max-w-[410px] mt-2">
                At <span className='font-bold'>Fruit.<span className="text-primary">Bay</span></span> we’re
                passionate about bringing the farm to your fingertips. We offer
                a wide range of fresh fruits, carefully sourced from trusted
                growers, and delivered to your door with speed and care.
              </p>
            </div>
            <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
              {footerLinks.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                    {section.title}
                  </h3>
                  <ul className="text-sm space-y-1">
                    {section.links.map((link, i) => (
                      <li key={i}>
                        <a href={`/${link.url}`} className="hover:underline transition">
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
            Copyright {new Date().getFullYear()} © Mohammed All Right Reserved.
          </p>
        </div>
      );
}

export default Footer

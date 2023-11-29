import React from 'react';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import '../../assets/carasoule.css'

import { useNavigate } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carasoule({movieList}) {


    const navigate = useNavigate();



    const settings = {
        dots: false,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const RouteToMovieInfo = (movieName)=>{
        //set args

        navigate(`movie-info/${movieName}`)

    }

    return (
        <Slider {...settings} className="slider">

           {movieList.map((value,index)=>{

                return (
                    
                    <div className="h-96 relative " key={index}>
                <img src={value.posterLink} alt="background" className="absolute inset-0 object-cover w-full h-full" />
                <div className="overlay absolute inset-0 bg-black opacity-50"></div>
                <div className='movieInfo absolute inset-0 p-8'>
                <h2 className="text-4xl font-bold text-white">{value.movieName}</h2>
                <button onClick={()=>{RouteToMovieInfo(value.movieName)}} class=" booknow group relative text-sm font-medium text-white focus:outline-none focus:ring">
                    <span
                        class="absolute inset-0 border border-yellow-500 group-active:border-yellow-500"
                    ></span>
                    <span class="block border border-yellow-500 bg-yellow-500 px-12 py-3 transition-transform active:border-yellow-500 active:bg-yellow-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                        BOOK NOW
                    </span>
                </button>
                <div className='addInfo'>
                <p className='category text-sm'>{value.genre.join(' | ')}</p>
                <p className='square'>▪️</p>
                <p className='time text-sm' >{value.runtime}</p>
                <p className='age '>{value.certificate}</p>
                </div>
                </div>
            </div>
            )

           }) }
            {/* <div className="bg-yellow-400 h-96">
                <div className='movieInfo'>
                <h2 className="text-4xl font-bold text-white">Movie Title</h2>
                <div className='addInfo'>
                <p className='category text-sm'>Animation | Horror</p>
                <p className='square'>▪️</p>
                <p className='time text-sm' >2hr 35m</p>
                <p className='age '>pg10</p>
                </div>
                </div>
            </div> */}
            {/* <div className="bg-red-400 h-64 md:h-96 lg:h-[400px] flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">Slide 2</h2>
            </div>
            <div className="bg-yellow-400 h-64 md:h-96 lg:h-[400px] flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">Slide 3</h2>
            </div> */}
            {/* Add more slides as needed */}
        </Slider>
    );
}

export default Carasoule;

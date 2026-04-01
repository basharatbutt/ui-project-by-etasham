import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'
import { productName, imageList, colorOptions, shoeSizes, ins } from './productData'

function App() {
  const [color, setColor] = useState(null)
  const [image, setImage] = useState("https://oxbowui.com/store/shoes/airmax/1.png")
  const [size, setSize] = useState(null)
  const [instruction, setInstruction] = useState('Details')
  const [currentIndex, setCurrentIndex] = useState(0)
    const [api, setApi] = useState([])



    const thumbRef = useRef(null);


    const fetchData = async () => {
           try {
           let response = await fetch("https://7ringsstore.com/store");
           if (!response.ok) throw new Error("Network response was not ok");
           let data = await response.json();
           setApi(data);
           console.log(data)
           } catch (error) {
            console.error("API Error:", error);
           }
}

   const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

useEffect(() => {
    if (thumbRef.current) {
      const activeItem = thumbRef.current.children[currentIndex];
      activeItem?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    
    fetchData();

  }, [])
  
   

  return (
    <>

    <div className='flex justify-center items-center min-h-screen bg-gray-50  p-4'>

      <div className="flex flex-col lg:flex-row border-2 border-gray-200 bg-white rounded-3xl p-6 md:p-12 w-full max-w-6xl shadow-sm gap-8 lg:gap-16 ">










         <div className="flex flex-col gap-4 items-center">

          
 <div className="relative w-full flex items-center group">
           

            {/* Displaying image using the currentIndex */}
            <img 
              className="object-contain rounded-4xl  " 
              src={imageList[currentIndex]} 
              alt="Nike Shoe" 
              width={1052}
            />

            
          </div>
          <div className="flex items-center gap-2 w-full max-w-[950px]">

       <button 
              onClick={prevSlide}
              className="relative  flex-shrink-0 left-2 z-10 bg-white/80 hover:bg-black hover:text-white p-2 rounded-full shadow-md transition-all"
            >
              ❮
            </button>


          {/* THUMBNAILS */}
          <div
           ref={thumbRef}
              className="flex flex-nowrap overflow-hidden gap-2 scroll-smooth py-2">
            {imageList.map((imgUrl, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 p-1 rounded-xl border-2 transition-all 
                  ${currentIndex === index ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <img src={imgUrl} alt={`thumb ${index}`} className="w-12  lg:w-16 rounded-xl object-contain" />
              </button>

              
            ))}
          </div>
<button 
              onClick={nextSlide}
              className="relative  flex-shrink-0 right-2 z-10 bg-white/80 hover:bg-black hover:text-white p-2 rounded-full shadow-md transition-all"
            >
              ❯
            </button>
            </div>
                    </div>





        
        <div className='flex flex-col text-left gap-6'>

          <div className='flex justify-between'>
        <h1 className="text-2xl font-bold text-gray-900">
            {productName}
          </h1>
         <span className='text-xl'>$190</span>
         </div>

        <div className="">Hitting the field in the late '60s, adidas airmaxS quickly became soccer's "it" shoe.
        </div>



        
           <div className="flex flex-col gap-3 mt-4">
            <span className="text-lg font-bold text-gray-900">Color</span>
            
            <div className="flex flex-wrap gap-4">
              
               {colorOptions.map((co) => (
    <button
      key={co.name} 
      onClick={() => setColor(co.name)} 
      className={`w-9 h-9 rounded-full border transition-all ${co.class} 
        ${color === co.name ? 'ring-2 ring-black ring-offset-2' : 'hover:scale-110'}`}
    >
    </button>
              ))}
              </div>
              </div>




<div className="flex flex-col gap-3 mt-2">
            <span className="text-lg font-bold">Shoe size</span>
            <div className="flex flex-wrap gap-3">
              {shoeSizes.map((se) => (
                <button 
                key={se}
                  onClick={() => setSize(se)}
                  className={`text-sm  w-16 lg:w-28 h-12  flex items-center justify-center rounded-lg border-2 font-bold transition-all
                    ${size === se 
                      ? 'border-black bg-gray-200 ' 
                      : 'border-gray-200 text-gray-900 hover:border-gray-400'}`}
                >
                  {se}
                </button>
              ))}
            </div>
          </div>




          <div className="flex mt-2 gap-2 ">
            <button className='w-66 h-10 bg-gray-950 text-white rounded-2xl'>Add to card</button>
            <button className='w-66 bg-gray-200 text-black rounded-2xl'>Buy Now</button>
          </div>
          <p className='-mt-5'>Free shipping over $50 if you behave</p>





        <div className="mt-4 border-t border-gray-200">
            {ins.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => setInstruction(instruction === item.title ? null : item.title)}
                  className="flex w-full justify-between items-center py-4 text-left font-medium text-gray-700 hover:text-black transition-all"
                >
                  <span className="text-lg">{item.title}</span>
                  {/* Icon switches between + and x */}
                  <span className="text-2xl text-gray-400">
                    {instruction === item.title ? '×' : '+'}
                  </span>
                </button>
                
                {/* Content Area */}
                <div className={`overflow-hidden transition-all duration-300 ${instruction === item.title ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>




      </div>
      </div>
      </div>
    </>
  )
}

export default App

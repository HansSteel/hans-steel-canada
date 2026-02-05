import type { NextPage } from 'next'
import MetaHead from '../components/MetaHead';
import Link from 'next/link'
import { useState, useRef, useMemo } from 'react'
import GoogleMap from '../components/GoogleMap'
import { projectsData } from '../constants/projectsData'

const Home: NextPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = useMemo(() => {
    const getRandomProjects = (num: number) => {
      const shuffled = [...projectsData].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, num);
    };
    const randomProjects = getRandomProjects(2);
    return [
      {
        image: '/images/home/slides/office.png',
        title: '30+ Years of International Experiences',
        subtitle: '98% on-time deliveries Best lead-times in the industry Always prepared with a contingency plan',
        link: '/projects'
      },
      {
        image: randomProjects[0].mainImage,
        title: randomProjects[0].title,
        subtitle: randomProjects[0].description,
        link: '/projects'
      },
      {
        image: randomProjects[1].mainImage,
        title: randomProjects[1].title,
        subtitle: randomProjects[1].description,
        link: '/projects'
      }
    ];
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  // Drag / swipe support
  const startXRef = useRef<number | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const isDraggingRef = useRef(false)
  const [translateX, setTranslateX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const SWIPE_THRESHOLD = 80

  const onPointerDown = (e: any) => {
    // Only left mouse / touch
    startXRef.current = e.clientX
    pointerIdRef.current = e.pointerId
    isDraggingRef.current = true
    setIsDragging(true)
    // capture pointer so we keep receiving move/up events
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId)
    } catch (err) {
      // ignore in older browsers
    }
  }

  const onPointerMove = (e: any) => {
    if (!isDraggingRef.current || pointerIdRef.current !== e.pointerId || startXRef.current === null) return
    const delta = e.clientX - startXRef.current
    setTranslateX(delta)
  }

  const finishDrag = (e?: any) => {
    const delta = translateX
    // navigate if beyond threshold
    if (delta > SWIPE_THRESHOLD) {
      prevSlide()
    } else if (delta < -SWIPE_THRESHOLD) {
      nextSlide()
    }
    // reset
    isDraggingRef.current = false
    pointerIdRef.current = null
    startXRef.current = null
    setTranslateX(0)
    setIsDragging(false)
    if (e) {
      try { (e.currentTarget as Element).releasePointerCapture(e.pointerId) } catch (err) {}
    }
  }

  return (
    <>
      <MetaHead
        title="Hans Steel Canada | Structural Steel Fabrication & Engineering"
        description="Hans Steel specializes in structural steel fabrication, engineering, and construction for industrial, commercial, and institutional projects across Canada."
        keywords="structural steel, steel fabrication, steel construction, industrial steel, commercial steel, institutional steel, Canada"
      />

      {/* Hero Slider Section */}
      <section className="relative h-[90vh] bg-slate-900 overflow-hidden">
        <div className="relative h-full">
          {/* Slider Image (draggable) */}
          <div
            className="w-full h-full"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onPointerLeave={finishDrag}
            // allow vertical scrolling while handling horizontal drag
            style={{ touchAction: 'pan-y' }}
          >
            <div
              className="w-full h-full"
              style={{
                transform: `translateX(${translateX}px)`,
                transition: isDragging ? 'none' : 'transform 300ms ease'
              }}
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

          {/* Slide Content */}
          <div className="absolute right-8 md:right-20 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm text-white p-10 max-w-lg rounded-lg shadow-2xl border border-white/10">
            <h2 className="text-4xl font-bold mb-3 tracking-tight">{slides[currentSlide].title}</h2>
            <p className="text-xl mb-8 text-slate-200">{slides[currentSlide].subtitle}</p>
            <Link 
              href={slides[currentSlide].link}
              className="inline-block bg-white text-slate-900 px-8 py-3 font-bold hover:bg-slate-100 transition-all duration-200 rounded shadow-lg hover:shadow-xl"
            >
              Read More
            </Link>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-4 rounded-full transition-all duration-200"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Project Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ICI Building Structure */}
            <div className="group relative h-96 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src="/images/home/ic-building-structure.png" 
                alt="ICI Building Structure" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-3 tracking-tight">ICI Building Structure</h3>
                <p className="text-lg text-slate-200">Industrial, Commercial & Institutional</p>
              </div>
            </div>

            {/* Monopole Steel Tower */}
            <div className="group relative h-96 overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
              <img 
                src="/images/home/mono-pole-steel-tower.png" 
                alt="Monopole Steel Tower" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-3xl font-bold mb-3 tracking-tight">Monopole Steel Tower</h3>
                <p className="text-lg text-slate-200">Utility Transmission, Distribution & Tele-Communication Tower</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Statement Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-6xl relative z-10">
          <div className="mb-10">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-full">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
            </div>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed font-light">
            With over 35 years of international experience within the ICI, Utility, Telecom, Gas & Oil industries,
            Hans Steel Canada has been recognized as one of the most competent economical and technical suppliers in the Engineering,
            Production and Construction of structural steel.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="inline-block p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-lg">
                  <svg className="w-16 h-16 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">98% ON-TIME DELIVERIES IN CANADA</h3>
              <p className="text-slate-600 leading-relaxed">
                With standardized ERP programs in place Hans Steel Canada ensures planning, scheduling and tracking of
                orders and materials to help successfully delivered on time!
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="inline-block p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-lg">
                  <svg className="w-16 h-16 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">BEST LEAD-TIMES IN THE INDUSTRY</h3>
              <p className="text-slate-600 leading-relaxed">
                With over 150 years of combined material on hand, combined with highly experienced and capable, educated and
                skilled work-force in place, Hans Steel Canada is confident and proud to be able to offer their customers the best lead times in the industry.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="inline-block p-6 bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl shadow-lg">
                  <svg className="w-16 h-16 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900">ALWAYS PREPARED WITH A CONTINGENCY PLAN</h3>
              <p className="text-slate-600 leading-relaxed">
                At Hans Steel Canada, we strive to properly plan and prepare our staff on site across all of our production lines,
                as well as our galvanizers and logistics companies, in order to back-up and ensure we can keep delivering your project on-time!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Equipment Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-900 tracking-tight">Professional Equipment</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'Python-X Beam LI', image: '/images/home/equipments/1-Python-X-Beam-LI.png' },
              { name: 'CNC 3-Dimensional High-Speed Drilling Line', image: '/images/home/equipments/3CNC-3-Dimensional-High-Speed-Drilling-Line_500x500.png' },
              { name: 'CNC Plasma Tubular Profiling Machine', image: '/images/home/equipments/4-5CNC-Plasma-Tubular-Profiling-Machine_500x500.png' },
              { name: 'Gantry Plate-Drilling Machine', image: '/images/home/equipments/5-Gantry-Plate-Drilling-Machine_500x500.png' },
              { name: 'Rotating Saw', image: '/images/home/equipments/6-Rotating-Saw_500x500.png' },
              { name: 'Submerged Arc Welding Saw', image: '/images/home/equipments/10-Submerged-Arc-Welding-Saw_500x500.png' },
              { name: 'Sandblasting Machine', image: '/images/home/equipments/11a-Sandblasting-Machine_500x500.png' },
              { name: 'Shear', image: '/images/home/equipments/11b-Shear_500x500.png' },
              { name: 'Press Brake', image: '/images/home/equipments/12-Press-Brake_500x500.png' },
              { name: 'Plasma Cutting Machine', image: '/images/home/equipments/14-Plasma-Cutting-Machine_500x500.png' },
              { name: 'Steel Tower Pre-fit Up Station', image: '/images/home/equipments/15-Steel-Tower-Pre-fit-Up-Station_500x500.png' },
              { name: 'Sub-Merged Arc Line For Tubular Structures', image: '/images/home/equipments/16-Sub-Merged-Arc-Line-For-Tubular-Structures_500x500.png' },
      
            ].map((equipment, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-4 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <img 
                    src={equipment.image} 
                    alt={equipment.name}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="text-sm font-semibold text-slate-700 leading-tight">{equipment.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Statement Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 border border-white/20 shadow-2xl">
              <p className="text-xl md:text-2xl leading-relaxed font-light text-center">
                "Hans Steel Canada is committed to providing customers with satisfaction, guaranteed quality, competitive cost
                and accomplished delivery. How can we do that? Hans Steel Canada has constructed an 160,000 square foot, fully
                automated fabrication plant, located in Uxbridge, Ontario, which includes cutting, drilling, welding,
                sandblasting and painting all under one roof and managed by a state of the art ERP system."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-semibold mb-4 text-slate-900">Our Location</h2>
            <GoogleMap query="6 Sangster Road Uxbridge ON L9P 0G5" title="Hans Steel Canada - Map" />
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="text-center">
              <div className="inline-block px-8 py-4 bg-slate-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-2xl font-bold text-slate-700">AISC</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block px-8 py-4 bg-slate-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-2xl font-bold text-slate-700">CSA</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block px-8 py-4 bg-slate-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-2xl font-bold text-slate-700">ISO</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block px-8 py-4 bg-slate-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-2xl font-bold text-slate-700">CWB</span>
              </div>
            </div>
            <div className="text-center">
              <div className="inline-block px-8 py-4 bg-slate-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <span className="text-2xl font-bold text-slate-700">TEKLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

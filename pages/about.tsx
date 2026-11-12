import React, { ReactNode } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import GoogleMap from '../components/GoogleMap'

type FeatureCardProps = {
  title: string
  description: string
  bgColor: string
  children: ReactNode
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, bgColor, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-100">
      <div className="flex items-start gap-4">
        <div className={`${bgColor} text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}>{children}</div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

type FeatureItem = {
  title: string
  description: string
  bgColor: string
  icon: ReactNode
}

const features: FeatureItem[] = [
  {
    title: 'People',
    description:
      'By fostering teamwork, nurturing talent, and enhancing leadership capabilities, our teams act with pride and passion to serve our customers and each other with integrity.',
    bgColor: 'bg-[#c41e3a]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.636 6.879 1.762M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Quality Control',
    description:
      'We are committed to producing the highest quality product in the industry. Each employee takes responsibility for their role in the overall productivity and reputation of the company.',
    bgColor: 'bg-[#0ea5a4]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 7h10v10H7z" />
      </svg>
    ),
  },
  {
    title: 'Innovation',
    description:
      'Innovation is anything but business as usual — we promote innovation by developing leading edge solutions in technology, processes and products.',
    bgColor: 'bg-[#f59e0b]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Conduct',
    description:
      'By demonstrating high ethical standards, Hans Steel Canada is committed to providing a safe workplace while respecting and caring for the environment and our communities.',
    bgColor: 'bg-[#374151]',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2v4h6v-4c0-1.105-1.343-2-3-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
]

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Us — Hans Steel Canada</title>
      </Head>

      <div className="container mx-auto px-4 py-12">
        {/* Hero / Banner */}
        <section className="relative rounded overflow-hidden shadow-lg">
          <div
            className="h-100 sm:h-96 bg-cover bg-center w-full"
            style={{
              backgroundImage: "url('/images/about/banner.png')",
            }}
            aria-hidden
          />

          <div className="absolute inset-0 flex items-center justify-start pl-6 sm:pl-12 lg:pl-24">
            <div className="bg-white/6 backdrop-blur-sm text-white p-6 sm:p-10 rounded max-w-lg shadow-lg border border-white/10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide uppercase">Hans Steel Canada</h1>
              <p className="mt-2 text-sm sm:text-base text-white/90">Delivering reliable structural steel solutions for Canada</p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mt-10 max-w-4xl mx-auto text-gray-700 leading-relaxed">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-900">About Hans Steel Canada</h2>
            <div className="mt-3 h-0.5 w-20 bg-gray-200 rounded" />

            <p className="mt-5 text-base text-gray-700">
              Hans Steel Canada has advanced
              fabrication facility in Stouffville, Ontario provides dependable, cost-effective structural
              steel solutions — with a particular focus on Power Transmission and Distribution sectors.
            </p>

            <p className="mt-4 text-base text-gray-700">
              Supported by our parent company's 300,000 ton annual capacity and 25 years of international
              experience, we combine global expertise with local commitment to deliver high-quality products
              and responsive customer service.
            </p>
          </div>
        </section>

        {/* Four key description cards */}
        <section className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Focus Areas</h3>
          <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <FeatureCard key={f.title} title={f.title} description={f.description} bgColor={f.bgColor}>
                {f.icon}
              </FeatureCard>
            ))}
          </div>
        </section>

        {/* Map and contact card */}
        <section className="mt-12">
            <GoogleMap
              query="6 Sangster Road Uxbridge ON L9P 0G5"
              title="Hans Steel Canada - Map"
              loading="lazy"
            />
        </section>
      </div>
    </>
  )
}

export default About

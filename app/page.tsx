"use client";

import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToAction from "@/components/CallToAction";
import Testimonials from "@/components/Testimonials";
import StatisticsSection from "@/components/StatisticsSection";
import DemoVideoSection from "@/components/DemoVideoSection";
import RolesDemoSection from "@/components/RolesDemoSection";
import PartnersSection from "@/components/PartnersSection";
import FaqSection from "@/components/FaqSection";
import ContactCard from "@/components/ContactCard";
import NewsletterSection from "@/components/NewsletterSection";

import LazyLoadComponent from "@/components/LazyLoadComponent";

export default function HomePage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white flex flex-col">
            <div className="absolute inset-0 -z-10"></div>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <StatisticsSection />

            <LazyLoadComponent>
                <RolesDemoSection />
            </LazyLoadComponent>

            <LazyLoadComponent>
                <DemoVideoSection />
            </LazyLoadComponent>

            <LazyLoadComponent>
                <PartnersSection />
            </LazyLoadComponent>

            <CallToAction />
            <Testimonials />
            <FaqSection />
            <NewsletterSection />
            <ContactCard />
            <Footer />
        </div>
    );
}

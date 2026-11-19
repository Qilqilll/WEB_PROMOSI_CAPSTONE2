"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import FiturSection from "@/components/sections/FiturSection";
import KeunggulanSection from "@/components/sections/KeunggulanSection";
import CaraPakaiSection from "@/components/sections/CaraPakaiSection";
import PricingSection, { PRICING_PLANS } from "@/components/sections/PricingSection";
import TestimoniSection from "@/components/sections/TestimoniSection";
import FooterSection from "@/components/sections/FooterSection";
import PaymentModal, { PricingPlan } from "@/components/PaymentModal";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FiturSection />
      <KeunggulanSection />
      <CaraPakaiSection />
      <PricingSection onSelectPlan={handleSelectPlan} />
      <TestimoniSection />
      <FooterSection />

      {/* Global Payment & Activation Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
      />
    </main>
  );
}

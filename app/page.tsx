import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ReceiptsStrip from "@/components/ReceiptsStrip";
import CostGrid from "@/components/CostGrid";
import ProofGrid from "@/components/ProofGrid";
import PainList from "@/components/PainList";
import Guide from "@/components/Guide";
import Plan from "@/components/Plan";
import Faq from "@/components/Faq";
import AeoBlock from "@/components/AeoBlock";
import CtaFooter from "@/components/CtaFooter";
import ScrollFx from "@/components/ScrollFx";

export default function Home() {
  return (
    <>
      <ScrollFx />
      <Nav />
      <Hero />
      <div className="wrap receipts-strip">
        <ReceiptsStrip className="reveal" />
      </div>
      <CostGrid />
      <ProofGrid />
      <PainList />
      <Guide />
      <Plan />
      <Faq />
      <AeoBlock />
      <CtaFooter />
    </>
  );
}

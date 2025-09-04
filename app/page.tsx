import ComoFunciona from "./_components/como-funciona/ComoFunciona";
import Faq from "./_components/faq/Faq";
import Hero from "./_components/hero/Hero";
import Importance from "./_components/importance/Importance";

import Timeline from "./_components/timeline/Timeline";

export default function Home() {
  return (
    <main>
      <Hero />
      <ComoFunciona />
      <Timeline /> 
      <Importance />
      <Faq />
    </main>
  );
}

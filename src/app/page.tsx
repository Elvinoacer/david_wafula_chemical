import { Hero } from "@/components/home/hero";
import { VelocityMarquee } from "@/components/home/velocity-marquee";
import { Snapshot } from "@/components/home/snapshot";
import { FeaturedProject } from "@/components/home/featured-project";
import { ProjectGrid } from "@/components/home/project-grid";
import { Manifesto } from "@/components/home/manifesto";
import { Industrial } from "@/components/home/industrial";
import { Capabilities } from "@/components/home/capabilities";
import { Tools } from "@/components/home/tools";
import { Academic } from "@/components/home/academic";
import { Labs } from "@/components/home/labs";
import { Playground } from "@/components/home/playground";
import { Timeline } from "@/components/home/timeline";
import { Learning } from "@/components/home/learning";
import { ContactCta } from "@/components/home/contact-cta";
import { ParallaxImages } from "@/components/motion/parallax-images";

export default function HomePage() {
  return (
    <ParallaxImages>
      <Hero />
      <VelocityMarquee />
      <Snapshot />
      <FeaturedProject />
      <ProjectGrid />
      <Manifesto />
      <Industrial />
      <Capabilities />
      <Tools />
      <Academic />
      <Labs />
      <Playground />
      <Timeline />
      <Learning />
      <ContactCta />
    </ParallaxImages>
  );
}

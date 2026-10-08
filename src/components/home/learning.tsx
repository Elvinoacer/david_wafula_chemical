import { currentlyLearning } from "@/data/profile";
import { SectionHeading } from "@/components/motion/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

const STATUS_STYLES: Record<string, string> = {
  "In progress": "border-process/45 bg-process-soft text-process",
  Studying: "border-analysis/45 bg-analysis-soft text-analysis",
  Exploring: "border-line bg-surface text-muted-foreground",
};

export function Learning() {
  return (
    <section aria-labelledby="learning-heading" className="relative border-t border-line/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          index="10"
          eyebrow="Currently Learning"
          title="The toolkit keeps growing."
          description="What I am deliberately working on right now — each item has a status and a goal, because a learning list without intent is just a wish list."
        />

        <Stagger className="mt-12 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {currentlyLearning.map((item) => (
            <StaggerItem key={item.name}>
              <div className="card-lift h-full rounded-xl border border-line bg-surface/70 p-4.5 p-5">
                <span
                  className={`tech-label inline-block rounded-full border px-2 py-0.5 ${
                    STATUS_STYLES[item.status] ?? STATUS_STYLES.Exploring
                  }`}
                >
                  {item.status}
                </span>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight">{item.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.goal}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

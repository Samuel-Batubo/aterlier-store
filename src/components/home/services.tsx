import { services } from "@/lib/sample-data";

export function Services() {
  return (
    <section aria-labelledby="services-title" className="py-section-sm">
      <h2 id="services-title" className="sr-only">
        Client services
      </h2>
      <ul className="container-site grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {services.map((s, i) => (
          <li
            key={s.title}
            className={`flex flex-col items-center gap-3 text-center lg:px-8 ${i > 0 ? "lg:border-l" : ""}`}
          >
            <h3 className="text-eyebrow">{s.title}</h3>
            <p className="max-w-60 text-body-sm text-muted">{s.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

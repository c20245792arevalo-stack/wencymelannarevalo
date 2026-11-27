import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = document.querySelector("#services");
if (services) {
  gsap.from(services, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: services,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

const progress = document.querySelector("#progress");
if (progress) {
  gsap.fromTo(
    progress,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    },
  );
}

const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

tl.from("h1", { y: 60, opacity: 0, duration: 1 })
  .from("nav a", { y: -20, opacity: 0, stagger: 0.15 })
  .from("main section:not(#hero)", { y: 20, opacity: 0, stagger: 0.2 });

const togglebutton = document.querySelector(".toggledark");

if (togglebutton) {
  togglebutton.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    togglebutton.setAttribute("aria-pressed", String(isDark));

    gsap.fromTo(
      togglebutton,
      { rotation: 0 },
      {
        rotation: 360,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => {
          gsap.set(togglebutton, { rotation: 0 });
        },
      },
    );

    tl.restart();
  });
}

gsap.registerPlugin(ScrollTrigger);

    gsap.from("#services", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#services",
            start: "top 80%",
            markers: true,
            toggleActions: "play none none reverse",
        },
    });
        
        gsap.fromTo("#progress",
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            }
        );

         ScrollTrigger.create({
            trigger: "#services",
            start: "top top",
            end: "bottom top",
            pin:true,
            markers: true,
        });
        
        const togglebutton = document.querySelector('.toggledark');

        // One timeline controls everything, in order: h1 -> nav a -> main
        const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

        tl.from("h1", { y: 60, opacity: 0, duration: 1 })
          .from("nav a", { y: -20, opacity: 0, stagger: 0.15 })
          .from("main section:not(#hero)", { y: 20, opacity: 0, stagger: 0.2 });

        // On toggle: switch light/dark, spin the button, replay the intro
        togglebutton.addEventListener('click', function () {
            document.documentElement.classList.toggle('dark');
            gsap.fromTo(togglebutton, { rotation: 0 }, { rotation: 360, duration: 0.8, ease: "back.out(1.7)" });
            tl.restart();
        });
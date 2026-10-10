const menuButtons = document.querySelectorAll(".menu-btn");
const mobileMenus = document.querySelectorAll(".mobile-menu");

menuButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        mobileMenus[index].classList.toggle("hidden");
    });
});

const packageDialog = document.querySelector("[data-package-dialog]");
const packagePanels = packageDialog?.querySelectorAll("[data-package-panel]");

document.querySelectorAll("[data-package]").forEach((packageButton) => {
    packageButton.addEventListener("click", () => {
        packagePanels?.forEach((panel) => {
            panel.classList.toggle("hidden", panel.dataset.packagePanel !== packageButton.dataset.package);
        });
        packageDialog?.showModal();
    });
});

document.querySelector("[data-close-dialog]")?.addEventListener("click", () => {
    packageDialog?.close();
});

packageDialog?.addEventListener("click", (event) => {
    if (event.target === packageDialog) packageDialog.close();
});

/* ------------------------------------------------------------------
   Motion
   ------------------------------------------------------------------ */
window.fliaMotion = true;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hero intro: once the entrance has played, drop the class so hover/active
// states on the button are no longer held by the animation.
document.querySelectorAll(".hero-in").forEach((el) => {
    el.addEventListener("animationend", () => el.classList.remove("hero-in"), { once: true });
});

// Scroll reveals – elements that enter the viewport together are staggered.
const revealEls = document.querySelectorAll("[data-reveal]");

const finishReveal = (el, delay) => {
    el.classList.add("is-visible");
    // Hand control back to the element's own Tailwind transitions afterwards.
    const total = delay + (el.dataset.reveal === "img" ? 1900 : 1300);
    setTimeout(() => {
        el.removeAttribute("data-reveal");
        el.classList.remove("is-visible");
        el.style.removeProperty("--d");
    }, total);
};

if (reduceMotion) {
    revealEls.forEach((el) => finishReveal(el, 0));
} else {
    // A plain scroll check (instead of IntersectionObserver) also catches
    // elements that were skipped by fast scrolling or anchor jumps.
    let pending = Array.from(revealEls);
    let queued = false;

    const checkReveals = () => {
        queued = false;
        const trigger = window.innerHeight * 0.9;
        const due = [];
        pending = pending.filter((el) => {
            if (el.getBoundingClientRect().top < trigger) {
                due.push(el);
                return false;
            }
            return true;
        });
        due.forEach((el, i) => {
            const delay = Math.min(i * 110, 660);
            el.style.setProperty("--d", `${delay}ms`);
            finishReveal(el, delay);
        });
        if (!pending.length) {
            window.removeEventListener("scroll", queueCheck);
            window.removeEventListener("resize", queueCheck);
        }
    };

    const queueCheck = () => {
        if (!queued) {
            queued = true;
            requestAnimationFrame(checkReveals);
        }
    };

    window.addEventListener("scroll", queueCheck, { passive: true });
    window.addEventListener("resize", queueCheck);
    checkReveals();
}

// Subtle parallax: hero photo and the big "flia" watermark drift while scrolling.
const heroBg = document.querySelector("[data-parallax-bg]");
const parallaxEls = document.querySelectorAll("[data-parallax]");

if (!reduceMotion && (heroBg || parallaxEls.length)) {
    let ticking = false;

    const update = () => {
        const vh = window.innerHeight;

        if (heroBg) {
            const y = Math.min(window.scrollY, heroBg.offsetHeight);
            heroBg.style.backgroundPosition = `right ${Math.round(y * 0.3)}px`;
        }

        parallaxEls.forEach((el) => {
            const parent = el.parentElement.getBoundingClientRect();
            if (parent.bottom < -200 || parent.top > vh + 200) return;
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const offset = (parent.top + parent.height / 2 - vh / 2) * speed;
            el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        });

        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        },
        { passive: true }
    );
    window.addEventListener("resize", update);
    update();
}

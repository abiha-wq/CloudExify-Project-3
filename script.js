document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat");

    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const stat = entry.target;
                const target = Number(stat.dataset.target);

                if (isNaN(target)) return;

                let count = 0;
                const duration = 1500;
                const intervalTime = 30;
                const increment = target / (duration / intervalTime);

                const timer = setInterval(() => {
                    count += increment;

                    if (count >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(count);
                    }
                }, intervalTime);

                observer.unobserve(stat);
            });
        }, { threshold: 0.5 });

        stats.forEach((stat) => statsObserver.observe(stat));
    }

    const appointmentForm = document.getElementById("appointmentForm");

    if (appointmentForm) {
        const appointmentButton = appointmentForm.querySelector(".appointment-button");

        appointmentForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = appointmentForm.querySelector('input[name="name"]');
            const email = appointmentForm.querySelector('input[name="email"]');
            const phone = appointmentForm.querySelector('input[name="phone"]');
            const service = appointmentForm.querySelector('select[name="service"]');

            let isValid = true;

            if (name && name.value.trim() === "") {
                name.focus();
                isValid = false;
            }

            if (isValid && email && email.value.trim() === "") {
                email.focus();
                isValid = false;
            }

            if (isValid && phone && phone.value.trim() === "") {
                phone.focus();
                isValid = false;
            }

            if (isValid && service && service.value === "") {
                service.focus();
                isValid = false;
            }

            if (!isValid) {
                alert("Please fill in all required fields.");
                return;
            }

            if (appointmentButton) {
                appointmentButton.disabled = true;
                appointmentButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending...`;
            }

            setTimeout(() => {
                alert("Appointment request sent successfully! We will contact you soon.");
                appointmentForm.reset();

                if (appointmentButton) {
                    appointmentButton.disabled = false;
                    appointmentButton.innerHTML = `<i class="fa-regular fa-calendar-check"></i> Book Appointment`;
                }
            }, 1500);
        });
    }

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
    const sections = document.querySelectorAll("section[id]");

    if (navLinks.length > 0 && sections.length > 0) {
        function updateActiveNav() {
            let currentSection = "";

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove("active");
                const href = link.getAttribute("href");

                if (href === `#${currentSection}`) {
                    link.classList.add("active");
                }
            });
        }

        window.addEventListener("scroll", updateActiveNav);
        updateActiveNav();
    }

    const navbarCollapse = document.querySelector(".navbar-collapse");
    const mobileNavLinks = document.querySelectorAll(".navbar-collapse .nav-link");

    if (
        navbarCollapse &&
        mobileNavLinks.length > 0 &&
        typeof bootstrap !== "undefined"
    ) {
        const navbar = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
            toggle: false
        });

        mobileNavLinks.forEach((link) => {
            link.addEventListener("click", () => {
                if (navbarCollapse.classList.contains("show")) {
                    navbar.hide();
                }
            });
        });
    }

    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            e.preventDefault();

            const navbar = document.querySelector(".navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });

    const revealElements = document.querySelectorAll(
        ".service-card, .pricing-card, .doctor-card, .contact-info-card, .appointment-card"
    );

    if (revealElements.length > 0) {
        revealElements.forEach((element) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";
            element.style.transition = "opacity 0.7s ease, transform 0.7s ease";
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    const doctorCard = document.querySelector(".doctor-card");
    const doctorArrow = document.querySelector(".doctor-arrow");

    if (doctorCard) {
        doctorCard.addEventListener("click", (e) => {
            if (e.target.closest("a") || e.target.closest("button")) return;
            doctorCard.classList.toggle("doctor-selected");
        });
    }

    if (doctorArrow) {
        doctorArrow.addEventListener("click", (e) => {
            e.preventDefault();

            const contactSection = document.querySelector("#contact");

            if (contactSection) {
                const navbar = document.querySelector(".navbar");
                const navbarHeight = navbar ? navbar.offsetHeight : 0;

                const position =
                    contactSection.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });
            }
        });
    }

    const pricingButtons = document.querySelectorAll(".pricing-button");

    pricingButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const contactSection = document.querySelector("#contact");

            if (!contactSection) return;

            const navbar = document.querySelector(".navbar");
            const navbarHeight = navbar ? navbar.offsetHeight : 0;

            const position =
                contactSection.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: position,
                behavior: "smooth"
            });
        });
    });

    const formInputs = document.querySelectorAll(
        ".appointment-card input, .appointment-card select, .appointment-card textarea"
    );

    formInputs.forEach((input) => {
        input.addEventListener("focus", () => {
            if (input.parentElement) {
                input.parentElement.classList.add("input-focused");
            }
        });

        input.addEventListener("blur", () => {
            if (input.parentElement) {
                input.parentElement.classList.remove("input-focused");
            }
        });
    });

    const yearElement = document.querySelector("#currentYear");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {
        function updateBackToTop() {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        }

        window.addEventListener("scroll", updateBackToTop);
        updateBackToTop();

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (appointmentForm) {
        const emailInput = appointmentForm.querySelector('input[name="email"]');

        if (emailInput) {
            emailInput.addEventListener("blur", () => {
                const email = emailInput.value.trim();

                if (
                    email !== "" &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                ) {
                    emailInput.setCustomValidity("Please enter a valid email address.");
                } else {
                    emailInput.setCustomValidity("");
                }
            });
        }
    }

    if (appointmentForm) {
        const phoneInput = appointmentForm.querySelector('input[name="phone"]');

        if (phoneInput) {
            phoneInput.addEventListener("input", () => {
                phoneInput.value = phoneInput.value.replace(/[^0-9+\-\s()]/g, "");
            });
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const openModal = document.querySelector(".modal.show");

            if (openModal && typeof bootstrap !== "undefined") {
                const modal = bootstrap.Modal.getInstance(openModal);

                if (modal) {
                    modal.hide();
                }
            }
        }
    });

    console.log("%cDENTIVA", "color:#0ea5e9;font-size:24px;font-weight:bold;");
    console.log("DENTIVA website loaded successfully.");
});
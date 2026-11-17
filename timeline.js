document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector(".timeline-section");
    const timelineList = document.querySelector(".timeline-list");
    const timelineItems = document.querySelectorAll(".timeline-item");

    if (!timeline || !timelineList || timelineItems.length === 0) {
        return;
    }

    const progressLine = document.createElement("div");
    progressLine.className = "timeline-progress-line";
    timelineList.appendChild(progressLine);

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15
            }
        );

        timelineItems.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        timelineItems.forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    let ticking = false;

    function updateTimelineProgress() {
        const timelineRect = timelineList.getBoundingClientRect();
        const timelineTop = window.scrollY + timelineRect.top;
        const timelineHeight = timelineList.offsetHeight;
        const viewportPosition = window.scrollY + window.innerHeight * 0.65;

        let progress = timelineHeight > 0
            ? (viewportPosition - timelineTop) / timelineHeight
            : 0;

        progress = Math.max(0, Math.min(progress, 1));

        progressLine.style.height = (progress * 100) + "%";

        ticking = false;
    }

    function requestProgressUpdate() {
        if (!ticking) {
            window.requestAnimationFrame(updateTimelineProgress);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestProgressUpdate, {
        passive: true
    });

    window.addEventListener("resize", requestProgressUpdate);

    updateTimelineProgress();
});
// --- LOGIC ---

let revealedCount = 0;
let currentScreen = 1;

function nextScreen(screenNumber) {
  // Exit animation for current screen
  const currentScreenEl = document.getElementById("screen" + currentScreen);
  const nextScreenEl = document.getElementById("screen" + screenNumber);

  // Determine exit direction
  const exitClass = screenNumber > currentScreen ? "exit-left" : "exit-right";

  // Add exit animation to current screen
  currentScreenEl.classList.add(exitClass);

  // After a delay, switch screens
  setTimeout(() => {
    // Hide all screens
    document.querySelectorAll(".screen").forEach((s) => {
      s.classList.remove("active", "exit-left", "exit-right");
    });

    // Show target screen
    nextScreenEl.classList.add("active");
    currentScreen = screenNumber;

    // Add sparkles to snowman screen
    if (screenNumber === 2) {
      createSparkles();
    }
  }, 500);
}

function revealCard(cardElement) {
  if (!cardElement.classList.contains("revealed")) {
    cardElement.classList.add("revealed");
    revealedCount++;

    // Add a nice effect when card is revealed
    cardElement.style.transform = "translateY(-10px) scale(1.1)";
    setTimeout(() => {
      cardElement.style.transform = "translateY(0) scale(1)";
    }, 300);

    // If all 5 cards are revealed, show the next button
    if (revealedCount === 5) {
      const btn = document.getElementById("finishCardsBtn");
      btn.classList.add("show");

      // Add confetti effect
      createConfetti();
    }
  }
}

function openLetter() {
  document.getElementById("letterModal").classList.add("open");
}

function closeLetter() {
  document.getElementById("letterModal").classList.remove("open");
}

// --- CREATE SNOWFLAKES ---
function createSnow() {
  const container = document.getElementById("snowContainer");
  const snowflakeCount = 80;

  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Random size between 2px and 8px
    const size = Math.random() * 6 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Random position
    snowflake.style.left = Math.random() * 100 + "%";

    // Random animation duration between 5s and 15s
    const duration = Math.random() * 10 + 5;
    snowflake.style.animationDuration = `${duration}s`;

    // Random animation delay
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    // Random opacity
    snowflake.style.opacity = Math.random() * 0.7 + 0.3;

    container.appendChild(snowflake);
  }
}

// --- CREATE SPARKLES FOR SNOWMAN ---
function createSparkles() {
  const container = document.getElementById("sparklesContainer");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    // Random position around snowman
    const angle = Math.random() * Math.PI * 2;
    const radius = 80 + Math.random() * 40;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;

    sparkle.style.left = `${x}%`;
    sparkle.style.top = `${y}%`;

    // Random size
    const size = Math.random() * 6 + 4;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;

    // Random animation delay
    sparkle.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(sparkle);
  }
}

// --- CREATE CONFETTI EFFECT ---
function createConfetti() {
  const container = document.querySelector(".container");

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.background = getRandomColor();
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-20px";
    confetti.style.zIndex = "5";
    confetti.style.opacity = "0.8";

    // Add animation
    confetti.style.animation = `confettiFall ${
      Math.random() * 2 + 2
    }s linear forwards`;

    container.appendChild(confetti);

    // Remove confetti after animation completes
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }

  // Add CSS for confetti animation if not already present
  if (!document.getElementById("confetti-style")) {
    const style = document.createElement("style");
    style.id = "confetti-style";
    style.textContent = `
                    @keyframes confettiFall {
                        0% { transform: translateY(0) rotate(0deg); }
                        100% { transform: translateY(100vh) rotate(${
                          Math.random() * 360
                        }deg); }
                    }
                `;
    document.head.appendChild(style);
  }
}

function getRandomColor() {
  const colors = [
    "#ff6b6b",
    "#ffa726",
    "#66bb6a",
    "#42a5f5",
    "#ab47bc",
    "#ffd54f",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  createSnow();
  createSparkles();

  // Add some interactive snow effect on click
  document.addEventListener("click", (e) => {
    // Create a ripple effect at click position
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.border = "2px solid rgba(255, 255, 255, 0.5)";
    ripple.style.width = "0";
    ripple.style.height = "0";
    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.zIndex = "1";
    ripple.style.pointerEvents = "none";

    document.body.appendChild(ripple);

    // Animate ripple
    const animation = ripple.animate(
      [
        { width: "0", height: "0", opacity: 1 },
        { width: "100px", height: "100px", opacity: 0 },
      ],
      {
        duration: 800,
        easing: "ease-out",
      }
    );

    animation.onfinish = () => ripple.remove();
  });
});

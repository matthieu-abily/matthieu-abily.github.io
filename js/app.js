function rand(min, max, floored = false) {
    var v = Math.random() * (max - min + 1) + min;
    if (floored) v = Math.floor(v);
    return v;
}

function prepareTextForGlitch(div) {
    var text = div.textContent;
    var splitText = text.split('');
    div.textContent = '';
    for (var j = 0; j < splitText.length; j++) {
        if (splitText[j] === ' ') {
            div.innerHTML += ' ';
        } else {
            div.innerHTML += '<span>' + splitText[j] + '</span>';
        }
    }
    var spans = div.getElementsByTagName('span');
    return spans;
}

function glitchCharacter(span, iterations) {
    if (iterations < 0) {
        span.style.transform = 'translate(0, 0)';
        span.style.color = '';
        span.style.fontFamily = '';
        span.style.textShadow = '';
        return;
    }

    span.style.transform = `translate(${rand(-20, 20, true)}px, ${rand(-20, 20, true)}px)`;
    // span.style.color = `rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`;
    span.style.fontFamily = `'Courier New', Courier, monospace`;
    span.style.textShadow = `${rand(-2, 2)}px ${rand(-2, 2)}px 2px rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.5)`;

    setTimeout(function() {
        glitchCharacter(span, iterations - 1)
    }, 50);
}

function glitchText(spans, numberGlitches = 3, delayMin = 0, delayMax = 500) {
    for (var i = 0; i < rand(1, 3, true); i++) {
        var spanIndex = rand(0,  spans.length - 1, true);
        setTimeout(glitchCharacter, rand(delayMin, delayMax), spans[spanIndex], rand(0, numberGlitches, true));
    }
}

function glitchTextClock(spans) {
    setInterval(function() {
        glitchText(spans);
    }, rand(1500, 3000));
}

// glitch effect
function glitch() {
    var glitch = document.getElementsByClassName('glitched-text-clock');
    for (var i = 0; i < glitch.length; i++) {
        spans = prepareTextForGlitch(glitch[i]);
        glitchTextClock(spans);
    }

    var glitchOver = document.getElementsByClassName('glitched-text-over');
    for (var i = 0; i < glitchOver.length; i++) {
        spans = prepareTextForGlitch(glitchOver[i]);
        glitchOver[i].addEventListener("mouseenter", (function(local_spans) {
            return function() {
                glitchText(local_spans, 5, 0, 100);
            }
        })(spans));
    }
}

// Progressive image loading
document.addEventListener('DOMContentLoaded', function() {
  const progressiveImages = document.querySelectorAll('.progressive-image');
  
  progressiveImages.forEach(img => {
    const originalSrc = img.getAttribute('data-original');
    if (!originalSrc) return;

    // Create a new image element to load the original in the background
    const originalImage = new Image();
    originalImage.src = originalSrc;
    
    // When the original image loads, replace the source
    originalImage.onload = function() {
      img.src = originalSrc;
    };

    // If the WebP fails to load, switch to original immediately
    img.onerror = function() {
      img.src = originalSrc;
    };
  });
});

window.addEventListener("load", function() {
    glitch();
});
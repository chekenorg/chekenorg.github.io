
    (() => {
      'use strict';
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const toggle = document.getElementById('navToggle');
      const nav = document.getElementById('siteNav');
      const links = [...nav.querySelectorAll('a')];
      const topButton = document.getElementById('toTop');
      const progress = document.getElementById('progress');
      const books = [...document.querySelectorAll('#bookCards .card')];
      const search = document.getElementById('bookSearch');
      const empty = document.getElementById('emptySearch');

      document.getElementById('year').textContent = new Date().getFullYear();

      function closeMenu() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        toggle.textContent = '☰';
      }
      toggle.addEventListener('click', () => {
        const opened = nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(opened));
        toggle.setAttribute('aria-label', opened ? 'Close navigation' : 'Open navigation');
        toggle.textContent = opened ? '✕' : '☰';
      });
      links.forEach(link => link.addEventListener('click', closeMenu));
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
      document.addEventListener('click', e => { if (!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu(); });

      search.addEventListener('input', () => {
        const query = search.value.toLocaleLowerCase().trim();
        let visible = 0;
        books.forEach(card => {
          const match = card.textContent.toLocaleLowerCase().includes(query);
          card.hidden = !match;
          if (match) visible++;
        });
        empty.hidden = visible !== 0;
      });

      if ('IntersectionObserver' in window && !reduceMotion) {
        const revealObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -24px 0px', threshold: .06 });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
      } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      }

      if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(entries => {
          const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
          if (!visible) return;
          const id = visible.target.id;
          links.forEach(link => {
            if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current','location');
            else link.removeAttribute('aria-current');
          });
        }, { rootMargin: '-15% 0px -65% 0px', threshold:0 });
        document.querySelectorAll('#home,#books,#references,#coding,#math,#about').forEach(el => sectionObserver.observe(el));
      }

      let scrolling = false;
      function updateScroll() {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
        topButton.classList.toggle('visible', window.scrollY > 420);
        scrolling = false;
      }
      window.addEventListener('scroll', () => {
        if (!scrolling) { scrolling = true; requestAnimationFrame(updateScroll); }
      }, {passive:true});
      window.addEventListener('resize', updateScroll);
      updateScroll();
      topButton.addEventListener('click', () => window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));

      // Alt + W opens our original short story from any page where this is installed.
      document.addEventListener('keydown', event => {
        if (!event.altKey || event.ctrlKey || event.metaKey || event.key.toLowerCase() !== 'w') return;
        if (event.target.closest('input,textarea,select,[contenteditable="true"]')) return;
        event.preventDefault();
        window.location.assign('willow-pier.html#reader');
      });

      const mathForm = document.getElementById('mathForm');
      const mathMode = document.getElementById('mathMode');
      const mathQuestion = document.getElementById('mathQuestion');
      const mathAnswer = document.getElementById('mathAnswer');
      const mathFeedback = document.getElementById('mathFeedback');
      const mathCheck = document.getElementById('mathCheck');
      const mathNext = document.getElementById('mathNext');
      const mathScore = document.getElementById('mathScore');
      let mathResult = 0, mathAnswered = false, mathCorrect = 0, mathTried = 0;
      const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      function newMathQuestion() {
        const op = mathMode.value === 'mix' ? ['add','subtract','multiply'][randomInt(0,2)] : mathMode.value;
        let a = randomInt(2,25), b = randomInt(2,25), sign = '+';
        if (op === 'add') mathResult = a + b;
        if (op === 'subtract') {
          if (a < b) [a,b] = [b,a];
          mathResult = a - b;
          sign = '−';
        }
        if (op === 'multiply') {
          a = randomInt(2,12); b = randomInt(2,12);
          mathResult = a * b;
          sign = '×';
        }
        mathQuestion.textContent = `${a} ${sign} ${b} = ?`;
        mathAnswer.value = '';
        mathAnswered = false;
        mathCheck.disabled = false;
        mathFeedback.textContent = 'Solve the problem and check your answer.';
        mathFeedback.className = 'math-feedback';
      }
      mathForm.addEventListener('submit', event => {
        event.preventDefault();
        if (mathAnswered || mathAnswer.value === '') return;
        mathAnswered = true;
        mathTried++;
        if (Number(mathAnswer.value) === mathResult) {
          mathCorrect++;
          mathFeedback.textContent = '✓ Correct! Nice work.';
          mathFeedback.className = 'math-feedback correct';
        } else {
          mathFeedback.textContent = `Not quite — the answer is ${mathResult}. Try a new question!`;
          mathFeedback.className = 'math-feedback incorrect';
        }
        mathCheck.disabled = true;
        mathScore.textContent = `${mathCorrect} correct · ${mathTried} tried`;
      });
      mathNext.addEventListener('click', () => { newMathQuestion(); mathAnswer.focus(); });
      mathMode.addEventListener('change', newMathQuestion);
      newMathQuestion();

    })();
  
document.addEventListener('DOMContentLoaded', () => {
    // 1. Zmiana motywu (jasny / ciemny)
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtn.textContent = isDark ? 'Tryb jasny' : 'Tryb ciemny';
    });

    // 2. Zwijanie / rozwijanie sekcji
    const toggleButtons = document.querySelectorAll('.toggle-section-btn');
    toggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const content = card.querySelector('.card-content');
            content.classList.toggle('hidden');
            btn.textContent = content.classList.contains('hidden') ? 'Rozwiń' : 'Zwiń';
        });
    });

    // 3. Filtrowanie kompetencji
    const filterInput = document.getElementById('skill-filter');
    const skillItems = document.querySelectorAll('#skills-list li');

    filterInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        skillItems.forEach((item) => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? 'inline-block' : 'none';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const statusBox = document.getElementById('status-message');
    const root = document.getElementById('cv-root');

    fetch('./cv.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Błąd HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            statusBox.style.display = 'none';
            renderCV(data, root);
        })
        .catch((error) => {
            statusBox.textContent = `Nie udało się załadować danych CV. Szczegóły: ${error.message}`;
            statusBox.classList.add('error');
        });
});

function renderCV(data, container) {
    document.title = `${data.name} - Dynamiczne CV`;

    // Nagłówek
    const header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
        <div class="header-info">
            <h1>${data.name}</h1>
            <p class="subtitle">${data.role}</p>
        </div>
        <div class="header-actions">
            <button id="theme-toggle" class="btn" type="button">Tryb ciemny</button>
            <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">GitHub</a>
        </div>
    `;

    // Główna siatka
    const main = document.createElement('main');
    main.className = 'cv-grid';

    // Sekcja: O mnie
    const aboutSection = document.createElement('section');
    aboutSection.className = 'card full-width';
    aboutSection.innerHTML = `
        <h2>O mnie</h2>
        <p>${data.about}</p>
    `;

    // Sekcja: Doświadczenie
    const expSection = document.createElement('section');
    expSection.className = 'card';
    expSection.innerHTML = '<h2>Doświadczenie</h2>';
    data.experience.forEach((job) => {
        const article = document.createElement('article');
        article.className = 'item';
        article.innerHTML = `
            <h3>${job.position}</h3>
            <p class="meta">${job.company} | ${job.period}</p>
            <p>${job.description}</p>
        `;
        expSection.appendChild(article);
    });

    // Sekcja: Wykształcenie
    const eduSection = document.createElement('section');
    eduSection.className = 'card';
    eduSection.innerHTML = '<h2>Wykształcenie</h2>';
    data.education.forEach((edu) => {
        const article = document.createElement('article');
        article.className = 'item';
        article.innerHTML = `
            <h3>${edu.degree}</h3>
            <p class="meta">${edu.school} | ${edu.period}</p>
            <p>${edu.details}</p>
        `;
        eduSection.appendChild(article);
    });

    // Sekcja: Umiejętności
    const skillsSection = document.createElement('section');
    skillsSection.className = 'card full-width';
    skillsSection.innerHTML = '<h2>Umiejętności</h2>';
    const ul = document.createElement('ul');
    ul.className = 'skills-list';
    data.skills.forEach((skill) => {
        const li = document.createElement('li');
        li.textContent = skill;
        ul.appendChild(li);
    });
    skillsSection.appendChild(ul);

    main.append(aboutSection, expSection, eduSection, skillsSection);

    // Stopka
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = `<p>&copy; 2026 ${data.name} | Kontakt: ${data.email}</p>`;

    container.append(header, main, footer);

    // Obsługa przycisku zmiany motywu
    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggleBtn.textContent = isDark ? 'Tryb jasny' : 'Tryb ciemny';
    });
}

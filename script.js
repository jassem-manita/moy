var subjectsData = {
    MP: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique', 'Sti', 'Francais', 'Anglais'],
    PC: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique', 'Sti', 'Francais', 'Anglais'],
    PT: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique', 'Sti', 'Francais', 'Anglais']
};

function updateSubjects() {
    var major = document.getElementById('major').value;
    var year = document.getElementById('year').value;
    var subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';

    subjectsData[major].forEach(function (subject, index) {
        var subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = `<div class="subject">
                                    <h3>${subject}</h3>
                                    <label for="oral${index}">Orale :</label>
                                    <input type="number" id="oral${index}_y${year}" name="oral${index}" step="0.25" min="0" max="20" required>
                                    <label for="ds${index}">DS :</label>
                                    <input type="number" id="ds${index}_y${year}" name="ds${index}" step="0.25" min="0" max="20" required>
                                    <label for="exam${index}">Exam :</label>
                                    <input type="number" id="exam${index}_y${year}" name="exam${index}" step="0.25" min="0" max="20" required>
                                </div>`;
        subjectsContainer.appendChild(subjectDiv);
    });
}

function proceedToStep2() {
    var step1 = document.getElementById('step1');
    var step2 = document.getElementById('step2');
    step1.style.display = 'none';
    step2.style.display = 'block';

    updateSubjects();
}

function calculateGPA() {
    var major = document.getElementById('major').value;
    var year = document.getElementById('year').value;

    var subjects = subjectsData[major];
    var coefficients = [0.2, 0.3, 0.5]; // Coefficients for oral, DS, and Exam respectively

    var totalCredits = 0;
    var totalPoints = 0;

    subjects.forEach(function (subject, index) {
        var oral = parseFloat(document.getElementById(`oral${index}_y${year}`).value) || 0;
        var ds = parseFloat(document.getElementById(`ds${index}_y${year}`).value) || 0;
        var exam = parseFloat(document.getElementById(`exam${index}_y${year}`).value) || 0;

        totalCredits += 1; // 1 credit per subject

        totalPoints += (oral * coefficients[0] + ds * coefficients[1] + exam * coefficients[2]);
    });

    var semesterGPA = totalPoints / totalCredits;

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Moyenne de Semestre pour la filière ${major} en année ${year} : ${semesterGPA.toFixed(2)}</p>`;
}

var subjectsData = {
    MP: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'MSI', 'Informatique', 'Francais', 'Anglais'],
    PC: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'MSI', 'Informatique', 'Francais', 'Anglais'],
    PT: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'MSI', 'Informatique', 'Francais', 'Anglais']
};

function updateSubjects() {
    var major = document.getElementById('major').value;
    var year = document.getElementById('year').value;
    var subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';

    subjectsData[major].forEach(function (subject, index) {
        var subjectDiv = document.createElement('div');
        subjectDiv.innerHTML = '<label for="subject' + index + '">' + subject + ' :</label>' +
            '<input type="text" id="subject' + index + '_y' + year + '" name="subject' + index + '" required>';
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
    var coefficients = [7, 7, 8, 5, 5, 4, 3, 3];

    var totalCredits = 0;
    var totalPoints = 0;

    subjects.forEach(function (subject, index) {
        var grade = parseFloat(document.getElementById('subject' + index + '_y' + year).value);
        totalCredits += coefficients[index];
        totalPoints += grade * coefficients[index];
    });

    var semesterGPA = totalPoints / totalCredits;

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<p>Moyenne de Semestre pour la filière ' + major + ' en année ' + year + ' : ' + semesterGPA.toFixed(2) + '</p>';
}

var subjectsData = {
    '1': {
        MP: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique', 'Sti', 'Francais', 'Anglais'],
        PC: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique', 'Sti', 'Francais', 'Anglais'],
        PT: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique', 'Sti', 'Francais', 'Anglais']
    },
    '2': {
        MP: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique','Sti', 'Francais', 'Anglais'],
        PC: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique','Sti', 'Francais', 'Anglais'],
        PT: ['Algebre', 'Analyse', 'Physique', 'Chimie', 'Informatique','Sti', 'Francais', 'Anglais']
    }
};

var coefficients = {
    '1': {
        MP: [7, 7, 8, 4, 3, 5, 3, 3],
        PC: [5, 5, 10, 6, 3, 5, 3, 3],
        PT: [5, 5, 8, 4, 3, 9, 3, 3]
    },
    '2': {
        MP: [7, 7, 10, 4,3, 6, 3, 3],
        PC: [5, 5, 11, 6,3, 6, 3, 3],
        PT: [5, 5, 10, 4,3, 10, 3, 3]
    }
};

function updateSubjects() {
    var major = $('#major').val();
    var year = $('#year').val();
    var subjectsContainer = $('#subjectsContainer');
    subjectsContainer.html('');

    subjectsData[year][major].forEach(function (subject, index) {
        // Define emojis for each subject (customize as needed)
        var subjectEmojis = {
            'Algebre': '🧮',
            'Analyse': '📈',
            'Physique': '⚙️',
            'Chimie': '🧪',
            'Informatique': '💻',
            'Sti': '🛠️',
            'Francais': '📝',
            'Anglais': '🌐'
        };

        var emoji = subjectEmojis[subject] || '📚'; // Default emoji if not specified

        var subjectDiv = $(`<div class="subject animate__fadeInUp">
                                <h3>${subject} ${emoji}</h3>
                                <div class="input-group">
                                    <label for="oral${index}">Orale :</label>
                                    <input type="number" id="oral${index}_y${year}" name="oral${index}" step="0.25" min="0" max="20" value="0" required>
                                </div>
                                <div class="input-group">
                                    <label for="ds${index}">DS :</label>
                                    <input type="number" id="ds${index}_y${year}" name="ds${index}" step="0.25" min="0" max="20" value="0" required>
                                </div>
                                <div class="input-group">
                                    <label for="exam${index}">Exam :</label>
                                    <input type="number" id="exam${index}_y${year}" name="exam${index}" step="0.25" min="0" max="20" value="0" required>
                                </div>
                            </div>`);
        subjectsContainer.append(subjectDiv);
    });
}

function proceedToStep2() {
    var step1 = $('#step1');
    var step2 = $('#step2');
    step1.hide();
    step2.show();

    updateSubjects();
}

function calculateGPA() {
    var major = $('#major').val();
    var year = $('#year').val();

    var subjects = subjectsData[year][major];
    var currentCoefficients = coefficients[year][major];
    
    var totalCredits = 0;
    var totalPoints = 0;

    subjects.forEach(function (subject, index) {
        var oral = parseFloat($(`#oral${index}_y${year}`).val()) || 0;
        var ds = parseFloat($(`#ds${index}_y${year}`).val()) || 0;
        var exam = parseFloat($(`#exam${index}_y${year}`).val()) || 0;

        var subjectMoy = (oral * 0.2 + ds * 0.3 + exam * 0.5) * currentCoefficients[index];
        
        totalCredits += currentCoefficients[index]; // Sum of coefficients
        totalPoints += subjectMoy;
    });

    var semesterGPA = totalPoints / totalCredits;

    var resultDiv = $('#result');
    resultDiv.html(`<p>Moyenne de Semestre pour la filière ${major} en année ${year} : ${semesterGPA.toFixed(2)}</p>`);
}



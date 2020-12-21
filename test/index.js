(function() {
  var questions = [{
    question: "Ida menyukai pelajaran Matematika dan Bahasa Indonesia. Rudi menyukai pelajaran Bahasa Indonesia dan IPS. Bobi menyukai pelajaran Matematika dan IPS. Ayu hanya menyukai pelajaran Bahasa Indonesia. Anak yang menyukai pelajaran IPS adalah . . . . ",
    choices: ['a. Ida dan Rudi', 'b. Rudi dan Bobi', 'c. Bobi dan Ayu', 'd. Ida dan Ayu'],
    correctAnswer: 1
  }, {
    question: "Perhatikan diagram panah berikut! <br> <img src='foto.png'> Relasi yang tepat menghubungkan himpunan P dan Q adalah . . . .", 
    choices: ['a. akar dari', 'b. kuadrat dari', 'c. kelipatan dari', 'd. faktor prima dari'],
    correctAnswer: 0
  }, {
    question: "Diketahui M = {2, 3, 4, 5, 6} dan N = {63, 76, 92, 96}. Jika x &isin;  M, y &isin; N, dan relasi R dari himpunan N ke himpunan M adalah y habis dibagi x, banyak anggota himpunan R adalah . . . .", 
    choices: ['a. 6', 'b. 7', 'c. 8', 'd. 9'],
    correctAnswer: 3
  }, {
    question: "Perhatikan diagram panah berikut! <br> <img src='foto2.png'> Diagram panah yang merupakan fungsi adalah . . . . ", 
    choices: ['a. I dan II', 'b. I dan III', 'c. II dan III', 'd. II dan IV'],
    correctAnswer: 2
  }, {
    question: "Perhatikan himpunan pasangan berurutan berikut. <br> I.	{(x, a), (y, b), (z, c)} <br> II.	{(a, x), (b, x), (c, x)} <br> III.	{(x, a), (x, b), (x, c)} <br> IV.	{(a, x), (b, x), (b, x)} <br> Himpunan pasangan yang merupakan fungsi adalah . . . .",
    choices: ['a. I dan II', 'b. I dan III', 'c. II dan IV', 'd. III dan IV'],
    correctAnswer: 0
  }, {
    question: "Diketahui A = {1, 3, 4} dan B = {1, 2, 3, 5, 6}. Agar relasi himpunan A ke himpunan B merupakan fungsi, relasi yang tepat adalah . . . . ",
    choices: ['a. lebih dari', 'b. faktor dari', 'c. dua lebihnya dari', 'd. dua kurangnya dari'],
    correctAnswer: 3
  }, {
    question: "Diketahui A = {a, b, c} dan B = {1, 2, 3, 4, 5}. Banyak pemetaan yang mungkin dari himpunan B ke himpunan A adalah . . . . ",
    choices: ['a. 15', 'b. 32', 'c. 125', 'd. 243'],
    correctAnswer: 3
  }, {
    question: "Diketahui A = {2, 3, 5, 6} dan B = {a, b, c, d}. Banyak fungsi korespondensi satu-satu yang mungkin dari A ke B adalah . . . .",
    choices: ['a. 8', 'b. 16', 'c. 24', 'd. 30'],
    correctAnswer: 2
  }, {
    question: "Diketahui fungsi f(x) = 5x + 3. Hasil dari f(3b-3) adalah . . . .",
    choices: ['a. 15b + 8', 'b. 15b + 2', 'c. 15b - 4', 'd. 15b - 12'],
    correctAnswer: 3
  }, {
    question: "Diketahui fungsi f(x) = 7x - 5. Jika f(a) = 16, nilai a adalah . . . . ",
    choices: ['a. 2', 'b. 3', 'c. 6', 'd. 13'],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Jawaban tidak boleh kosong!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h3>Pertanyaan ' + (index + 1) + ':</h3>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#materi').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
        $('#materi').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Nilai Kamu ' + numCorrect * 10 + ' dari ' +
                 questions.length + ' pertanyaan, Lanjutkan ke Materi!');
    return score;
  }
})();
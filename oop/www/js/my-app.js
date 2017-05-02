// Initialize your app
var myApp = new Framework7({
    material: true,

    pushState: true,

    pushStateNoAnimation: true,
  
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },

    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    domChace: true,
    dynamicNavbar: true
});

//menu page

$$(document).on('pageInit', '.page[data-page="menu"]', function(e) {

    //do all thing here
    var link = ['materi', 'materi1', 'materi2', 'materi3', 'evaluasi'];

    var title = ['Konsep PBO', 'Class, Method, Objek', 'Enkapsulasi', 'Pewarisan', 'Evaluasi'];

    var item = '<ul>';

    for (var i = 0; i < link.length; i++) {
        item += '<a href="' + link[i] + '.html" style="color: black;">' +
                    '<li class="item-content">' +
                        '<div class="item-media">' +
                            '<img src="../www/img/oop-' + (i+1) + '.jpg" width="180">' +
                        '</div>' +
                        '<div class="item-inner">' +
                            '<div class="item-title">' + title[i] + '</div>' +
                        '</div>'  +
                    '</li>' +
                '</a>';
    }

    item += '</ul>';

    $$('#menu-search').append(item);

});


$$(document).on('pageInit', '.page[data-page="materi', function(e) {

    var mySwiper1 = myApp.swiper('.swiper-1', {
        pagination:'.swiper-pagination',
    });

    var mySwiper2 = myApp.swiper('.swiper-2', {
        pagination:'.swiper-pagination',
    });

});

//for "latihan"
//Latihan 1
$$(document).on('pageInit', '.page[data-page="latihan-1"]', function(e) {
    var page = e.detail.page;
    //do all thing here
    var pos = 0, test_status, question, choice, choices, correct = 0;
    var questions = [
        ["Salah satu konsep dasar objek adalah Has Behavior (because Object has Method), yaitu objek itu mempunyai prilaku atau sifat-sifat yang khusus.", "benar", "salah", "true"],
        ["Objek adalah perwujudan dari class, setiap objek mempunyai attribute dan method yang dimiliki oleh class-nya.", "benar", "salah", "true"],
        ["Pendekatan top-down  merupakan salah satu pendekatan yang terdapat dalam Pemrograman Berorientasi Objek ", "benar", "salah", "false"],
        ["Java merupakan salah satu bahasa pemrograman yang mendukung pemrograman berorientasi objek (OOP) ", "benar", "salah", "true"],
        ["Java Standart Development Kit (SDK) bukan merupakan kumpulan pustaka yang digunakan untuk mengembangkan aplikasi bahasa Java.", "benar", "salah", "false"]
    ];

    function renderQuestion() {
        console.log("renderQuestion called");        

        var test_status_inner = "Pertanyaan ke " + (pos + 1) + " dari " + questions.length;
        $$(page.container).find('#progress').html(test_status_inner);

        if(pos >= questions.length) {
            var item = '<div class="content-block">' +
                            '<div class="content-block-inner">' +
                                '<p>Jawaban Benar : ' + correct + '</p>' +
                                '<p>Jawaban Salah : ' + (questions.length - correct) + '</p>' +
                            '</div>' +
                            '<div class="content-block" style="color: #af36c6;">' +
                                '<h1 align="center" >Nilai kamu    : ' + (correct * 20) + '</h1>' +
                            '</div>' +
                        '</div>';

            $$(page.container).find('#quiz').html(item);
            pos = 0;
            correct = 0;
            return true;
        }

        question = questions[pos][0];
         $$(page.container).find('#question').html(question);

        for(var i = 0; i < questions[pos].length; i++) {
             $$(page.container).find('#choice' + (i+1)).html(questions[pos][i+1]);
        }

    }

    function checkAnswer() {
        console.log("checkAnswer called");
        console.log("before :" +pos);
        choice = $$(page.container).find('input[name="my-radio"]:checked').val();

        if(choice == questions[pos][3]) {
            correct++;
            myApp.alert('Kamu benar', 'Hore!!');
        }
        else {
            myApp.alert('Kamu salah/belum menjawab', 'Yahh!');
        }

        pos++;
        console.log("after :" +pos);
        renderQuestion();

    }

    if(pos == 0) {
        renderQuestion();
    }

    $$(page.container).find('#submit_btn').click(function() {
        console.log("called twice");
        checkAnswer();
    });

});

//latihan 2
$$(document).on('pageInit', '.page[data-page="latihan-2"]', function(e) {
    // do all thing here
    var answer = ['public', 'static', 'new'];
    var submit = [];
    var correct = 0;

    function fillAnswer() {
        for(var i = 0; i < 3; i++) {
            submit[i] = $$('input[name="kode-'+(i + 1)+'"]').val();
            console.log(submit[i]);
        }

        return submit;
    }

    function checkAnswer() {
        for(var i = 0; i < answer.length; i++) {
            if(answer[i] == submit[i]) {
                myApp.alert('Jawaban benar', 'Jawaban Kode ('+(i + 1)+')');
                switch(i) {
                    case 0:
                        correct += 30;
                        break;
                    case 1:
                        correct += 30;
                        break;
                    case 2:
                        correct += 40;
                       break;
                }

            }
            else if(submit[i] == '') {
                myApp.alert('Jawaban kosong', 'Jawaban Kode ('+(i + 1)+')');
            }
            else{
                myApp.alert('Jawaban salah<br> jawaban benar : <b>'+answer[i]+'</b>', 'Jawaban Kode ('+(i + 1)+')');
            }
        }

        myApp.alert('<h1><center>'+(correct)+'</center></h1>', 'Total Nilai');

    }

    $$('#btn-submit').on('click', function() {
        fillAnswer();
        checkAnswer();
        correct = 0;
    });

});

//latihan 3
$$(document).on('pageInit', '.page[data-page="latihan-3"]', function(e) {

    // do all thing here
    var page = e.detail.page;
    //do all thing here
    var pos = 0, test_status, question, choice, choices, correct = 0;
    var questions = [
        ["Enkapsulasi merupakan teknik yang membuat variabel/field class menjadi bersifat privat.", "benar", "salah", "true"],
        ["Hak akses protected dapat diakses oleh sembarang object manapun dan dimanapun posisinya serta dengan apapun caranya.", "benar", "salah", "false"],
        ["Hak akses publik hanya ditujukan untuk class yang ada dalam satu paket.", "benar", "salah", "false"],
        ["Manfaat utama enkapsulasi adalah agar mampu memodifikasi kode tanpa merusak kode yang digunakan pada class lain.", "benar", "salah", "true"],
        ["Terdapat 4 macam access modifiers di JAVA, yaitu : public, private, protected dan default.", "benar", "salah", "true"]
    ];

    function renderQuestion() {
        console.log("renderQuestion called");        

        var test_status_inner = "Pertanyaan ke " + (pos + 1) + " dari " + questions.length;
        $$(page.container).find('#progress').html(test_status_inner);

        if(pos >= questions.length) {
            var item = '<div class="content-block">' +
                            '<div class="content-block-inner">' +
                                '<p>Jawaban Benar : ' + correct + '</p>' +
                                '<p>Jawaban Salah : ' + (questions.length - correct) + '</p>' +
                            '</div>' +
                            '<div class="content-block" style="color: #af36c6;">' +
                                '<h1 align="center" >Nilai kamu    : ' + (correct * 20) + '</h1>' +
                            '</div>' +
                        '</div>';

            $$(page.container).find('#quiz').html(item);
            pos = 0;
            correct = 0;
            return true;
        }

        question = questions[pos][0];
         $$(page.container).find('#question').html(question);

        for(var i = 0; i < questions[pos].length; i++) {
             $$(page.container).find('#choice' + (i+1)).html(questions[pos][i+1]);
        }

    }

    function checkAnswer() {
        console.log("checkAnswer called");
        console.log("before :" +pos);
        choice = $$(page.container).find('input[name="my-radio"]:checked').val();

        if(choice == questions[pos][3]) {
            correct++;
            myApp.alert('Kamu benar', 'Hore!!');
        }
        else {
            myApp.alert('Kamu salah/belum menjawab', 'Yahh!');
        }

        pos++;
        console.log("after :" +pos);
        renderQuestion();

    }

    if(pos == 0) {
        renderQuestion();
    }

    $$(page.container).find('#submit_btn').click(function() {
        console.log("called twice");
        checkAnswer();
    });

});

//latihan 4
$$(document).on('pageInit', '.page[data-page="latihan-4"]', function(e) {

    //do all thing here
    var page = e.detail.page;
    //do all thing here
    var pos = 0, test_status, question, choice, choices, correct = 0;
    var questions = [
        ["Inheritance merupakan proses pewarisan data dan method dari suatu class yang telah ada kepada suatu class baru.", "benar", "salah", "true"],
        ["Aksesbilitas Default : class yang bisa mengakses adalah class yang sama dan class dari package yang sama.", "benar", "salah", "true"],
        ["Nama method konstruktor tidak sama dengan nama kelasnya.", "benar", "salah", "false"],
        ["Keyword <b>super</b> digunakan oleh subclass untuk memanggil konstruktor yang berada pada subclass lain.", "benar", "salah", "false"],
        ["Pewarisan bertingkat adalah dimana Superclass mewarisi subclass, subclass tersebut memiliki subclass juga begitu seterusnya.", "benar", "salah", "true"]
    ];

    function renderQuestion() {
        console.log("renderQuestion called");        

        var test_status_inner = "Pertanyaan ke " + (pos + 1) + " dari " + questions.length;
        $$(page.container).find('#progress').html(test_status_inner);

        if(pos >= questions.length) {
            var item = '<div class="content-block">' +
                            '<div class="content-block-inner">' +
                                '<p>Jawaban Benar : ' + correct + '</p>' +
                                '<p>Jawaban Salah : ' + (questions.length - correct) + '</p>' +
                            '</div>' +
                            '<div class="content-block" style="color: #af36c6;">' +
                                '<h1 align="center" >Nilai kamu    : ' + (correct * 20) + '</h1>' +
                            '</div>' +
                        '</div>';

            $$(page.container).find('#quiz').html(item);
            pos = 0;
            correct = 0;
            return true;
        }

        question = questions[pos][0];
         $$(page.container).find('#question').html(question);

        for(var i = 0; i < questions[pos].length; i++) {
             $$(page.container).find('#choice' + (i+1)).html(questions[pos][i+1]);
        }

    }

    function checkAnswer() {
        console.log("checkAnswer called");
        console.log("before :" +pos);
        choice = $$(page.container).find('input[name="my-radio"]:checked').val();

        if(choice == questions[pos][3]) {
            correct++;
            myApp.alert('Kamu benar', 'Hore!!');
        }
        else {
            myApp.alert('Kamu salah/belum menjawab', 'Yahh!');
        }

        pos++;
        console.log("after :" +pos);
        renderQuestion();

    }

    if(pos == 0) {
        renderQuestion();
    }

    $$(page.container).find('#submit_btn').click(function() {
        console.log("called twice");
        checkAnswer();
    });

});

//page "evaluasi"

$$(document).on('pageInit', '.page[data-page="evaluasi"]', function(e) {

    var page = e.detail.page;
    //do all thing here
    var pos = 0, test_status, question, choice, choices, correct = 0;
    var questions = [
        ["Karakteristik bahasa pemrograman berorientasi objek yang menyembunyikan data, fungsi dan prosedur dalam objek adalah ...", "A. Polimorphism", "B. Enkapsulasi", "C. Modular", "D. Inheritence", "E. Modifier", "B"],
        ["Berikut ini adalah hak akses yang dapat ditambahkan di depan method Java, kecuali", "A. rotected", "B. Default", "C. Private", "D. Static", "E. Public", "D"],
        ["Manfaat dari teknik enkapsulasi adalah, kecuali ...", "A. Variabel/field class bersifat privat", "B. Information hidding", "C. Memodifikasi kode tanpa merusak kode yang class lain", "D. Perubahan internal sebuah class berpengaruh bagi class yang menggunakannya", "E. Modularitas", "D"],
        ["Access modifier yang metertulis secara eksplisit diantaranya adalah, kecuali ...", "A. Public", "B. Private", "C. Default", "D. Protected", "E. Semua Salah", "C"],
        ["Modifier yang digunakan untuk mencegah kemungkinan modifikasi terhadap atribut maupun method adalah ...", "A. Static", "B. Final", "C. Protected", "D. Default", "E. Public", "B"],
        ["Sintaks java untuk melakukan kompilasi terhadap berkas program adalah :", "A. Java", "B. Javac", "C. Javaclass", "D. Javax", "E. Javacompile", "B"],
        ["Sebutkan tiga prinsip utama dalam Pemrograman Berorientasi Obyek ...", "A. Public, Protected, Class", "B. Polimorphism, Class, Private", "C. Inheritance, Extend, Enkapsulasi", "D. Enkapsulasi, Polimorphism, Extend", "E. Inheritance, Polimorphism, Enkapsulasi", "E"],
        ["Meningkatkan extensibilitas dan penggunaan kembali perangkat lunak merupakan tujuan dari ...", "A. Pemrograman Dasar", "B. Pemrograman Terstruktur", "C. Pemrograman Modular", "D. Pemrograman Berorientasi Objek", "E. Pemrograman Top Down", "D"],
        ["Di bawah ini pernyataan yang benar tentang metode dan objek, kecuali ...", "A. Nama metode harus diletakkan sebelum nama objek yang memiliki metode tersebut", "B. Metode didefinisikan secara penuh diluar objek", "C. Metode merupakan suatu procedure atau fungsi yang disatukan dalam suatu objek", "D. Dalam sebuah objek suatu meotde didefinisikan dengan suatu header fungsi", "E. Metode didefinisikan dengan prosedur dalam sebuah objek", "A"],
        ["Berikut adalah penamaan class yang dierbolehkan dalam java, kecuali ..", "A. One_3", "B. Bet4", "C. 7o_jo", "D. Yan1", "E. Horee_", "C"],
        ["Berikut ini pernyataan yang benar berhubungan dengan class dan object dalam Java, kecuali ...", "A. Setiap class dapat mengandung beberapa method sekaligus", "B. Object merupakan instance dari class", "C. Object terdiri dari keyword dan method", "D. Class merupakan contoh abstrak dari sebuah object yang telah terbentuk dari proses penyederhanaan", "E. Class merupakan pendefinisian dari object", "C"],
        ["Mobil berwarna merah melaju dengan cepat. Dari kalimat tersebut yang merupakan contoh karakteristik objek behavior, yaitu ...", "A. Mobil", "B. Cepat", "C. Berwarna", "D. Merah", "E. Melaju", "E"],
        ["Method yang namanya sama dengan nama kelas disebut ...", "A. Constructor", "B. Rekursive", "C. Loop", "D. Factorial", "E. Atribut", "A"],
        ["Abstract Class ditulis dengan ...", "A. Cetak tebal", "B. Garis bawah", "C. Kutip dua", "D. Miring", "E. Cetak tebal dan huruf kapital", "D"],
        ["Class yang harus didefinisikan sebagai satu set karakter yang unik yang membedakannya dengan class-class lain dalam hierarki disebut dengan ...", "A. Dependant", "B. Abstract", "C. Private", "D. Adjoint", "E. Disjoint", "E"],
        ["Method yang digunakan untuk membandingkan dua buah string adalah ...", "A. concat()", "B. equal()", "C. equals()", "D. substring()", "E. loop()", "C"],
        ["Method dibawah ini yang tidak mengembalikan nilai yaitu ...", "A. int kosong()", "B. void cetak()", "C. int konversi()", "D. double emptyFunction()", "E. semua benar", "B"],
        ["Untuk mendeklarasikan suatu class sebagai subclass yaitu dengan menambahkan kata kunci ...", "A. Extends setelah deklarasi nama class", "B. Abstract setelah deklarasi nama class", "C. Private setelah deklarasi nama class", "D. Double setelah deklarasi nama class", "E. Semua salah", "A"],
        ["Diantara pernyataan berikut, konsep yang tidak ada di dalam pemrograman Java adalah ...", "A. Polymorphism", "B.  Encapsulation", "C. Multiple Inheritance", "D. Single Inheritance", "E. Inheritance", "C"],
        ["Class yang mewariskan disebut dengan ...", "A. Subclass", "B. Abstract Class", "C. Inheritance Class", "D. Parent Class", "E. Child Class", "D"]

    ];

    function renderQuestion() {
        console.log("renderQuestion called");        

        var test_status_inner = "Pertanyaan ke " + (pos + 1) + " dari " + questions.length;
        $$(page.container).find('#progress').html(test_status_inner);

        if(pos >= questions.length) {
            var item = '<div class="content-block">' +
                            '<div class="content-block-inner">' +
                                '<p>Jawaban Benar : ' + correct + '</p>' +
                                '<p>Jawaban Salah : ' + (questions.length - correct) + '</p>' +
                            '</div>' +
                            '<div class="content-block" style="color: #af36c6;">' +
                                '<h1 align="center" >Nilai kamu    : ' + (correct * 5) + '</h1>' +
                            '</div>' +
                        '</div>';

            $$(page.container).find('#quiz').html(item);
            pos = 0;
            correct = 0;
            return true;
        }

        question = questions[pos][0];
         $$(page.container).find('#question').html(question);

        for(var i = 0; i < questions[pos].length; i++) {
             $$(page.container).find('#choice' + (i+1)).html(questions[pos][i+1]);
        }

    }

    function checkAnswer() {
        console.log("checkAnswer called");
        console.log("before :" +pos);
        choice = $$(page.container).find('input[name="my-radio"]:checked').val();

        if(choice == questions[pos][6]) {
            correct++;
            myApp.alert('Kamu benar', 'Hore!!');
        }
        else {
            myApp.alert('Kamu salah/belum menjawab</br> jawaban benar '+questions[pos][6], 'Yahh!');
        }

        pos++;
        console.log("after :" +pos);
        renderQuestion();

    }

    if(pos == 0) {
        renderQuestion();
    }

    $$(page.container).find('#submit_btn').click(function() {
        console.log("called twice");
        checkAnswer();
    });

});
// ==========================================
// 1. カセット（章のデータ）をまとめる準備
// ==========================================
const allChapters = {
    "1": chapter1,
    "2": chapter2,
    "3": chapter3,
    "4": chapter4,
    "5": chapter5,
    "6": chapter6,
    "7": chapter7,
    "8": chapter8,
    "9": chapter9,
    "10": chapter10,
    "11": chapter11,
    "12": chapter12,
    "13": chapter13,
    "14": chapter14 // ← ここに14章を追加しました！
};

// 今どの章の、どのページを開いているかの状態を覚えておく変数です。
let currentChapterNumber = "1"; // 最初は「1章」
let slides = allChapters[currentChapterNumber]; // 最初は「1章のデータ」
let currentIndex = 0; // ページ番号（0が1ページ目です）

// ==========================================
// 2. 画面の部品（HTML）を操作する準備
// ==========================================
const chapterSelect = document.getElementById("chapter-select"); // 章を選ぶメニュー
const slideContent = document.getElementById("slide-content"); // 解説文のエリア
const pageNum = document.getElementById("page-num"); // ページ番号のテキスト
const codeEditor = document.getElementById("code-editor"); // コードを書くエリア
const resultFrame = document.getElementById("result-frame"); // 結果を表示するエリア

// ==========================================
// 3. 画面を動かす仕組み（機能）
// ==========================================

// ① スライドを画面に表示する機能
function showSlide(index) {
    const slide = slides[index];
    
    // タイトルと解説文をセット
    slideContent.innerHTML = `<h2>${slide.id} ${slide.title}</h2><p>${slide.content}</p>`;
    // ページ番号をセット
    pageNum.innerText = slide.id;
    // エディタに初期コードをセット
    codeEditor.value = slide.initialCode;
    // 結果画面を更新
    updateResult();
}

// ② 書かれたコードを右下の「実行結果」に反映する機能
function updateResult() {
    const code = codeEditor.value;
    const resultDocument = resultFrame.contentDocument || resultFrame.contentWindow.document;
    resultDocument.open();
    resultDocument.write(code);
    resultDocument.close();
}

// ==========================================
// 4. ボタンなどが押されたときの処理（イベント）
// ==========================================

// 「章を選ぶメニュー」が変更されたときの処理
chapterSelect.addEventListener("change", (event) => {
    currentChapterNumber = event.target.value; 
    slides = allChapters[currentChapterNumber];
    currentIndex = 0;
    showSlide(currentIndex);
});

// 「次へ」ボタンを押したときの処理
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentIndex < slides.length - 1) { 
        currentIndex++; 
        showSlide(currentIndex); 
    }
});

// 「前へ」ボタンを押したときの処理
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentIndex > 0) { 
        currentIndex--; 
        showSlide(currentIndex); 
    }
});

// コード入力欄の文字が書き換えられるたびに、結果画面を更新する処理
codeEditor.addEventListener("input", updateResult);

// ==========================================
// 5. 最初の起動
// ==========================================
showSlide(currentIndex);
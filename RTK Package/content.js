var wordMap = {
  "one" : "一",
  "two" : "二",
  "three" : "三",
  "four" : "四",
  "five" : "五",
  "six" : "六",
  "seven" : "七",
  "eight" : "八",
  "nine" : "九",
  "ten" : "十",
  "hundred" : "百",
  "thousand" : "千",
  "ten thousand" : "万",
  "day" : "日",
  "month" : "月",
  "in" : "中",
  "above" : "上",
  "below" : "下",
  "right" : "右",
  "left" : "左",
  "eye" : "目",
  "mouth" : "口",
  "rice field" : "田",
  "woman" : "女",
  "child" : "子",
  "fond" : "好",
  "beginning" : "元",
  "bright" : "明",
  "morning" : "朝",
  "see" : "見",
  "employee" : "員",
  "craft" : "工",
  "generation" : "世",
  "white" : "白",
  "possess" : "有",
  "goods" : "品",
  "old" : "古",
  "can" : "可",
  "village" : "町",
  "street" : "丁",
  "defeat" : "負",
  "rule" : "則",
  "cut" : "切",
  "early" : "早",
  "true" : "真",
  "straightaway" : "直",
  "oneself" : "自",
  "separate" : "別",
  "specialty" : "専",
  "bull's eye" : "的",
  "tool" : "具",
  "neck" : "首",
  "riot" : "乱",
  "paragraph" : "項",
  "vice-" : "副",
  "rise up" : "昇",
  "fortune-telling" : "占",
  "complete" : "了",
  "stomach" : "胃",
  "dr\\." : "博",
  "round" : "丸",
  "sword" : "刀",
  "blade" : "刃",
  "tongue" : "舌",
  "texture" : "肌",
  "gall bladder" : "胆",
  "phrase" : "句",
  "decameron" : "旬",
  "mediocre" : "凡",
  "olden times" : "旧",
  "newborn babe" : "児",
  "measurement" : "寸",
  "eminent" : "卓",
  "shellfish" : "貝",
  "bribe" : "賄",
  "stubborn" : "頑",
  "place on the head" : "頂",
  "page" : "頁",
  "risk" : "冒",
  "chant" : "唱",
  "sparkle" : "晶",
  "spine" : "呂",
  "seduce" : "召",
  "shining" : "昭",
  "likeness" : "如",
  "upright" : "貞",
  "tribute" : "貢",
  "measuring box" : "升",
  "concave" : "凹",
  "convex" : "凸",
  "fish guts" : "乙",
  "ladle" : "勺",
  "cavity" : "孔",
  "i" : "吾",
  "companion" : "朋",
  "prosperous" : "昌",
  "rising sun" : "旭",
  "nightbreak" : "旦",
  "span" : "亘",
  "only" : "只",
};

// set a timer for testing
var startTime = performance.now()

// join the words in the word map by "|" for RegExp
var wordMapJoin = Object.keys(wordMap).join('|');
var regex = new RegExp('\\b(' + wordMapJoin + ')\\b', 'ig');

// create a tree tree walker and initialize text nodes
var treeEnt = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
var textNodes = [];
while (treeEnt.nextNode()){
  textNodes.push(treeEnt.currentNode);
}

// iterate over the text nodes 
for (var i = 0, len = textNodes.length; i < len; i++){
  if (textNodes[i].nodeValue.match(regex) === null) continue;
  // https://stackoverflow.com/questions/26030209/html-and-js-surrounding-every-word-in-the-document-with-a-span-tag
  replacer = textNodes[i].nodeValue.replace(regex,
    function(match){
      // short this function
      var kanjiMatch = wordMap[match.toLowerCase()];
      console.log("the name of the match: " + match + ": " + kanjiMatch);
      return wordMap[match.toLowerCase()];
      // keeping this here to read later, dead end code
      var toolTipInsert = "kanjiMatch";
      return toolTipInsert;
    });

  var template = document.createElement('template');
  template.innerHTML = replacer;

  textNodes[i].parentNode.insertBefore(template.content, textNodes[i]);
  textNodes[i].parentNode.removeChild(textNodes[i]);

}

// print the execution time to console
var executionTime = performance.now() - startTime;
console.log("mapped words in " + executionTime + " ms");

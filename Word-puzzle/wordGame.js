
    var arr_1;
    fetch("./words_dictionary.json")
    .then(response => {
       return response.json();
    })
    .then(data => { arr_1=JSON.parse(JSON.stringify(data)) });
   // arr_1 has all the words from dictinory 
   // findWord func contains the logic to find the words

    function displayGame() {
      const roWs= document.getElementById("Rows").value;
      const colUmns= document.getElementById("Columns").value;
      const elem= document.getElementById("GamePlace");
      elem.style.gridTemplateColumns=`repeat(${colUmns}, 40px)`;
      elem.style.gridTemplateRows= `repeat(${roWs}, 20px)`;
      for(let r=1; r<=roWs; r++) {
         for(let c=1; c<=colUmns; c++) {
           var rc= `${r}${c}`;
           var block= document.createElement("INPUT");
            block.setAttribute("maxLength", '1');
            block.setAttribute("type", 'text');
            block.setAttribute("Row", r);
            block.setAttribute("oninput", "findWord(event);");
            block.setAttribute("Column", c);
            block.setAttribute("ClassName", "WordGame");
            block.setAttribute("Id", rc);
            block.style.textAlign= "center";
            // block.addEventListener('blur',findWord);
            elem.appendChild(block);
         }
      }
    }

    function ChangeStatus(p=0,q=0,direction,stop=0) {
      // enable for debugging
     // console.log(`${p}-${q}-${direction}-${stop}`);
            switch(direction) {
              case 'TOP':
                while(p<stop) {
                  var Ind= `${p+1}${q}`;
                  document.getElementById(Ind).style.backgroundColor = "#82dc78";
                  p++;
                }
                break;
              case 'LEFT':
                while(q<stop) {
                  var Ind= `${p}${q+1}`;
                  document.getElementById(Ind).style.backgroundColor = "#82dc78";
                  q++;
                }
                break;
              case 'BOTTOM':
                while(p>stop) {
                  var Ind= `${p-1}${q}`;
                  document.getElementById(Ind).style.backgroundColor = "#82dc78";
                  p--;
                }
                break;
              case 'RIGHT':
                while(q>stop) {
                  var Ind= `${p}${q-1}`;
                  document.getElementById(Ind).style.backgroundColor = "#82dc78";
                  q--;
                }
                break;
            }
    }
    // fetch words from json file once
    // const response = await fetch("./words_dictionary.json");
    // const data = await response.json();
    // const arr_1= JSON.parse(JSON.stringify(data));

  async function getWord(word,g=0,r=0,max=0,direction) {
   var val=(`${word}` in arr_1);
     if(val) {
      ChangeStatus(g,r,direction,max);
      console.log(`${g} ${r} ${direction} ${max}`)
      console.log("won");
     }
 }

function findWord(event) {
  const roWs= document.getElementById("Rows").value;
  const colUmns= document.getElementById("Columns").value;
  const dRgT= event.target.value;
  const sdfR= event.target.id;
  const arr= Array.from(sdfR);
    const O=arr[0];
    const P=arr[1];
topVal(O,P,dRgT);
botVal(O,P,dRgT,roWs);
lefVal(O,P,dRgT);
rightVal(O,P,dRgT,colUmns);
//change logi to call all lefVal,rightVal, botomVal functions in above line
function topVal(n,m,s) {
  var setWord=s;
   while(n>1) {
    n--;
    var find=`${n}${m}`;
       if(setWord != prev && prev) {
      // enable for debugging   console.log(`n-${n},m-${m},O-${O}`);
       getWord(setWord,n,m,O,"TOP");
       let revWord = setWord;
       getWord(revWord.split('').reverse().join(''),n,m,O,"TOP");
       }
       var prev = "";
       prev = setWord;
       var huntWord= document.getElementById(find).value;
       if(huntWord.length === 0) {
          break;
        }
      setWord =`${setWord + huntWord}`;
   }
 }

 function botVal(n=0,m=0,s,Max=0) {
   var setWord=s;
   var n1= n;
   // enable for debugging console.log(n1);
  while(n1<Max) {
    n1++;
    var find=`${n1}${m}`;
      if(setWord != prev && prev) {
        getWord(setWord,n1,m,n,"BOTTOM");
       let revWord = setWord;
       getWord(revWord.split('').reverse().join(''),n1,m,n,"BOTTOM");
      }
      var prev=setWord;
      var huntWord= document.getElementById(find).value;
      if (!huntWord) {
        break;
      }
      setWord =`${setWord + huntWord}`;
  }
}

function lefVal(n,m,s) {
  var setWord=s;
   while(m>1) {
    m-=1;
    var find=`${n}${m}`;
       if(setWord != prev && prev) {
        getWord(setWord,n,m,P,"LEFT");
        let revWord = setWord;
        getWord(revWord.split('').reverse().join(''),n,m,P,"LEFT");
       }
       var prev = setWord;
       var huntWord= document.getElementById(find).value;
       if (!huntWord) {
        break;
      }
      setWord =`${setWord + huntWord}`;
   }
 }

 function rightVal(n=0,m=0,s,Max=0) {
  var setWord=s;
  var n1= m;
  while(n1<Max) {
   n1++;
   var find=`${n}${n1}`;
     if(setWord != prev && prev) {
      getWord(setWord,n,n1,m,"RIGHT");
      let revWord = setWord;
      getWord(revWord.split('').reverse().join(''),n,n1,m,"RIGHT");
     }
     var prev=setWord;
     var huntWord= document.getElementById(find).value;
     if (!huntWord) {
      console.log("searchEnd");
       break;
     }
     setWord =`${setWord + huntWord}`;
  }
 } document.getElementById(sdfR).disabled = true;
}

// by Nithish Reddy
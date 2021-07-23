// 변수
const acountList = [
    {
        id: 1,
        title: '전날 이일금',
        money: +5000
    },
    {
        id: 2,
        title: '전날 이일금',
        money: -5000
    },
    {
        id: 3,
        title: '전날 이일금',
        money: +10000
    }
    
]

// 함수
//오늘 사용내역과 합계가 갱신
function resultUpdate() {
    
    let spend = 0;
    let income = 0;

    const $spendNode = document.querySelector('section.acount-book .content .acount-result .spend .money');
    const $incomeNode = document.querySelector('section.acount-book .content .acount-result .income .money');
    const $totalNode = document.querySelector('section.acount-book .content .acount-result .total .money');

    for (let i of acountList) {

        if(i.money < 0) {
            spend += i.money;
        }else {
            income += i.money;
        }
    
    }
    
    // console.log(total);
    assignMark($spendNode, spend);
    assignMark($incomeNode, income);
    assignMark($totalNode, spend+income);


}

//부호추가함수

function assignMark($targetNode, money) {
    if (money > 0) {
        $targetNode.classList.add('plus');
        $targetNode.innerHTML = `<em class="mark">+</em>${money}`;
      
    } else {
        $targetNode.classList.add('minus');
        $targetNode.innerHTML = `<em class="mark">-</em>${-money}`;

    }
}

// 새 리스트를 화면에 렌더링하는 함수
function renderNewAcount(newAcount) {
    const $li = document.createElement('li');
    $li.dataset.id = newAcount.id;
    $li.classList.add('acount-list-item');
    
    const newElement = `
        <label class="acount">
            <span class="title">${newAcount.title}</span>
            <span class="money"></span>
        </label>
    `;

    $li.innerHTML = newElement;

    const $toDoList = document.querySelector('.acount-list');
    $toDoList.appendChild($li);
    
    assignMark($li.querySelector('label span.money'), newAcount.money);
}

// 입력값 확인 함수
function checkInputData($targetInput, isNumber) {
    $targetInput.style.background = ''
    if(isNumber) {
        if(!+$targetInput.value) {
            $targetInput.value = '';
            $targetInput.style.background = 'orangered';
            return false;
        } else {
            $targetInput.background = '';
            return true;
        }
    }
    if($targetInput.value.trim() === '') {
        $targetInput.value = '';
        $targetInput.style.background = 'orangered';
        return false;
    } else {
        $targetInput.background = '';
        return true;
    }
}

// 새로 생성할 데이터의 아이디 반환 함수
function makeNewId() {
    return acountList[acountList.length - 1].id + 1;
}

// 내역 추가 이벤트 함수
function addAcountList() {
    const $acountTitle = document.getElementById('acount-title');
    const $acountMoney = document.getElementById('acount-money');

    // 입력 값 확인
    if(!checkInputData($acountTitle, false)) return;
    if(!checkInputData($acountMoney, true)) return;

    const newAcount = {
        id: makeNewId(),
        title: $acountTitle.value,
        money: +$acountMoney.value
    }
    acountList.push(newAcount);

    renderNewAcount(newAcount);

    $acountTitle.value = '';
    $acountMoney.value = '';

    resultUpdate();
}

// 실행
(function() {

    resultUpdate();
    // 내역 추가 버튼 눌렀을 경우
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', e => {
        e.preventDefault();
        addAcountList();
    });
})();

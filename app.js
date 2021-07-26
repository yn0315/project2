// 변수
const acountList = [
    {
        id: 1,
        title: '전날 이일금',
        money: +50000
    },
    {
        id: 2,
        title: '분식',
        money: -5000
    },
    {
        id: 3,
        title: '용돈',
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

    console.log(acountList);
}

//부호추가함수
function assignMark($targetNode, money) {
    $targetNode.classList.remove('plus');
    $targetNode.classList.remove('minus');

    if (money === 0) {
        $targetNode.innerHTML = `${money}`;
    } else if (money > 0) {
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
        <div class="modify"><span class="lnr lnr-undo"></span></div>
        <div class="remove"><span class="lnr lnr-cross-circle"></span></div>
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

// 수정할 노드 탐색 함수
function FindAcountNode(targetId) {
    const $acountList = document.querySelector('.acount-list');
    for(let $li of [...$acountList.children]) {
        if(+$li.dataset.id === targetId) {
            return $li;
        }
    }
}

// 입력창 초기화
function inputReset() {
    const $input = document.querySelector('form.acount-insert');
    $input.querySelector('#acount-title').value = '';
    $input.querySelector('#acount-money').value = '';
    $input.classList.remove('modify-mode');
    $input.dataset.id = '';
}

// 확인 버튼 이벤트 함수
function addModifyBtnClick() {
    const $acountTitle = document.getElementById('acount-title');
    const $acountMoney = document.getElementById('acount-money');

    // 입력 값 확인
    if(!checkInputData($acountTitle, false)) return;
    if(!checkInputData($acountMoney, true)) return;

    // 데이터 추가 및 변경
    if($acountTitle.parentNode.classList.contains('modify-mode')) { // 수정 모드시
        const targetId = +$acountTitle.parentNode.dataset.id;
        const idx = getIdx(targetId);
        acountList[idx].title = $acountTitle.value;
        acountList[idx].money = +$acountMoney.value;
        const $li = FindAcountNode(targetId);
        $li.querySelector('.title').textContent = $acountTitle.value;
        assignMark($li.querySelector('.money'), +$acountMoney.value);
    } else { // 데이터 신규 추가시
        const newAcount = {
            id: makeNewId(),
            title: $acountTitle.value,
            money: +$acountMoney.value
        }
        acountList.push(newAcount);
    
        renderNewAcount(newAcount);
    }

    // 입력창 초기화
    inputReset();

    // 결과 업데이트
    resultUpdate();
}

// 체크 클래스 부여
function giveChecked($target) {
    // li노드를 찾아 checked 클래스 부여
    if($target.matches('li.acount-list-item')) {
        for(let $li of [...$target.parentNode.children]) {
            if($li === $target) {
                $li.classList.toggle('checked')
            } else {
                $li.classList.remove('checked');
            }
        }
        return;
    } else {
        giveChecked($target.parentNode);
    }
}

// 수정삭제 모드 또는 일반 모드 변경 함수
function changeMod($target) {
    inputReset();
    giveChecked($target);
}

// id의 idx값 구하는 함수
function getIdx(targetId) {
    for (let i = 0; i < acountList.length; i++) {
        if(acountList[i].id === targetId) {
            return i;
        }
    }
}

// 수정 함수
function modifyMode($target) {
    const targetId = +$target.parentNode.parentNode.dataset.id;
    const $acountTitle = document.getElementById('acount-title');
    const $acountMoney = document.getElementById('acount-money');
    const idx = getIdx(targetId);

    $acountTitle.value = acountList[idx].title;
    $acountMoney.value = acountList[idx].money;

    // 인풋 텍스트를 기본모드에서 수정모드로 변경
    const $input = document.querySelector('form.acount-insert');
    $input.classList.add('modify-mode');
    $input.dataset.id = targetId;
}

// 데이터 삭제 함수
function removeData($target) {
    const targetId = +$target.dataset.id;
    $target.parentNode.removeChild($target);
    const idx = getIdx(targetId);
    acountList.splice(idx, 1);
    resultUpdate();
}

// 실행
(function() {

    // 초기화
    resultUpdate();
    // 내역 추가 버튼 눌렀을 경우
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', e => {
        e.preventDefault();
        addModifyBtnClick();
    });

    // 클릭시 수정삭제 모드 변경
    const $list = document.querySelector('section.acount-book .content .acount-list');
    $list.addEventListener('click', e => {
        if (e.target.matches('.acount-list .yesterday *')) return;
        if (!e.target.matches('.acount-list-item *')) return;
        if (e.target.matches('.acount-list-item div span')) return;
        changeMod(e.target);
    });

    // 수정 이벤트
    $list.addEventListener('click', e => {
        if (!e.target.matches('.modify span')) return;
        modifyMode(e.target);
    });

    // 삭제 이벤트
    $list.addEventListener('click', e => {
        if (!e.target.matches('.remove span')) return;
        removeData(e.target.parentNode.parentNode);
    });

})();

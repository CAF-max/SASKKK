let clickCount = 0;
let userNickname = 'user-1234';
let inviterNickname = null;  // 초대한 유저의 닉네임
const usedNicknames = [];
const rankList = document.getElementById('rankList');
const clickButton = document.getElementById('clickButton');
const clickCountDisplay = document.getElementById('clickCount');
const inviteFriendButton = document.getElementById('inviteFriendButton');
const nicknameSetup = document.getElementById('nicknameSetup');
const newNicknameInput = document.getElementById('newNickname');
const setNicknameButton = document.getElementById('setNicknameButton');
const skipNicknameButton = document.getElementById('skipNicknameButton');
const inviterNicknameDisplay = document.getElementById('inviterNickname');
const sendFeedbackButton = document.getElementById('sendFeedback');

// 클릭 버튼 클릭 시 실행되는 함수
clickButton.addEventListener('click', () => {
    clickCount++;
    clickCountDisplay.textContent = clickCount;
    updateRank(userNickname, clickCount);
});

// 순위 업데이트 함수
function updateRank(nickname, count) {
    const listItem = document.createElement('li');
    listItem.textContent = `${nickname}: ${count} 클릭`;
    if (rankList.children.length >= 250) {
        rankList.removeChild(rankList.lastChild);
    }
    rankList.insertBefore(listItem, rankList.firstChild);
}

// 친구 초대 링크 생성
inviteFriendButton.addEventListener('click', () => {
    const inviteLink = `https://example.com/?ref=${userNickname}`;
    alert(`친구에게 이 링크를 보내세요: ${inviteLink}`);
});

// 초대받은 유저가 링크로 들어오면 닉네임을 설정하는 화면 표시
if (window.location.search) {
    const urlParams = new URLSearchParams(window.location.search);
    inviterNickname = urlParams.get('ref');
    if (inviterNickname) {
        inviterNicknameDisplay.textContent = inviterNickname;
        nicknameSetup.style.display = 'block';  // 닉네임 설정 화면 표시
    }
}

// 닉네임 설정 버튼 클릭 시
setNicknameButton.addEventListener('click', () => {
    const newNickname = newNicknameInput.value.trim();
    if (newNickname && !usedNicknames.includes(newNickname)) {
        userNickname = newNickname;
        usedNicknames.push(newNickname);
        alert(`닉네임 ${newNickname}이 설정되었습니다!`);
        nicknameSetup.style.display = 'none';
    } else {
        alert('닉네임을 설정하거나, 중복되지 않는 닉네임을 입력하세요.');
    }
});

// "닉네임 설정 안하기" 버튼 클릭 시
skipNicknameButton.addEventListener('click', () => {
    // 자동으로 user-숫자 형식의 닉네임 생성
    const randomNumber = Math.floor(Math.random() * 10000); // 0부터 9999까지의 랜덤 숫자
    userNickname = `user-${randomNumber}`;
    alert(`닉네임이 자동으로 ${userNickname}으로 설정되었습니다!`);
    nicknameSetup.style.display = 'none';
});

// 의견 보내기 버튼 클릭 시 이메일 보내기
sendFeedbackButton.addEventListener('click', () => {
    window.location.href = 'mailto:rostte2222@naver.com?subject=웹 게임 의견&body=이곳에 의견을 적어주세요.';
});

// 자동 클릭 기능
let autoClickInterval = null;

function startAutoClick() {
    if (autoClickInterval) return; // 이미 진행 중이라면 중복 실행 방지

    autoClickInterval = setInterval(() => {
        clickCount += 3;
        clickCountDisplay.textContent = clickCount;
        updateRank(userNickname, clickCount);
    }, 333); // 1초에 3번 클릭
}

// 초대 링크를 통해 초대받은 친구는 자동 클릭 시작
if (inviterNickname) {
    startAutoClick();
}
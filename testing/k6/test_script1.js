import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 3000, // 가상 사용자 수
    duration: "60s", // 테스트 시간
};
export default function () {
    // 1. 토큰 발급 API 요청 (GET)
    let loginRes = http.get('http://backend1:8080/api/v1/auth/anonymous');

    // 발급 받은 토큰 파싱 (응답 헤더의 'Authorization' 필드)
    let token = loginRes.headers['Authorization'];

    // 2. 토큰 발급 성공 여부와 토큰 값을 출력
    check(loginRes, {
        '토큰 발급 성공': (r) => r.status === 200,
    });

    // 3. 발급받은 토큰을 사용해 다른 API 요청
    let headers = {
        Authorization: token, // 헤더에 토큰 포함
        'Content-Type': 'application/json',
    };

    sleep(1);

    let prizeListRes = http.get('http://backend1:8080/api/v1/projects/prize?projectTypeEnum=BOOTCAMP&year=2024&semesterEnum=FIRST', { headers: headers });
    check(prizeListRes, {
        '우수작 목록 API 요청 성공': (r) => r.status === 200,
    });
    sleep(1);

    // 응답 본문을 JSON으로 파싱
    let prizeJsonRes = JSON.parse(prizeListRes.body);

    let projectItems = prizeJsonRes.data.projectItemResponseList;
    for (let i = 0; i < projectItems.length; i++) {
        let itemId = projectItems[i].id;
        let projectRes = http.get(`http://backend1:8080/api/v1/projects/${itemId}`, { headers: headers });
        check(projectRes, {
            'project 조회 성공': (r) => r.status === 200
        });
        sleep(1);
    }
}

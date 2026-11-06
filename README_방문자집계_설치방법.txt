조일고 스마트기술과 홈페이지 — 방문자 현황 기능 추가본

[변경 내용]
- 홈페이지 푸터에 오늘/누적 방문 수 표시
- Netlify Functions + Netlify Blobs 로 실제 집계 (신규 사이트는 0부터 시작)
- 익명 브라우저 식별자 기준 하루 최대 1회 집계; 정확한 사람 수/Netlify Analytics 수치와 다를 수 있음
- 기존 등록 영상 7개, 사진 앨범 7개/사진 204개는 변경하지 않음
- 사진은 기존 celadon-belekoy Netlify 서버에 의존: 기존 서버 삭제 금지
- 기존 admin.html 화면 보존, 서버 저장/관리 백엔드가 이 ZIP에 들어 있지는 않음

[중요: 배포 방법]
- 이 ZIP은 GitHub 기반 Netlify 빌드 권장. 기존 'imaginative-kelpie' 프로젝트가 아닌 GitHub 테스트 프로젝트에 연결하여 배포 테스트
- GitHub 저장소에 ZIP 압축을 해제한 내용물을 업로드: package.json, netlify.toml, public/, netlify/functions/ 가 저장소 최상위에 있어야 함
- Netlify에서 Add new project > Import from Git > GitHub 저장소 연결
- Publish directory는 netlify.toml에 'public'으로 설정되어 있음. 함수를 빌드하여 배포해야 실제 숫자가 표시됨.
- 수동 Netlify Drop은 빌드 조건에 따라 함수/의존성을 포함하지 못할 수 있으므로 '—' 표시가 나오면 Functions 탭 확인.
- Netlify Blobs로 매일 브라우저별 방문 기록을 저장하며, 트래픽 규모에 따라 함수/Blob 사용량 발생
- 실제 숫자는 배포 후 접속 테스트로만 검증 가능, 현재 파일 검증은 정적 코드 확인 수준
- JSON을 통해 이전 사이트 방문 수를 이관하지 않음

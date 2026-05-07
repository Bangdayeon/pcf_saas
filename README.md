# pcf_saas

프로젝트 상세 설계 및 기능 정의 문서입니다.

- [Notion 문서 보기](https://aback-shirt-867.notion.site/pcf-saas-357add99c0428010bb3ac952b9531c46?utm_source=chatgpt.com)


## 🏃 실행 방법
1. 저장소 클론
    
    ```bash
    git clone https://github.com/Bangdayeon/pcf_saas.git
    ```
    
2. 의존성 설치
    
    ```bash
    yarn install
    ```
    
3. 환경변수 설정
    
    ```bash
    cp .env.example .env
    ```
    
    - `DATABASE_URL` 등 필수 값 설정
4. Docker로 DB 실행
    
    ```bash
    docker compose up -d
    ```
    
5. DB 초기화 및 시드 실행 후 서버 실행
    
    ```bash
    npx prisma db push
    npx prisma db seed
    yarn dev
    yarn build
    yarn start
    ```
## ⚙️ 기술 스택
**Core**
- Next.js 14 (App Router)
- React 18
- TypeScript

**UI**
- TailwindCSS
- shadcn/ui
- Recharts

**Status**
- Tanstack Query
- Zustand

**Data**
- xlsx (Excel import)

**Backend**
- Next.js Route Handlers (BFF)

**DB**
- PostgreSQL
- Prisma ORM

**Infra**
- Docker Compose

**Tooling**
- ESLint
- Prettier

**AI Tool**
- claude code (prisma 설계 및 chart, xlsx 구현에 주로 활용)

## 📂 폴더 구조
```
src/
├─ app/
│  ├─ (route)/
│  └─ api/
│
├─ assets/
│
├─ components/            # 공용 UI 컴포넌트
├─ features/              # UI 단위
│  ├─ home/
│  └─ add/
│
├─ lib/
│  ├─ prisma.ts
│  ├─ excel.ts
│  └─ utils.ts
│
├─ services/
│
├─ store/
│
├─ styles/
│
└─ types/
```

## 🎨 UI 둘러보기
<p align="center">
  <img width="32%" src="https://github.com/user-attachments/assets/f4c700ef-69e9-459d-9696-3c366a7acfa1" />
  <img width="32%" src="https://github.com/user-attachments/assets/16dac840-c889-4f2b-89a8-792ba65c6f75" />
  <img width="32%" src="https://github.com/user-attachments/assets/d33aabf4-67ea-4ea7-a640-af76a291312b" />
</p>



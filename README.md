# pcf_saas
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

## 폴더 구조
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
